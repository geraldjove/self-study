const postController = require('../controllers/postController')
const express = require('express');
const router = express.Router();

router.post('/addPost', (req, res)=>{
    postController.createPost(req.body)
    .then((resultFromController)=> res.send(resultFromController))
})

router.get('/', (req,res)=>{
    postController.getAllPosts(req.body)
    .then((resultFromController)=>res.send(resultFromController));
})

router.patch('/:id', (req, res) =>{
    postController.updatePost(req.params.id, req.body)
    .then((resultFromController)=>res.send(resultFromController));
})

router.delete('/:id', (req, res)=>{
    postController.deletePost(req.params.id)
    .then((resultFromController)=>res.send(resultFromController));
})
module.exports = router;