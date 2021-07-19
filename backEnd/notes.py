from flask import Blueprint
from flask_login.utils import login_required, current_user, request
from flask import render_template
from . import db

notes = Blueprint('notes', 'backEnd', url_prefix= '/')

@notes.route('/', methods = ['GET','POST'])
@login_required
def home():

    return render_template('notes.html', user = current_user)


@notes.route('/add-note', methods = ['GET','POST'])
@login_required
def addNote():
    if request.method == 'POST':
        print(request.form)
        db.insert(request.form, 2, current_user.id)
        
    return render_template('addNotes.html', user = current_user)