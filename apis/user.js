const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();
const prisma = new PrismaClient();
const checkAuth = require("../middlewares/checkAuth")


router.get("/", checkAuth, async(req, res) =>{
    try {
        const users = await prisma.user.findMany({})
        return res.json({
            message: "Success retrieved users",
           data: users,
           time: Math.floor(Date.now() / 1000)
        })
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;