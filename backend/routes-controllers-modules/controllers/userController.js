const user = require('../models/user');
const User = require('../models/user');

module.exports.registerUser = (requestBody) =>{
    return User.findOne({email: requestBody.email})
    .then((result)=>{
        if (result != null && result.email == requestBody.email){
            return "User already registered";
        } else {
            let newUser = new User({
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                email: requestBody.email,
                password: requestBody.password
            })
            return newUser.save()
            .then((savedUser, err)=>{
                if(savedUser){
                    return savedUser;
                } else {
                    return err;
                }
            })
        }
    })
    .catch(error=>error)
}

module.exports.getUsers = () => {
    return User.find({})
    .then((result)=>result)
}

module.exports.loginUser = (requestBody) => {
    return User.findOne({email: requestBody.email})
    .then((result)=>{
        if (result !=null && result.email == requestBody.email){
            if(result.password == requestBody.password){
                return "Successful Login";
            } else {
                return "Wrong Password!";
            }
        } else {
            return "Wrong email or email does not exists";
        }
    })
}

module.exports.updateUser = (userId, requestBody) => {
    return User.findByIdAndUpdate(userId, {
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        email: requestBody.email,
        password: requestBody.password
    }, {new: true})
    .then((updateUser) => {
        return updateUser
    })
    .catch(error => error)
}

module.exports.deleteUser = (userId) => {
    return User.findByIdAndDelete(userId);
}