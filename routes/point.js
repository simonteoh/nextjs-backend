require('dotenv').config()

const router = require("express").Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const checkAuth = require("../middlewares/checkAuth")


//Get private user point
router.get("/", async(req, res) => {
    console.log(req.body.userId)
    try {
        const getPoints = await prisma.point.findFirstOrThrow({
            where:{
                userId: 2
            }
        });
        console.log(getPoints)
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
        
        // const userExist = await prisma.point.findUnique({
        //     where: {
        //         userId
        //     },
        //     select:{
        //         userId: true
        //     }
        // })
        // console.log(userExist)
        // if(userExist){
        //     return res.status(400).json({
        //         message: "User already exists"
        //     });
        // }
        
    const createPoint = await prisma.point.create({
        data: {
            total_earned: point,
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