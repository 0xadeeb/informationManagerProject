# Introduction

This is a demo notes app which uses python flask in the back-end and react.js in the front-end.

# Running the application

## Setting up the back-end

1. Create a postgres database with the name `userNotes` by running `createdb userNotes` in the command line.

2. From root directory of the project set up environment variables by running these 3 commands.

```bash
export FLASK_APP=backEnd
export FLASK_ENV=development
export DATABASE_URL=userNotes
```

3. Install dependencies using `pip install -r requirements.txt`.

4. Run `flask initdb` to create the initial database.

5. Run `flask run` to run the front-end application.

### For testing the back-end

1. Create a postgres database with the name `testUserNotes` by running `createdb testUserNotes` in the command line.

2. From `testing` directory of the project set up environment variables by running these 3 commands.

```bash
export FLASK_APP=backEnd
export FLASK_ENV=testing
export DATABASE_URL=testUserNotes
```

3. Install dependencies using `pip install -r requirements.txt`.

4. Run `flask initdb` to create the initial database from root directory.

5. Run `pytest` to run the tests and then run `flask initdb` from root directory.

## Setting up the front-end

1. After starting the back end, from `frontend` directory of the project run `npm-install` to install the required packages.

2. Set up environment variables by running ` export REACT_APP_API_SERVER=http://127.0.0.1:5000`.

3. Run `npm start` to run the app.

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
