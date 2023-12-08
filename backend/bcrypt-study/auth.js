const jwt = require('jsonwebtoken');
const env = process.env;
require('dotenv').config();

const createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(data, env.ACCESS_TOKEN_SECRET,{})
}

const verifyUser = (req, res, next) => {
    let token = req.headers.authorization;
    if(typeof token === null){
        return res.send("Authentication failed. No Token detected.");
    } else {
        token = token.slice(7, token.length);
        jwt.verifOy(token, env.ACCESS_TKEN_SECRET, (err,decodedToken) => {
            if(err){
                return res.sendStatus(403)
            } else {
                req.user = decodedToken;
                next();
            }
        })
    }
}

const verifyAdmin = (req, res, next) => {
	if(req.user.isAdmin){
		next();
	} else {
		return res.status(403).send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}

module.exports = {
    createAccessToken,
    verifyUser,
    verifyAdmin
}