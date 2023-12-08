const Post = require('../models/post');

module.exports.createPost = (requestBody) =>{
    const { title, content } = requestBody;
    return Post.findOne({title: title})
    .then((result)=>{
        if (result != null && result.title == title){
            return "Duplicated post";
        } else {
            let newPost = new Post({
                title: title,
                content: content
            })
            return newPost.save()
            .then((savedPost, err)=>{
                if(savedPost){
                    return savedPost;
                } else{
                    return err
                }
            })
        }
    }).catch((err)=>{
        console.error('Error:', err)
    })
}

module.exports.getAllPosts = () => {
    return Post.find({})
    .then((posts, err)=>{
        if (posts){
            return posts;
        } else {
            return err;
        }
    })
}

module.exports.updatePost = (postId, requestBody) => {
    return Post.findByIdAndUpdate(postId, {
        title: requestBody.title,
        content: requestBody.content
    }, {new: true})
    .then((updatedPost)=>{
        return updatedPost
    })
    .catch((error)=> error)
}

module.exports.deletePost = (postId) => {
    return Post.findByIdAndDelete(postId);
}