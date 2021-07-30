from backEnd import create_app
from faker import Faker
import random
import json

faker = Faker()
n = 86
t = 34

def test_config():
    assert create_app().testing


def test_signin(client):

    mimetype = 'application/json'
    header = {
        'Content-Type': mimetype,
        'Accepts': mimetype
    }

    data = {
        'userName': 'testuser',
        'firstName': 'test',
        'password1': 'test1234',
    }



    resp = client.post('/signup', data = json.dumps(data), headers = header)

    assert resp.content_type == mimetype
    assert resp.status_code == 200

    resp = client.post('/signup', data = json.dumps(data), headers = header)

    assert resp.json["variant"] == 'danger'


def test_login(client):

    mimetype = 'application/json'
    header = {
        'Content-Type': mimetype,
        'Accepts': mimetype
    }


    data1 = {
        'userName': 'testuser',
        'pass': 'test12345',
    }

    data2 = {
        'userName': 'testuser',
        'pass': 'test1234',
    }

    data3 = {
        'userName': 'test_user',
        'pass': 'test1234',
    }



    resp = client.post('/login', data = json.dumps(data1), headers = header)

    assert resp.status_code == 200
    assert resp.json["variant"] == 'danger'
    
    resp = client.post('/login', data = json.dumps(data3), headers = header)
    
    assert resp.status_code == 200
    assert resp.json["variant"] == 'danger'

    resp = client.post('/login', data = json.dumps(data2), headers = header)

    
    assert resp.json["variant"] == 'success'
    assert resp.json["accessToken"] is not None

def test_homePage(client):

    #test authorization requirement to access home page

    mimetype = 'application/json'
    
    header1 = {
        'Content-Type': mimetype,
        'Accepts': mimetype,
    }

    resp = client.post('/api/getallnotes', headers = header1)

    assert resp.status_code == 405

    resp = client.get('/api/getallnotes', headers = header1)

    assert resp.status_code == 401

    data = {
        'userName': 'testuser',
        'pass': 'test1234',
    }

    resp = client.post('/login', data = json.dumps(data), headers = header1)
    token = resp.json["accessToken"]

    assert resp.status_code == 200
    
    header2 = {
        'Accepts': mimetype,
        'Authorization': f"Bearer {token}"
    }

    resp = client.get('/api/getallnotes', headers = header2)
    
    assert resp.status_code == 200


def test_addNotes(client):

    mimetype = 'application/json'

    data = {
        'userName': 'testuser',
        'pass': 'test1234',
    }

    resp = client.post('/login', data = json.dumps(data), headers = {'Accepts': mimetype})
    token = resp.json["accessToken"]

    
    header = {
        'Accepts': mimetype,
        'Authorization': f"Bearer {token}"
    }

    notes = []

    tags = [faker.word() for i in range(t)]
    
    for i in range(n):
        d = {
            'title': faker.sentence(),
            'note': faker.text(max_nb_chars = 1500),
            'tags' : random.sample(tags, random.randint(0, 7))
        }

        notes.append(d)

    arr = list(range(n))
    random.shuffle(arr)

    for i in arr:
        resp = client.post('/api/add-note', data = json.dumps(notes[i]), headers = header)
        assert resp.status_code == 200

    
    resp = client.get('/api/getallnotes', headers = header)
    
    nts = resp.json['notes']

    for i in range(len(nts)):
        assert nts[i]['Title'] == notes[arr[i]]['title']


    for i in range(1,n+1,-2):
        resp = client.post('/api/get-notes-info', data = json.dumps({'id': i}), headers = header)
        assert resp.json['note'][0] == notes[arr[i-1]]['title']
        assert resp.json['note'][1] == notes[arr[i-1]]['note']




def test_editNote(client):
    mimetype = 'application/json'

    data = {
        'userName': 'testuser',
        'pass': 'test1234',
    }

    resp = client.post('/login', data = json.dumps(data), headers = {'Accepts': mimetype})
    token = resp.json["accessToken"]

    
    header = {
        'Accepts': mimetype,
        'Authorization': f"Bearer {token}"
    }

    tags = [faker.word() for i in range(t)]

    arr = random.sample(range(1,n+1), random.randint(0, n))
    # print((list(arr)))
    notes = []
    for i in arr:
        d = {
            'id': i,
            'title': faker.sentence(),
            'note': faker.text(max_nb_chars = 1500),
            'tags' : random.sample(tags, random.randint(0, 7))
        }
        notes.append(d)

    for i in range(len((arr))):
        resp = client.post('/api/edit-note', data = json.dumps(notes[i]), headers = header)
        assert resp.status_code == 200

    
    resp = client.get('/api/getallnotes', headers = header)

    nts = resp.json['notes']
    # print(nts)
    for i in range(-1, -1*len(arr)):
        assert nts[i]['Title'] == notes[arr[i]]['title']


def test_filteredNotes(client):
    mimetype = 'application/json'

    data = {
        'userName': 'testuser',
        'pass': 'test1234',
    }

    resp = client.post('/login', data = json.dumps(data), headers = {'Accepts': mimetype})
    token = resp.json["accessToken"]

    
    header = {
        'Accepts': mimetype,
        'Authorization': f"Bearer {token}"
    }

    resp = client.get('/api/getallnotes', headers = header)

    for i in range(15):    
        tags = random.sample(resp.json['tags'], random.randint(1, t))
        print(tags) 
        
        resp = client.post('/api/get-filtered-notes', data = json.dumps({'tags':tags}), headers = header)
        assert resp.status_code == 200
        

def test_deleteNotes(client):

    mimetype = 'application/json'

    data = {
        'userName': 'testuser',
        'pass': 'test1234',
    }

    resp = client.post('/login', data = json.dumps(data), headers = {'Accepts': mimetype})
    token = resp.json["accessToken"]

    
    header = {
        'Accepts': mimetype,
        'Authorization': f"Bearer {token}"
    }


    arr = random.sample(list(range(1,n+1)), random.randint(0, n))

    for i in arr:
        resp = client.post('/api/delete-note', data = json.dumps({'id': i}), headers = header)
        assert resp.status_code == 200

    resp = client.get('/api/getallnotes', headers = header)

    nts = resp.json['notes']

    for note in nts:
        assert note['noteId'] not in arr


