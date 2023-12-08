const express = require('express');
const mongoose = require('mongoose');
const app = express();
const env = process.env
const cors = require('cors');
const userRoute = require('./routers/userRoute')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection;

db.on('error', (error) => {
    console.log('Error: ', error);
});

db.once('open', ()=>{
    app.listen(env.PORT, ()=>{
        console.log('Successfully listening to port: ', env.PORT);
    });
});

db.on('disconnected', () => {
    console.log('Disconnected to port', env.PORT);
});

app.use('/users', userRoute)