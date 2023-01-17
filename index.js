require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const auth = require('./routes/auth')
const point = require('./routes/point')
const user = require('./apis/user')
const expressListRoutes = require('express-list-routes');

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
app.use("/auth", auth)
app.use("/point", point)
app.use("/user", user)

//LOGIN WITH JWT
app.post("/login", authToken, (req, res) => {
    const username =  req.body.username
    const user = {
        name: username
    }

    const accessToken = jwt.sign(user, process.env.JWT_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

function authToken(req, res){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)

        req.user =  user
        next()
    })
}

app.listen(5000, () => {
    console.log('running on 5000 port')
    console.log(expressListRoutes(app, { prefix: '' }))
})
