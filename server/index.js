require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const socket = require('socket.io')
const {SERVER_PORT, SECRET, SOCKET_PORT} = process.env
const {Users} = require('./models/users')
const {Friends} = require('./models/friends')

const {login, register, getUser, logout} = require('./controllers/authCntrl.js')
const {searchUser, searchFriends, addFriend, getFriends, searchFriend} = require('./controllers/friendCntrl.js')
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


app.post('/login', login)
app.post('/register', register)
app.get('/user', getUser)
app.post('/logout', logout)

app.get('/search/:username', searchUser)
app.post('/searchFriends', searchFriends)
app.post('/addFriend', addFriend)
app.get('/friends/:id', getFriends)
app.get('/searchUser/:id', searchFriend)


const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server, {
    cors:{
        origin: `http://localhost:3000`,
    }
})

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`)

    socket.on('enter', (user) => {
        console.log(user)
    })

})


// {force:true}
sequelize.sync().then(() => {
        server.listen(SERVER_PORT, () => {
            console.log(`BEEP ${SERVER_PORT} BOOP`)
        })
    })
    .catch(err => console.log(err))