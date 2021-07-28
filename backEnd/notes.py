from flask import Blueprint, g, request
from flask.helpers import url_for
from .auth import login_required
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
    allNotes = db.allNotes(g.user.id)
    return render_template('notes.html', user = g.user, notes = allNotes)

@notes.route('/<nid>')
@login_required
def content(nid):
    
    data = db.getContents(int(nid))
    
    if data['note']:
        return render_template(
                
                'noteDetails.html',
                user = g.user, 
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
                user = g.user, 
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
    filteredNotes = db.filterbyTag(value, g.user.id)
    return render_template('notes.html', user = g.user, notes = filteredNotes)

@notes.route('/add-note', methods = ['GET','POST'])
@login_required
def addNote():
    if request.method == 'POST':
        db.insert(request.form, 2, g.user.id)
        return redirect(url_for('notes.home'))
        
    return render_template('addNotes.html', user = g.user)

@notes.route('<nid>/delete-note')
@login_required
def deleteNote(nid):
    db.delete(nid, g.user.id, 1)
    return redirect(url_for('notes.home'))
