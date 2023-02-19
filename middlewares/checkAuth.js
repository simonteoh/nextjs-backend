require('dotenv').config()
const JWT = require('jsonwebtoken')
const logger = require('../Helpers/logger')

module.exports = async (req, res, next) => {
    const token = res.get("Authorization");
        if(!token){
        logger.error('Bearer token not found');
        return res.status(400).json({
            message: "No token found"
        })
    }
    else{
        console.log("Bearer token here");
    }
    
    try {
        let user = await JWT.verify(token, process.env.JWT_TOKEN_SECRET)
        console.log("this is info of user: ",user)
        req.username = user.username
        next()
    } catch (error) {
        return res.status(400).json({
            message: "Token invalid",
            error
        }) 
    }
}