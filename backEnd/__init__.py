from flask import Flask as flsk

def create_app():

    app = flsk('backEnd')

    from . import notes
    app.register_blueprint(notes.notes)

    from . import auth
    app.register_blueprint(auth.auth)

    return app