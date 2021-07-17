from flask import Blueprint

auth = Blueprint('auth', 'backEnd', url_prefix= '/')

@auth.route('/')
def authenticate():
    return "<h2>Authenticator</h2>"