from flask import Blueprint
from flask_login.utils import login_required

notes = Blueprint('notes', 'backEnd', url_prefix= '/')

@notes.route('/')
@login_required
def homePage():
    return '<h2> Home Page </h2>'