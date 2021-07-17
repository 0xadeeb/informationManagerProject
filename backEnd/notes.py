from flask import Blueprint

notes = Blueprint('notes', 'backEnd', url_prefix= '/home')

@notes.route('/')
def homePage():
    return '<h2> Home Page </h2>'