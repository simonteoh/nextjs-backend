const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();
const prisma = new PrismaClient();

router.get("/", async(req, res) =>{
    try {
        const users = await prisma.user.findMany({})
        console.log(Math.floor(Date.now() / 1000))
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