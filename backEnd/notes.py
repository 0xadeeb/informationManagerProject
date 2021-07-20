import re
from flask import Blueprint
from flask.helpers import url_for
from flask_login.utils import login_required, current_user, request
from flask import render_template
from werkzeug.utils import redirect
from . import db
import datetime


notes = Blueprint('notes', 'backEnd', url_prefix= '/')


def format_date(d, formate):
    if formate == "datetime":
        d = datetime.datetime.strftime(d, '%d %b %Y, %I:%M %p')
        return d
    else:
        d = datetime.datetime.strftime(d, '%d %b %Y')
        return d

@notes.route('/', methods = ['GET','POST'])
@login_required
def home():
    allNotes = db.allNotes(current_user.id)
    return render_template('notes.html', user = current_user, notes = allNotes)

@notes.route('/<nid>', methods = ['GET','POST'])
@login_required
def content(nid):
    if request.method == 'POST':
        updatedNote = request.form.get('notes')
        db.updateNote(updatedNote, nid)


    data = db.getContents(int(nid))

    return render_template(
            
            'noteDetails.html',
            user = current_user, 
            title = data['note'][0],
            notes = data['note'][1],
            addedOn = format_date(data['note'][2], "datetime"),
            stared = data['note'][3],
            id = data['note'][4],
            tags = data['tags']
        )


@notes.route('/add-note', methods = ['GET','POST'])
@login_required
def addNote():
    if request.method == 'POST':
        db.insert(request.form, 2, current_user.id)
        return redirect(url_for('notes.home'))
        
    return render_template('addNotes.html', user = current_user)