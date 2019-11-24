from flask import Flask
from flask_cors import CORS
from werkzeug.wsgi import DispatcherMiddleware
import os

app = Flask(__name__)
app.wsgi_app = DispatcherMiddleware(app, {'/api': app.wsgi_app})
app.config['SECRET_KEY'] = os.urandom(24)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True)


from app import routes