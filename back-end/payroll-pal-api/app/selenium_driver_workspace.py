import os, pickle, json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

root = os.path.abspath(os.path.dirname(__file__))

class PayrollPal(object):
    def __init__(self, username, password):
        self.id = id(self)
        self.bbsi_client_id = 'TN3111'
        self.driver = webdriver.Chrome()
        self.username = username
        self.password = password
        self.logged_in = False
        self.entries = None
        with open('{}/mock-data.json'.format(root)) as json_file:
            self.entries = json.load(json_file)
        
    def __str__(self):
            return "PayrollPal(username='{}', id='{}')".format( self.username, self.id )

    # auth functions

    def login(self):
        # login with driver
        self.driver.get("https://bbsitimenet.centralservers.com/Login.aspx")

        client_id = self.driver.find_element_by_id("txtCustomerAlias")
        client_id.send_keys(self.bbsi_client_id)

        # login
        username = self.driver.find_element_by_id("txtLoginID")
        username.send_keys(self.username)

        password = self.driver.find_element_by_id("txtPassword")
        password.send_keys(self.password)

        login_button = self.driver.find_element_by_id("btnLogin")
        login_button.click()

        actions_button = self.driver.find_element_by_id("divActions")
        actions_button.click()

        # wait for ajax to load entries
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.element_to_be_clickable((By.ID, "fromTSDate")))

        # set date ranges
        start_date = self.driver.find_element_by_id("fromTSDate")
        len_of_start = len(start_date.get_attribute("value"))
        for i in range(len_of_start):
            start_date.send_keys(Keys.BACKSPACE)
        start_date.send_keys('10/30/2019')

        end_date = self.driver.find_element_by_id("toTSDate")
        len_of_end = len(start_date.get_attribute("value"))
        for i in range(len_of_end):
            end_date.send_keys(Keys.BACKSPACE)
        end_date.send_keys('11/02/2019')

        # submit date range
        end_date.send_keys(Keys.ENTER)


        if self.driver.title == 'Employee Home':
            print("Logged In!")
        else:
            error = self.driver.find_element_by_id("lblError")
            print(error.text)
            


    def logout(self):
        pp_obj_id = self.id
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, pp_obj_id)
        os.remove(file_path)
    
    def has_session_expired(self):
        # check for session expiration
        # if logged_in == False, `identity()` will return 401
        self.logged_in = True
    

    # entry == each day
    # app functions
    def get_entries(self, start, end):
        data = None
        # load data to temp variable
        with open('{}/mock-data.json'.format(root), 'rb') as json_file:
            data = json.load(json_file)

        start_i = 0
        end_i = len(data['entries'])
        for i, entry in enumerate(data['entries']):
            for j, el in enumerate(entry['date']): 
                entry['date'][j] = str(el)

            if entry['date'] == start:
                start_i = i
            if entry['date'] == end:
                end_i = i+1

        data['entries'] = data['entries'][start_i:end_i]
        return data

    def update_entry(self, entry):
        data = None
        date = entry['date']
        # load data to temp variable
        with open('{}/mock-data.json'.format(root), 'rb') as json_file:
            data = json.load(json_file)

        # write new data to temp variable
        for i, l_entry in enumerate(data['entries']):
            if l_entry['date'] == entry['date']:
                data['entries'][i] = entry


        # write temp variable to data
        with open('{}/mock-data.json'.format(root), 'w') as json_file:
            json.dump(data, json_file, indent=4)
        
        return data       

    def approve_all(self, start, end):
        data = None

        # load data to temp variable
        with open('{}/mock-data.json'.format(root), 'rb') as json_file:
            data = json.load(json_file)
            
        # write new data to temp variable
        for i, entry in enumerate(data['entries']):
            data['entries'][i]['approved'] = True


        # write temp variable to data
        with open('{}/mock-data.json'.format(root), 'w') as json_file:
            json.dump(data, json_file, indent=4)
        
        return data

    def is_session_active(self):
        pass

# what needs to happen
# driver needs to open time card (easy)
# driver needs to collect current entries in a format identical to mock-data
# it might be useful to map entry dates to html ids for quick access
# driver needs to accurately maintain the state of the entries (predict the crappiness of bbsi)
# driver needs to accurately update the state of the entries
# driver needs to detect and return errors
# driver needs to consistently check if session has expired
# driver needs to submit all entries
# driver needs to view time card and approve all entries



def load_pickled(id):
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, id)
        pp = pickle.load( open(file_path, "rb"))
        # every authed request loads the pickled object. 
        # therefore before every request we need to check if bbsi session has expired
        # that way we can properly authenticate requests if it has expired
        pp.has_session_expired()
        return pp

if __name__ == "__main__":
    p = PayrollPal('jfoster', 'fost8400')
    p.login()