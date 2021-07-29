from backEnd import create_app
import json

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



    resp = client.post('/login', data = json.dumps(data1), headers = header)

    assert resp.status_code == 200
    assert resp.json["variant"] == 'danger'
    
    
    resp = client.post('/login', data = json.dumps(data2), headers = header)

    token = resp.json["accessToken"]
    assert resp.json["variant"] == 'success'
    assert token != ""

def test_homePage(client):

    mimetype = 'application/json'
    
    header1 = {
        'Content-Type': mimetype,
        'Accepts': mimetype,
    }

    resp = client.post('/api/getallnotes', headers = header1)

    assert resp.status_code == 405

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

    print(header2)

    resp = client.post('/api/getallnotes', headers = header2)
    
    assert resp.status_code == 200



