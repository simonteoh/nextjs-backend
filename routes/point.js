require('dotenv').config()

const router = require("express").Router();
const { PrismaClient } = require('@prisma/client')
const {points} = new PrismaClient()
const checkAuth = require("../middlewares/checkAuth")


//Get private user point
router.get("/", checkAuth,async(req, res) => {
    try {
        const getPoints = await points.findFirstOrThrow({
            where:{
                userId: req.body.userId
            }
        });
        return res.json({
            message: "Retrieved private user point success",
            getPoints
        })
    } catch (error) {
        return res.status(400).json({
            message: "No points to get from database"
        });
    }
})
//Store point
router.post("/store", async (req, res) => {
    
    try {
        const {point, userId} = req.body
        const userExist = await points.findUnique({
            where: {
                userId
            },
            select:{
                userId: true
            }
        })
        console.log(userExist)
        if(userExist){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        
    const createPoint = await points.create({
        data: {
            point,
            userId
        }
    })
    res.json({
        message: "Point stored!",
        createPoint
    })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;