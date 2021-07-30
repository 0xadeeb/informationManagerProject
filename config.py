import os

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = '(:guessTheKey:)'
    JWT_SECRET_KEY = '(:guessTheKey_JWTVersion:)'

    DB_NAME = 'postgres://dfwtnnmybieilm:c3df2dbc7edcfb92c93239bb23e6287c55875930a8ce8064bac02bfcf214c56e@ec2-18-214-140-149.compute-1.amazonaws.com:5432/d70si98fvuu3g3'
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

