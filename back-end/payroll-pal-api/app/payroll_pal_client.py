import os, pickle, json
root = os.path.abspath(os.path.dirname(__file__))

class PayrollPal(object):
    def __init__(self, username, password):
        self.id = id(self)
        self.username = username
        self.password = password
        #self.driver = webdriver.Chrome()
        self.logged_in = False
        self.entries = None
        with open('{}/mock-data.json'.format(root)) as json_file:
            self.entries = json.load(json_file)
        
    def __str__(self):
            return "PayrollPal(username='{}', id='{}')".format( self.username, self.id )

    # auth functions

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
    

    # entry == each day
    # app functions
    def get_entries(self, start, end):
        return self.entries

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
        
        return data[date]        

    def approve_all(self, start, end):
        pass

    def is_session_active(self):
        pass












def load_pickled(id):
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, id)
        pp = pickle.load( open(file_path, "rb"))
        # every authed request loads the pickled object. 
        # therefore before every request we need to check if bbsi session has expired
        # that way we can properly authenticate requests if it has expired
        pp.has_session_expired()
        return pp