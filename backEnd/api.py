from flask import Blueprint, jsonify
from flask.helpers import url_for
from flask_login.utils import login_required, current_user, request
from flask import render_template
from werkzeug.utils import redirect
from . import db
import datetime
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json


api = Blueprint('api', 'backEnd', url_prefix= '/api')


@api.route('/getallnotes', methods = ['GET'])
@jwt_required()
def Getdata():

    id = get_jwt_identity()
    allNotes = db.allNotes(id)

    colNames = ['Sno', 'noteId', 'Title', 'Stared']


    for i in range(len(allNotes)):
        allNotes[i] = dict(zip(colNames, allNotes[i]))


    return jsonify(dict(notes = allNotes)), 200

@api.route('/add-note', methods = ['POST'])
@jwt_required()
def addData():

    id = get_jwt_identity()
    data = json.loads(request.data)
    db.insert(data, 3, id)

    return jsonify(dict(msg = "Note Added" )), 200


@api.route('/get-notes-info', methods = ['POST'])
@jwt_required()
def getNoteData():
    noteId = json.loads(request.data)['id']
    res = db.getContents(noteId)
    res['tags'] = [t[0] for t in res['tags']]
    return jsonify(res), 200


@api.route('/edit-note', methods = ['POST'])
@jwt_required()
def editData():

    data = json.loads(request.data)
    db.updateNote(data['title'],data['note'],False,data['id'], data['tags'])

    return jsonify(dict(msg = "Note Added" )), 200


@api.route('/delete-note', methods = ['POST'])
@jwt_required()
def deleteNote():

    data = json.loads(request.data)
    id = get_jwt_identity()
    db.delete(data['id'],id,1)

    return jsonify(dict(msg = "Note Deleted" )), 200