from flask import Flask as flsk
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from . import models
from flask_cors import CORS
from flask_jwt_extended import JWTManager

dbase = SQLAlchemy()
    

def create_app():

    app = flsk('backEnd')
    app.config.from_object(f"config.{app.config['ENV']}Config")
    dbase.init_app(app)
    CORS(app)
    jwt = JWTManager(app)

    from . import notes
    app.register_blueprint(notes.notes)

    from . import auth
    app.register_blueprint(auth.auth)

    from . import api
    app.register_blueprint(api.api)

    from . import db
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return models.users.query.get(int(id))

    return app
