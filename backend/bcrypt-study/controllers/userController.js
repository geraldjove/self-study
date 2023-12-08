const User = require('../models/User');
const auth = require('../auth');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    await User.findOne({email: req.body.email})
    .then((result)=>{
        if(result){
            res.send('Duplicated user')
        } else {
            let newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                isAdmin: req.body.isAdmin,
                mobileNo: req.body.mobileNo
            })
            return newUser.save()
            .then((savedUser, err)=>{
                if(savedUser){
                    res.status(200).send('New user is registered!')
                } else {
                    res.status(500).send('Error: ', err)
                }
            })
        }
    })
    .catch((err)=>res.status(500).send('Error: ', err))
}

const getUsers = async (req, res) => {
    await User.find({})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log('Error: ', err)
    })
}

const loginUser = async (req, res) => {
    await User.findOne({email : req.body.email})
    .then((result)=>{
        if(result){
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
            if(isPasswordCorrect){
                return res.status(200).send({access : auth.createAccessToken(result)})
            } else {
                res.send('Wrong password.');
            }
        } else {
            res.send('Incorrect email or user does not exist');
        }
    })
    .catch((err)=> console.log('Error: ', err))
}

module.exports = {
    registerUser,
    getUsers,
    loginUser
}