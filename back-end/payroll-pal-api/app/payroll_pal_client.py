import os, pickle

class PayrollPal(object):
    def __init__(self, username, password):
        self.id = id(self)
        self.username = username
        self.password = password
        #self.driver = webdriver.Chrome()
        self.logged_in = False
        self.entries = entries = {
            'totalHours': 25.5,
            'payRate': 18.00,
            'payPeriodStart': [10,21,2019],
            'payPeriodEnd': [10,27,2019],
            'firstName': 'Jackson',
            'entries': [
                {
                    'date': [10,21,2019],
                    'day': 'Monday',
                    'hours': 8,
                    'approved': True,
                    'punches': [
                        ['work', '9:00 AM', '2:30 PM'],
                        ['meal', '2:30 PM', '3:00 PM'],
                        ['meal', '3:00 PM', '5:30 PM'],
                    ]
                },
                {
                    'date': [10,22,2019],
                    'day': 'Tuesday',
                    'hours': 8,
                    'approved': False,
                    'punches': [
                        ['work', '9:00 AM', '2:30 PM'],
                        ['meal', '2:30 PM', '3:00 PM'],
                        ['meal', '3:00 PM', '5:30 PM'],
                    ]
                },
                {
                    'date': [10,23,2019],
                    'day': 'Wednesday',
                    'hours': 9.5,
                    'approved': False,
                    'punches': [
                        ['work', '9:00 AM', '2:30 PM'],
                        ['meal', '2:30 PM', '3:00 PM'],
                        ['work', '3:00 PM', '5:30 PM'],
                    ]
                },
                {
                    'date': [10,24,2019],
                    'day': 'Thursday',
                    'hours': 0,
                    'approved': False,
                    'punches': []
                },
                {
                    'date': [10,25,2019],
                    'day': 'Friday',
                    'hours': 0,
                    'approved': False,
                    'punches': []
                },
                {
                    'date': [10,26,2019],
                    'day': 'Saturday',
                    'hours': 0,
                    'approved': False,
                    'punches': []
                },
                {
                    'date': [10,27,2019],
                    'day': 'Sunday',
                    'hours': 0,
                    'approved': False,
                    'punches': []
                },
        ]}

    def login(self):
        # login with driver
        logged_in = True
        if logged_in:
            self.logged_in = logged_in
            return self
        else:
            self.logged_in = logged_in
            return False
    

    def logout(self):
        pp_obj_id = self.id
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, pp_obj_id)
        os.remove(file_path)
    
    def has_session_expired(self):
        # check for session expiration
        # if logged_in == False, `identity()` will return 401
        self.logged_in = True


    def __str__(self):
        return "PayrollPal(id='%s')" % self.id

def load_pickled(id):
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, id)
        pp = pickle.load( open(file_path, "rb"))
        # every authed request loads the pickled object. 
        # therefore before every request we need to check if bbsi session has expired
        # that way we can properly authenticate requests if it has expired
        pp.has_session_expired()
        return pp