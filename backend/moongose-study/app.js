// initialize express, mongoose, app, env variables
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// add middlewear so it can read JSON files
app.use(express.json());

// coonect to MongoDB

mongoose.connect(process.env.MONGO_UI,{useNewUrlParser: true, useUnifiedTopology: true});

// assign db to mongoose connection
let db = mongoose.connection;

// Initialize Mongoose Connection to MongoDB event listeners

// Error event listener
db.on('error', (error)=>{
    console.error('error', error);
})

// Success event listener. Connect only ONCE
db.once('open', ()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Successfully listening to port', process.env.PORT)
    })
    
})

db.on('disconnected', ()=>{
    console.log('Disconnected to port', process.env.PORT)
})

// Create Blueprint Scehma

const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName: {
        type: String,
    },
    phone:{
        type: Number
    }
})

// Initialize Model

const Person = mongoose.model('Person', personSchema)

// Add user
app.post('/add-users',(req, res)=>{
    // Object deconstruct request body
    const { firstName, phone } = req.body
    // Find duplication in the collection
    Person.findOne({firstName})
    .then((result) => {
        if(result != null && result.firstName == firstName){
            res.send('Duplicated user')
        } else {
            let newUser = new Person({
                firstName: firstName,
                phone: phone
            });
            newUser.save()
            .then((savedUser)=>{
                if(savedUser){
                    res.send(`${firstName} has been successfully saved.`)
                } else {
                    res.send('Error did not save')
                };

            });
        };
    });
});

app.get('/retrieve-users', (req,res)=>{
    Person.find({})
    .then((result) => {
        res.send(result)
    });
});

app.delete('/delete-users', (req,res) =>{
    Person.deleteMany({})
    .then((result)=>{
        if (result.deletedCount > 0){
            res.status(200).send(`All users have been deleted. ${result.deletedCount} have been deleted`);
        } else {
            res.status(400).send('Nothing to delete')
        };
    });
});
