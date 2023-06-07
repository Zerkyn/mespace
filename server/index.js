require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const {SERVER_PORT, SECRET} = process.env
const {Users} = require('./models/users')
const {Friends} = require('./models/friends')

const {login, register, getUser, logout} = require('./controllers/authCntrl.js')
const { sequelize } = require('./util/database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: SECRET,
    cookie: {maxAge: 86400000}
}))

Users.hasMany(Friends)
Friends.belongsTo(Users)

//user endpoints
app.post('/login', login)
app.post('/register', register)
app.get('/user', getUser)
app.post('/logout', logout)

// {force:true}
sequelize.sync().then(() => {
        app.listen(SERVER_PORT, () => {
            console.log(`BEEP ${SERVER_PORT} BOOP`)
        })
    })
    .catch(err => console.log(err))