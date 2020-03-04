# Simple Stock manager

This is a simple web application that allows user to buy stocks.

## Setup

To run this application you need to clone it

```
git clone https://github.com/bkkenzo/SimpleStocksManager.git
```

Cd into the project directory and run

```
npm install
```

After the install you have to create the database

```
createdb stock-portfolio
```

You need to seed the database with users created for testing purposes

```
npm run seed
```

Then you can run the application with:

```
npm run start-dev
```

### Heroku

This project is deployed to heroku:

http://simple-stocks-manager.herokuapp.com
