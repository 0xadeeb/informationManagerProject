from flask import Flask as flsk


def create_app():

    app = flsk('backEnd')
    app.config.from_object(f"config.{app.config['ENV']}Config")

    from . import notes
    app.register_blueprint(notes.notes)

    from . import auth
    app.register_blueprint(auth.auth)

    from . import db
    db.init_app(app)



    return app