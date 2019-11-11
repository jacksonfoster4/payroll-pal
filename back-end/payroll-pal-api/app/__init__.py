from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True)


from app import routes