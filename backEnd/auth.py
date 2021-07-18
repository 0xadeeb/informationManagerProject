from flask import Blueprint, render_template

auth = Blueprint('auth', 'backEnd', url_prefix= '/')


@auth.route('/')
def home():
    return "<h2>Loading... </h2>"

@auth.route('/login', methods = ['GET','POST'])
def login():
    return render_template('login.html')


@auth.route('/signup', methods = ['GET','POST'])
def signup():
    return render_template('signUp.html')