const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/register', (req, res)=>{
    userController.registerUser(req.body)
    .then((resultFromController)=>res.send(resultFromController))
})

router.get('/', (req, res)=>{
    userController.getUsers(req.body)
    .then((resultFromController)=>res.send(resultFromController))
})

router.post('/login', (req, res)=>{
    userController.loginUser(req.body)
    .then((resultFromController)=>res.send(resultFromController))
})

router.patch('/:id/change-details', (req, res)=>{
    userController.updateUser(req.params.id, req.body)
    .then((resultFromController)=>res.send(resultFromController))
})

router.delete('/delete-user/:id', (req, res)=>{
    userController.deleteUser(req.params.id, req.body)
    .then((resultFromController)=>res.send(resultFromController))
})

module.exports = router;