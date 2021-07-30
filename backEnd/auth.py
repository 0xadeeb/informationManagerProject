from flask import Blueprint, render_template, request, flash, jsonify, session, g
from flask.helpers import url_for
from werkzeug.security import check_password_hash
from werkzeug.utils import redirect
from . import db
from .models import User
import json
from flask_jwt_extended import create_access_token
import functools

auth = Blueprint('auth', 'backEnd', url_prefix= '/')


def login_required(view):
    
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for("auth.login"))

        return view(**kwargs)

    return wrapped_view


@auth.before_app_request
def load_logged_in_user():
    
    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        dbase = db.getDb()
        cur = dbase.cursor()
        cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        t = cur.fetchone()
        user = User()
        user.id = t[0]
        user.username = t[1]
        user.name = t[2]
        user.password = t[3]
        user.is_authenticated = True
        g.user = user
        
        

def insertToDb(r):

    
    d = json.loads(r.data)
    userName = d['userName']

    if db.uniqueId(userName):
        db.insert(d, 1, None)
        return jsonify(dict(variant = 'success', msg = "New account created."))
    else:
        return jsonify(dict(variant = 'danger', msg = "Sorry User Name not available, Pick a new User Name"))
    

@auth.route('/login', methods = ['GET','POST'])
def login():
    if(request.method == 'POST'):
        
        
        data = json.loads(request.data)
        userId = data['userName']
        pswrd = data['pass']
        rm = []
                    
        t = db.logIn(userId)
        if t:
            hashedPass = 'sha256$'+t[3] 

        if t == None:
            
            return jsonify(dict(msg = 'Invalid username!', variant = 'danger'))
            
            
        elif check_password_hash(hashedPass, pswrd):
            flash('Logged in successfully!', category='success')
            session["user_id"] = t[0]

            access_token = create_access_token(t[0])
            return jsonify(dict(msg = 'Successfully logged in!', variant = 'success', accessToken = access_token, userId = t[0]))
            
        else:
            return jsonify(dict(msg = 'Invalid Username or password', variant = 'danger'))
            flash('Incorrect Username or password', category='error')
        


@auth.route('/signup', methods = ['GET','POST'])
def signup():
    if request.method == 'POST':
        d = insertToDb(request)
        return d



@auth.route('/logout')
@login_required
def logout():
    session.clear()
    return redirect(url_for('auth.login'))