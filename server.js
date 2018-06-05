{/* Gets the express package */}
const express = require('express');

{/* Imports middleware, parses into JSON. Pretty much every express app uses this */}
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');
{/* starts running the app, by running express */}
const app = express();
{/* Cors -- for Access-Control-Allow-Origin */}
const cors = require('cors');

const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
		client: 'pg',
		connection: {
		  host : '127.0.0.1',
		  user : 'anestisfinstad',
		  password : '',
		  database : 'smart-brain'
		}
});



{/* Middle ware package, grabs info we recieve, and parses it into something that we can use. 
	Like in the sign in info coming from the front end */}
app.use(cors())
app.use(bodyParser.json());




app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) 
{/* Displays user id number based on rank, after login */}
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


{/* listens for the app, runs the server on the port you like*/}
app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`)
})



/*
/setting up your routes

/ --> res = this is working
/signin  --> POST = success/fail	
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/