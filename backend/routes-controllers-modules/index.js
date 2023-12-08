const express = require('express');
const mongoose = require('mongoose');
const app = express();
const env = process.env;
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect(env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.on('error', (err)=>console.error.bind(err));
db.once('open', ()=>{
    app.listen(env.PORT, ()=>{console.log('listening to port', env.PORT)})
})

app.use('/posts', postRoute);
app.use('/users', userRoute);
