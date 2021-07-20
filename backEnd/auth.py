from flask import Blueprint, render_template, request, flash
from flask.helpers import url_for
from werkzeug.security import check_password_hash
from flask_login import login_user, login_required, LoginManager, logout_user, current_user
from werkzeug.utils import redirect
from . import db
from .models import users

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


@auth.route('/login', methods = ['GET','POST'])
def login():
    if(request.method == 'POST'):

        if 'Rm' in request.form.getlist('rememberMe'):
            remMe = True
            
        else:
            remMe = False
            
        userId = request.form.get('userName')
        t = db.logIn(userId)
        if t:
            hashedPass = 'sha256$'+t[3] 

        print(t)
        if t == None:
             flash('Incorrect Username', category='error')
            
        elif check_password_hash(hashedPass, request.form.get('password')):
            flash('Logged in successfully!', category='success')
            
            user = users()
            user.id = t[0]
            user.username = t[1]
            user.name = t[2]
            user.password = t[3]

            login_user(user, remember=remMe)

            return redirect(url_for('notes.home'))
            

        else :
             flash('Incorrect Username or password', category='error')


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