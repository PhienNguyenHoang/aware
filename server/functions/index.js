const functions = require('firebase-functions');

const app = require('express')();

const { signup, getAuthenticatedUser } = require('./handlers/user')

const FirebaseAuth = require("./util/FirebaseAuth");

const cors = require('cors');
app.use(cors());



//user
app.post('/signup', signup);

app.get('/user',FirebaseAuth,  getAuthenticatedUser);



exports.api = functions.region("asia-east2").https.onRequest(app);