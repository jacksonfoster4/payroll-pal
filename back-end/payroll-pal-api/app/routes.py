from app import app
from flask import jsonify, request, session
from flask_jwt import JWT, jwt_required, current_identity
from selenium import webdriver
import pickle, os
from redis import Redis
from .payroll_pal_client import PayrollPal, load_pickled

r = Redis('localhost') 

# when to destroy pickle file
#   if user logs out
#   if jwt token expires ( handled by heartbeat )
#   if flask session expires ( handled by heartbeat )

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
    if r.get(pickle_id):
        pp = load_pickled(pickle_id)
        if pp.logged_in:
            return pp

jwt = JWT(app, authenticate, identity)

# auth routes

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    current_identity.logout()
    return ('', 204)

@app.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    # used to verify token.
    return ('', 204)
 
@app.route('/hearbeat', methods=['GET', 'POST'])
@jwt_required()
def heartbeat():
    # ping /heartbeat every minute
    # redis will clear tokens that are 2 minute old
    # as long as application is open, it is pinging /hearbeat and thus the pp object should be kept alive
    # if key is older than 1 minute, user has closed application and pp object should be destroyed 
    # this is handled by pickle_cleanup.py. a cron job runs every 3 minutes and checks if the id is in redis.
    # if it is not, the session has expired and the pickle file should be deleted
    id = current_identity.id
    r.set(id, 1, ex=120)
    print('beat-{}'.format(id))
    return ('', 204)



    
# app routes

@app.route('/')
@app.route('/get-entries', methods=['POST'])
@jwt_required()
def get_entries():
    pickle_id = current_identity.id
    pp = load_pickled(current_identity.id)
    return jsonify(pp.entries)

@app.route('/demo', methods=['POST'])
def demo():
    return jsonify({'entries': entries})

@app.route('/login', methods=['POST'])
def login():
    print(request.form['username'])
    print(request.form['password'])
    return "You've been logged In!"

@app.route('/update-entry', methods=['POST'])
def update_entry():
    return "TRUE"
    