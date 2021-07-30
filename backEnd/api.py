from flask import Blueprint, jsonify, request
from . import db
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json


api = Blueprint('api', 'backEnd', url_prefix= '/api')


@api.route('/getallnotes', methods = ['GET'])
@jwt_required()
def Getdata():

    id = get_jwt_identity()
    dbs = db.getDb()
    cur = dbs.cursor()

    cur.execute("SELECT n.id, n.title, n.stared FROM notes n, users u WHERE n.usr = %s AND u.id = %s ORDER BY n.addedOn", (id,id))

    allNotes = cur.fetchall()

    colNames = ['Sno', 'noteId', 'Title', 'Stared']

    for i in range(len(allNotes)):
        allNotes[i] = dict(zip(colNames, (i+1,) + allNotes[i]))

    tagNames = ['value','label']
    tags = db.getAllTags(id)

    for i in range(len(tags)):
        tags[i] = dict(zip(tagNames, tags[i]))

    return jsonify(dict(notes = allNotes, tags = tags)), 200

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
    db.updateNote(data['title'],data['note'],False,data['id'], [t.lower() for t in data['tags']])

    return jsonify(dict(msg = "Note Added" )), 200


@api.route('/delete-note', methods = ['POST'])
@jwt_required()
def deleteNote():

    data = json.loads(request.data)
    id = get_jwt_identity()
    db.delete(data['id'],id,1)

    return jsonify(dict(msg = "Note Deleted" )), 200


@api.route('/get-filtered-notes', methods = ['POST'])
@jwt_required()
def getFilteredNotes():


    data = json.loads(request.data)
    tags = data['tags']
    id = get_jwt_identity()
    query = "SELECT DISTINCT n.id, n.title, n.stared FROM notes n, users u, tags t, notetags nt WHERE n.usr = %s AND u.id = n.usr AND t.id = nt.tag AND n.id = nt.note AND (t.id = %s"

    for i in range(1,len(tags)):
        query = query + ' OR t.id = %s'

    query = query + ')'

    t = tuple(w['value'] for w in tags)
    var = (id,) + t
    
    dbase = db.getDb()
    cur = dbase.cursor()
    cur.execute(query, var)
    filteredNotes = cur.fetchall()
    colNames = ['Sno', 'noteId', 'Title', 'Stared']

    for i in range(len(filteredNotes)):
        filteredNotes[i] = dict(zip(colNames, (i+1,)+filteredNotes[i]))

    tagNames = ['value','label']
    tags = db.getAllTags(id)

    for i in range(len(tags)):
        tags[i] = dict(zip(tagNames, tags[i]))

    return jsonify(dict(notes = filteredNotes, tags = tags )), 200


