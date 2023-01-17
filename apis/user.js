const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();
const prisma = new PrismaClient();

router.get("/", async(req, res) =>{
    try {
        const users = await prisma.user.findMany({})
        console.log(333, users);
        return res.json({
            message: "Success retrieved users",
           users,
        })
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;