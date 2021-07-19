from sqlalchemy.sql.expression import null
from .__init__ import dbase
from flask_login import UserMixin
from sqlalchemy.sql import func


class users(dbase.Model, UserMixin):
    id = dbase.Column(dbase.Integer, primary_key=True)
    username = dbase.Column(dbase.String(150), unique=True)
    password = dbase.Column(dbase.String(150))
    name = dbase.Column(dbase.String(150))


class notes(dbase.Model):
    id = dbase.Column(dbase.Integer, primary_key=True)
    notes = dbase.Column(dbase.String(10000))
    added_on = dbase.Column(dbase.DateTime(timezone=True), default=func.now())
    stared = dbase.Column(dbase.Boolean)

    user = dbase.Column(dbase.Integer, dbase.ForeignKey('user.id'))

class tags(dbase.Model):
    id = dbase.Column(dbase.Integer, primary_key=True)
    tag = dbase.Column(dbase.String(150), unique=True)

class noteTags(dbase.Model):
    id = dbase.Column(dbase.Integer, primary_key=True)
    user = dbase.Column(dbase.Integer, dbase.ForeignKey('users.id'))
    tag = dbase.Column(dbase.Integer, dbase.ForeignKey('tags.id'))
