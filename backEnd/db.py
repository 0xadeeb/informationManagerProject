import psycopg2
import click 
from flask import current_app, g
from flask.cli import with_appcontext
from werkzeug.security import generate_password_hash, check_password_hash

def getDb():
    if 'db' not in g:
        db = current_app.config['DB_NAME']
        g.db = psycopg2.connect(f"dbname={db}")

    return g.db


def closeDb(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def uniqueId(id):
    db = getDb()
    cur = db.cursor()
    cur.execute("select username from users where username = %s",(id,))

    if(cur.fetchone() == None):
        return True
    
    else:
        return False

def insert(d):
    userId = d.get('userName')
    name = d.get('firstName')
    password = d.get('password1')
    hashedPass = generate_password_hash(password, method='sha256')

    db = getDb()
    cur = db.cursor()

    cur.execute("INSERT INTO users (username, name, password) VALUES (%s,%s,%s) ", (userId, name, hashedPass[7:]))
    db.commit()

def logIn(userId):
    db = getDb()
    cur = db.cursor()

    cur.execute("SELECT * FROM users where username = %s",(userId,))
    usr = cur.fetchone()

    if not usr or len(usr) == 0:
        print('hi')
        return None

    else:
        return usr
    


def initDb():
    db = getDb()

    f = current_app.open_resource("SQL/tables.sql")
    sqlCode = f.read().decode("utf-8")
    cur = db.cursor()
    cur.execute(sqlCode)
    cur.close()
    db.commit()
    closeDb()

@click.command('initdb', help="initialise the database") 
@with_appcontext
def addCommand():
    initDb()
    click.echo('Data Base Initialised')

def init_app(app):
    app.teardown_appcontext(closeDb)
    app.cli.add_command(addCommand)




    