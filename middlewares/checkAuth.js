require('dotenv').config()
const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(400).json({
            message: "No token found"
        })
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