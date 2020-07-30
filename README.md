# Hendrix Backend

Hendrix-Backend is Node starter for rest api using express, passport and mongodb

###How to use
Clone the repository to your machine, then
````
npm install
````
Create a .env file in the root folder and copy this lines to it:
````
PORT=8989
# any mongodb uri
MONGODB_URI=mongodb://localhost:27017/hendrix

# some random chars 
SESSION_SECRET=WeLoveIsrael

# this can be development or production
NODE_ENV=development 

# some random chars 
MAGIC_WORD=MusicIsLife

# this directory from the root will hold the logs
LOG_DIR=log
````
