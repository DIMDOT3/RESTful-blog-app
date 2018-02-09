# Project Title
A full stack CRUD final project using Node.js, Express, and MongoDB.  This project was part of a course [The Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/) by Colt Steele on [udemy.com](https://www.udemy.com)

## Demo App

See a demo of the app [here](https://safe-eyrie-62381.herokuapp.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This app requires Node.js, NPM and MongoDB to run
You can either use an IDE or you installing Node.js and MongoDB onto your local machine.  I suggest using an IDE such as Cloud9

If you want to run on a local machine, you can find information on install below:

[Node & NPM](https://nodejs.org/en/)
[MongoDB 3.6](https://docs.mongodb.com/manual/)

## Getting Started

Clone (with git) or download the project directory to your workspace and install dependencies.

```
>npm install
```

Set up MongoDB in project directory with the following commands.

```
<---- Fetch the MongoDb code ---->
>sudo apt-get install -y mongodb-org

<---- Create a directory to store Mongo files---->
>mkdir data

<---- Create path for MongoDb files ---->
****** "dbpath" below must match the directory created in line 2 ****
>echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod

<---- Run this Command ---->
>chmod a+x mongod
```

## Running the App

### Starting up MongoDB
In the parent project directory, in a separate terminal window, run the command to initiate Mongo Demon process in the background.

```
>mongod

```

### Start up app
In the project directory execute "node index.js" to start up the server.  Navigate to the local server url for app interface.

```
>node index.js

```

### Stopping the app
When you want to stop the app, you have to quit out of both the Mongo Demon and the App itself.  In each respective terminal, enter the following command:

```
>^c
```
That is the buttons "control" plus "c" on your keyboard.