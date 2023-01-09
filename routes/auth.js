require('dotenv').config()

const router = require("express").Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const {user} = new PrismaClient()

//Sign up user
router.post("/signup", [
    check("username", "Please provide a valid username").isLength({min: 6})
],async (req, res) => {
    console.log(123, req.body)
    
    try {
        const {username,name, password} = req.body
    const userExist = await user.findUnique({
        where: {
            username
        },
        select:{
            username: true
        }
    })
    if(userExist){
        return res.status(400).json({
            message: "User already exists"
        });
    }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const createUser = await user.create({
        data: {
            username,
            name,
            password: hashedPassword
        }
    })
    const token = await JWT.sign({
        username
    }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: 3600000
    })
    res.json({
        message: "User created!",
        token
    })
    } catch (error) {
        console.log(error);
    }
})

//Login User

router.post("/login", async(req, res) => {
    const { username, password } = req.body;

    const user = await user.findFirst({
        where: {
            username
        }
    })
    console.log(user);
    let isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.json({
            message: "Invalid credential"
        })
    }
    
    const token = await JWT.sign({
        username
    }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: 360000
    })

    return res.json({
        message: "Login success",
        token
    })
    
})
module.exports = router;