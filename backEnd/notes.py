from flask import Blueprint
from flask.helpers import url_for
from flask_login.utils import login_required, current_user, request
from flask import render_template
from werkzeug.utils import redirect
from . import db
import datetime


notes = Blueprint('notes', 'backEnd', url_prefix= '/')


def format_date(d):
    if d:
        d = datetime.datetime.strftime(d, '%a - %d %b %Y, %I:%M %p')
        return d
    else:
        return None

@notes.route('/', methods = ['GET','POST'])
@login_required
def home():
    allNotes = db.allNotes(current_user.id)
    return render_template('notes.html', user = current_user, notes = allNotes)

@notes.route('/<nid>')
@login_required
def content(nid):
    
    data = db.getContents(int(nid))
    
    if data['note']:
        return render_template(
                
                'noteDetails.html',
                user = current_user, 
                title = data['note'][0],
                notes = data['note'][1],
                addedOn = format_date(data['note'][2]),
                stared = data['note'][3],
                id = data['note'][4],
                tags = data['tags']
            )
    else:
        return "<h3> Error page not found <br/><a href=\'/\'>Back home</a></h3>"

@notes.route('/<nid>/edit', methods = ['GET','POST'])
@login_required
def edit(nid):
    if request.method == 'POST':
        # print(request.form)
        updatedNote = request.form.get('notes')
        updatedTitle = request.form.get('title')
        # print(request.form)
        if request.form.get('Star'):
            star = True
        else:
            star = False

        db.updateNote(updatedTitle, updatedNote, star, nid)

        return redirect(url_for('notes.content', nid = nid))


    data = db.getContents(int(nid))

    if data['note']:
        return render_template(
                
                'editNotes.html',
                user = current_user, 
                title = data['note'][0],
                notes = data['note'][1],
                addedOn = format_date(data['note'][2]),
                stared = data['note'][3],
                id = data['note'][4],
                tags = data['tags']
            )
    else:
        return "<h3> Error page not found <br/><a href=\'/\'>Back home</a></h3>"

    

@notes.route("/search/<field>/<value>")
@login_required
def tagSearch(field, value):
    filteredNotes = db.filterbyTag(value, current_user.id)
    return render_template('notes.html', user = current_user, notes = filteredNotes)

@notes.route('/add-note', methods = ['GET','POST'])
@login_required
def addNote():
    if request.method == 'POST':
        db.insert(request.form, 2, current_user.id)
        return redirect(url_for('notes.home'))
        
    return render_template('addNotes.html', user = current_user)

@notes.route('<nid>/delete-note')
@login_required
def deleteNote(nid):
    db.delete(nid, current_user.id, 1)
    return redirect(url_for('notes.home'))
