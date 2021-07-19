class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = '(:guessTheKey:)'

    DB_NAME = "userNotes"

    SESSION_COOKIE_SECURE = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://adeeb:test123@localhost/userNotes'

class developmentConfig(Config):

    DEBUG = False
    SESSION_COOKIE_SECURE = True


class testingConfig(Config):
    TESTING = True

class productionConfig(Config):
    pass

