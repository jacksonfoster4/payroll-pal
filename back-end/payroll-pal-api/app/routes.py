from app import app
from flask import jsonify, request, session
from flask_jwt import JWT, jwt_required, current_identity
from selenium import webdriver
import pickle, os
from redis import Redis

r = Redis()

entries = {
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

class PayrollPal(object):
    def __init__(self, username, password):
        self.id = id(self)
        self.username = username
        self.password = password
        #self.driver = webdriver.Chrome()
        self.logged_in = False

    def login(self):
        # login with driver
        logged_in = True
        if logged_in:
            self.logged_in = logged_in
            return self
        else:
            self.logged_in = logged_in
            return False
    
    @staticmethod
    def load(id):
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, id)
        pp = pickle.load( open(file_path, "rb"))
        # every authed request loads the pickled object. 
        # therefore before every request we need to check if bbsi session has expired
        # that way we can properly authenticate requests if it has expired
        pp.has_session_expired()
        return pp

    def logout(self):
        pp_obj_id = id(self)
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, pp_obj_id)
        os.remove(file_path)
    
    def has_session_expired(self):
        # check for session expiration
        # if logged_in == False, `identity()` will return 401
        self.logged_in = True


    def __str__(self):
        return "PayrollPal(id='%s')" % self.id

# when to destroy pickle file
#   if user logs out
#   if jwt token expires ( handled by heartbeat )
#   if flask session expires ( handled by heartbeat )

@app.route('/logout', methods=['POST'])
def logout():
    current_identity.logout()

@app.route('/hearbeat', methods=['GET', 'POST'])
@jwt_required
def heartbeat():
    # ping /heartbeat every 30 seconds
    # redis will clear tokens that are 1 minute old
    # as long as application is open, it is pinging /hearbeat and thus the pp object should be kept alive
    # if key is older than 1 minute, user has closed application and pp object should be destroyed 
    id = current_identity.id
    r.set(id, 1)

@app.before_request
def print_body():
    pass

# session has been replaced with a redis store
# pp id is encoded in jwt, so jwt acts as the session cookie
# this keeps tmp/ and all active sessions coupled. when session is destroyed, pickle is destroyed. if pickle is destroyed, 401 is returned
# it also happens that i couldnt figure out how to get session to work (CORs and fetch problems) and this seems to work without issue. no coincidence whatsoever
def authenticate(username, password):
    pp = PayrollPal(username, password)
    if pp.login():
        r.set(pp.id, 1)
        root = os.path.abspath(os.path.dirname(__file__))
        file_path = "{}/tmp/{}-payroll-pal.p".format(root, pp.id)
        pickle.dump(pp, open( file_path, "wb" ))
        return pp

def identity(payload):
    pickle_id = payload['identity']
    print("from identity---{}".format(pickle_id))
    if r.get(pickle_id):
        pp = PayrollPal.load(pickle_id)
        if pp.logged_in:
            return pp
    
jwt = JWT(app, authenticate, identity)

# /get-entries
@app.route('/')
@app.route('/get-entries', methods=['POST'])
@jwt_required()
def get_entries():
    # entries = current_identity.get_entries()
    return jsonify(entries)

# /demo
@app.route('/demo', methods=['POST'])
def demo():
    return jsonify({'entries': entries})

# /login
@app.route('/login', methods=['POST'])
def login():
    print(request.form['username'])
    print(request.form['password'])
    return "You've been logged In!"

# /update-entry
@app.route('/update-entry', methods=['POST'])
def update_entry():
    return "TRUE"