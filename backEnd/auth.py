from flask import Blueprint, render_template, request, flash, jsonify
from flask.helpers import url_for
from werkzeug.security import check_password_hash
from flask_login import login_user, login_required, LoginManager, logout_user, current_user
from werkzeug.utils import redirect
from . import db
from .models import users
import json

auth = Blueprint('auth', 'backEnd', url_prefix= '/')

def insertToDb(d):
    
    if d == None:
        flash('Sorry some error has occured, try again. ',category='error')

    elif len(d.get('userName')) == 0:
        flash('Enter a User Name!',category='error')

    elif len(d.get('firstName')) == 0:
        flash('Enter your name!',category='error')

    elif len(d.get('password1')) == 0:
        flash('Enter password!',category='error')

    elif len(d.get('password2')) == 0:
        flash('Confirm your password!',category='error')

    elif d.get('password1') != d.get('password2'):
        flash('Passwords don\'t match!',category='error')

    elif len(d.get('password1')) < 6:
        flash('Password should be atleast 6 characters!',category='error')

    elif db.uniqueId(d.get('userName')):
        db.insert(d, 1, None)
        flash('Created a new account.',category='success')
        return redirect(url_for('auth.login'))

    else:
        flash('Sorry User Name not available, Pick a new User Name.',category='error')

    return None

@auth.route('/is-autherised', methods = ['GET','POST'])
def isLoggedin():

    data = json.loads(request.data)
    id = data['id']
    print(id,current_user)
    if current_user.is_authenticated:
        return jsonify(dict(autherised = (current_user.id == int(id))))
    else:
        return jsonify(dict(autherised = False))
    

@auth.route('/login', methods = ['GET','POST'])
def login():
    if(request.method == 'POST'):
        print('hi')
        print(request.accept_mimetypes.best)

        if (request.accept_mimetypes.best == "*/*"):
            data = json.loads(request.data)
            userId = data['id']
            pswrd = data['pass']
            rm = []
        else:
            userId = request.form.get('userName')
            pswrd = request.form.get('password')
            rm = request.form.getlist('rememberMe')

        if 'Rm' in rm:
            remMe = True
            
        else:
            remMe = False
            
        t = db.logIn(userId)
        if t:
            hashedPass = 'sha256$'+t[3] 

        if t == None:
            if (request.accept_mimetypes.best == "*/*"):
                return jsonify(dict(logn = False))
            flash('Incorrect Username', category='error')
            
        elif check_password_hash(hashedPass, pswrd):
            flash('Logged in successfully!', category='success')
            
            user = users()
            user.id = t[0]
            user.username = t[1]
            user.name = t[2]
            user.password = t[3]
            print(t)

            login_user(user, remember=remMe)

            if (request.accept_mimetypes.best == "*/*"):
                return jsonify(dict(logn = True))
            else:
                return redirect(url_for('notes.home'))
            
        else:
            if (request.accept_mimetypes.best == "*/*"):
                return jsonify(dict(logn = False))
            flash('Incorrect Username or password', category='error')

    else:
        return render_template('login.html', user = current_user)


@auth.route('/signup', methods = ['GET','POST'])
def signup():
    if request.method == 'POST':
        if insertToDb(request.form):
            return redirect(url_for('auth.login'))

    return render_template('signUp.html', user = current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))