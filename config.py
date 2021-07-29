class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = '(:guessTheKey:)'
    JWT_SECRET_KEY = '(:guessTheKey_JWTVersion:)'

    DB_NAME = "userNotes"
    SESSION_TYPE = 'filesystem'
    JWT_ACCESS_TOKEN_EXPIRES = False

    SESSION_COOKIE_SECURE = True

class developmentConfig(Config):

    DEBUG = False
    SESSION_COOKIE_SECURE = True


class testingConfig(Config):
    TESTING = True
    DB_NAME = "testUserNotes"

class productionConfig(Config):
    pass

