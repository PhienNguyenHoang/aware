const functions = require('firebase-functions');

const app = require('express')();

const { signup } = require('./handlers/user')

app.post('/signup', signup);



exports.api = functions.region("asia-east2").https.onRequest(app);