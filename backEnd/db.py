import psycopg2
import click 
from flask import current_app, g
from flask.cli import with_appcontext

def getDb():
    if 'db' not in g:
        db = current_app.config['DB_NAME']
        g.db = psycopg2.connect(f"dbname={db}")

    return g.db


def closeDb(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

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




    