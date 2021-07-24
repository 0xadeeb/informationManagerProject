class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = '(:guessTheKey:)'
    JWT_SECRET_KEY = '(:guessTheKey_JWTVersion:)'

    DB_NAME = "userNotes"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = 'filesystem'

    SESSION_COOKIE_SECURE = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://adeeb:test123@localhost/userNotes'

class developmentConfig(Config):

    DEBUG = False
    SESSION_COOKIE_SECURE = True


class testingConfig(Config):
    TESTING = True

class productionConfig(Config):
    pass

