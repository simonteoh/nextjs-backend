const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();
const prisma = new PrismaClient();
const checkAuth = require("../middlewares/checkAuth")

const EventEmitter = require('events'); //Upper case becuz its class

const emitter = new EventEmitter(); // this is object

//Register a listener, the callback func will called when event is raised
emitter.on('messageLogged', function(){
    console.log('Listener called!')
})

//Raise an event or Call the event


router.get("/", checkAuth, async(req, res) =>{
    try {
        const users = await prisma.user.findMany({})
        return res.json({
            message: "Success retrieved users",
           data: users,
           time: Math.floor(Date.now() / 1000)
        })
        
    } catch (error) {
        console.log('user display error')
          
        console.log(error)
    }
})

module.exports = router;