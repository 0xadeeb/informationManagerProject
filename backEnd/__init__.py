from flask import Flask as flsk, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager
  

def create_app():

    app = flsk('backEnd')
    app.config.from_object(f"config.{app.config['ENV']}Config")
    CORS(app)
    jwt = JWTManager(app)

    from . import auth
    app.register_blueprint(auth.auth)

    from . import api
    app.register_blueprint(api.api)

    from . import db
    db.init_app(app)

    @app.route('/')
    def index():
        return render_template('index.html')
    
    return app
