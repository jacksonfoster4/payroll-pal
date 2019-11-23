import os, pickle, json
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import pprint as pp
import time
root = os.path.abspath(os.path.dirname(__file__))

class PayrollPal(object):
    def __init__(self, username, password, start, end):
        self.id = id(self)
        self.bbsi_client_id = 'TN3111'
        self.bbsi_url = "https://bbsitimenet.centralservers.com/Login.aspx"
        self.driver = webdriver.Chrome()
        self.username = username
        self.password = password
        self.logged_in = False
        self.entries = None
        self.demo = False
        self.start = start
        self.end = end
        with open('{}/mock-data.json'.format(root)) as json_file:
            self.entries = json.load(json_file)
        
    def __str__(self):
            return "PayrollPal(username='{}', id='{}')".format( self.username, self.id )

    # auth functions

    def login(self):
        # login with driver
        self.driver.get(self.bbsi_url)

        client_id = self.driver.find_element_by_id("txtCustomerAlias")
        client_id.send_keys(self.bbsi_client_id)

        # login
        username = self.driver.find_element_by_id("txtLoginID")
        username.send_keys(self.username)

        password = self.driver.find_element_by_id("txtPassword")
        password.send_keys(self.password)

        login_button = self.driver.find_element_by_id("btnLogin")
        login_button.click()

        if self.driver.title == 'Employee Home':
            self.logged_in = True
            print("Logged In!")
            return True
        else:
            error = self.driver.find_element_by_id("lblError")
            print(error.text)
            return False

    
    def set_entries_range(self, tab):
        # open actions tab
        if tab == 'time_card':
            time_card_button = self.driver.find_element_by_id('divTimeCard')
            time_card_button.click()
            
            inputs = self.driver.find_elements_by_class_name('emp-popup-timecard-dateTextBox')

            def inputs_have_value(s):
                inputs = self.driver.find_elements_by_class_name('emp-popup-timecard-dateTextBox')
                return inputs[0].get_attribute('value') != '' and inputs[1].get_attribute('value') != ''

            # wait for ajax to load entries
            wait = WebDriverWait(self.driver, 3)
            wait.until(inputs_have_value)

            # set date ranges
            start_date = inputs[0]
            end_date = inputs[1]

        elif tab == 'actions':
        
            actions_button = self.driver.find_element_by_id("divActions")
            actions_button.click()

            # wait for ajax to load entries
            wait = WebDriverWait(self.driver, 10)
            wait.until(EC.element_to_be_clickable((By.ID, "fromTSDate")))

            # set date ranges
            start_date = self.driver.find_element_by_id("fromTSDate")
            end_date = self.driver.find_element_by_id("toTSDate")



        if self.start:
            len_of_start = len(start_date.get_attribute("value"))
            for i in range(len_of_start):
                start_date.send_keys(Keys.BACKSPACE)
            start = "/".join(self.start)
            start_date.send_keys(start)

        if self.end:
            len_of_end = len(start_date.get_attribute("value"))
            for i in range(len_of_end):
                end_date.send_keys(Keys.BACKSPACE)

            end = "/".join(self.end)
            end_date.send_keys(end)

        # submit date ranges
        end_date.send_keys(Keys.ENTER)


    def get_entries(self):
        self.set_entries_range('actions')

        # wait until entries are loaded
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, 'timesheetentryloader')))

        # wait for ajax to load entries
        

        final = []
        entries_candidates = self.driver.find_elements_by_xpath('//*[@id="divFloatingLayer"]/div/div')
        entries = []

        for i, el in enumerate(entries_candidates):
            if entries_candidates[i].get_attribute('style') == 'width: 99.9%;':
                entries.append(entries_candidates[i])
        
        for entry in entries:
            tmp_date = entry.find_element_by_xpath('.//span[2]').text
            tmp = {
                'date': tmp_date.split('/'),
                'day': entry.find_element_by_css_selector('div:nth-child(1) > span:nth-child(1)').text,
                'hours': int(float(entry.find_element_by_css_selector('div:nth-child(1) > span:nth-child(4)').text)),
                'punches': [],
                'approved': False
            }

            punches = entry.find_elements_by_css_selector('div:nth-child(3) > div')
            for i, punch in enumerate(punches):
                if "font-size: 8pt" in punch.get_attribute('style'): # shits acting up but this makes things work. its ugly. i know
                    tmp['punches'].append(
                        [
                            punch.find_element_by_css_selector('div:nth-child(3) > select').get_attribute('value'),
                            punch.find_element_by_css_selector('div:nth-child(4) > input').get_attribute('value'),
                            punch.find_element_by_css_selector('div:nth-child(5) > input').get_attribute('value'),
                        ]
                    )
            final.append(tmp)

        self.driver.find_element_by_class_name('emp-popup-backButton').click()

            # find out if its approved
        self.set_entries_range('time_card')
        time.sleep(1)
        punches = self.driver.find_elements_by_class_name('TimeCardGridDataRow')

        for i, punch in enumerate(punches):
            date = punch.find_element_by_css_selector('div:nth-child(4)').text.split('/')
            approval = punch.find_element_by_xpath('.//input[1]').get_attribute('value')
            for i, entry in enumerate(final):
                if entry['date'] == date:
                    if approval == "on":
                        final[i]['approved'] = True



        pp.pprint(final)

        self.driver.find_element_by_class_name('emp-popup-backButton').click()

        return final
            


    def set_entries(self, target_entries):

        self.set_entries_range('actions')

        # wait until entries are loaded
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, 'timesheetentryloader')))
        
        final = []
        entries = self.driver.find_elements_by_xpath('//*[@id="divFloatingLayer"]/div/div[@style="width: 99.9%;"]')

        for entry in entries:
            #self.driver.execute_script("arguments[0].scrollIntoView(true);", entry)
            #time.sleep(2)
            # needed to access `add punch` because it is outside of the entry div
            entry_id = entry.find_element_by_xpath('.//span[4]').get_attribute('id')
            entry_id = entry_id[ len(entry_id) - 1]

            tmp_date = entry.find_element_by_xpath('.//span[2]').text.split("/")
            for e in target_entries:
                punches = e['punches']
                if e['date'] == tmp_date:
                    print(tmp_date)
                    # remove all punches
                    old_punches = entry.find_elements_by_xpath('./div[3]/div')

                    for punch in old_punches:
                        punch.find_element_by_xpath('./div[1]').click()

                    for i, punch in enumerate(punches):
                        # button lies outside of `entry`
                        self.driver.find_element_by_css_selector('#tsExpressAdd{}'.format(entry_id)).click()

                        type = punch[0]
                        start_time = punch[1]
                        end_time = punch[2]

                        # generates the id of the next select element. i guess we cant dynamically add elements and access them at the same time
                        # so this dynamically generates their id instead. 
                        # select element starts with id of type_NUMBER and NUMBER increases by 1 for each punch added, hence the enumerate/index
                        start_id = entry.find_element_by_xpath('.//div[@class="newentry"][2]').get_attribute('id')
                        punch_id = int(start_id.split("_")[1])
                        select_id = "type_{}".format(punch_id)
                        begin_id = "startTime_{}".format(punch_id)
                        end_id = "endTime_{}".format(punch_id)

                        start = self.driver.find_element_by_id(begin_id)
                        end = self.driver.find_element_by_id(end_id)

                        len_of_start = len(start.get_attribute('value'))
                        for i in range(len_of_start):
                            start.send_keys(Keys.BACKSPACE)

                        self.driver.execute_script("$( '#'+arguments[0])[0].value = arguments[1]", select_id, type)
                        start.send_keys(start_time)
                        end.send_keys(end_time)
        
        self.driver.find_element_by_css_selector('.saveandsubmittimesheet').click()
             
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.invisibility_of_element_located((By.ID, 'divTimeSheetEntryContainer')))

        self.set_entries_range('time_card')

        punches = self.driver.find_elements_by_class_name('TimeCardGridDataRow')

        for i, punch in enumerate(punches):
            date = punch.find_element_by_css_selector('div:nth-child(4)').text.split('/')
            approval = punch.find_element_by_xpath('.//input[1]').is_selected()
            for e in target_entries:
                # if date matches punch date
                # if the new entry is supposed to be approved
                # and if its not already approved
                if e['date'] == date and e['approved'] and not approval:
                    punch.find_element_by_xpath('.//input[1]').click()

    def approve_all(self):
        self.set_entries_range('time_card')
        self.driver.find_element_by_id('chkTCApproveAll').click()
        self.driver.find_element_by_class_name('emp-popup-backButton').click()


    def logout(self):
        pp_obj_id = self.id
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, pp_obj_id)
        os.remove(file_path)
    
    def has_session_expired(self):
        # check for session expiration
        # if logged_in == False, `identity()` will return 401
        if self.driver.find_element_by_id('ui-dialog-title-1').is_displayed():
            self.logged_in = False

def load_pickled(id):
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, id)
        pp = pickle.load( open(file_path, "rb"))
        # every authed request loads the pickled object. 
        # therefore before every request we need to check if bbsi session has expired
        # that way we can properly authenticate requests if it has expired
        pp.has_session_expired()
        return pp