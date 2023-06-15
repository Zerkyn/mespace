require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
// const socket = require('socket.io')
const { SERVER_PORT, SECRET } = process.env
const { Users } = require('./models/users')
const { Friends } = require('./models/friends')
const { Messages } = require('./models/messages')
const {Colors} = require('./models/colors')

const { login, register, getUser, logout } = require('./controllers/authCntrl.js')
const { searchUser, searchFriends, addFriend, getFriends, searchFriend } = require('./controllers/friendCntrl.js')
const {newColorScheme} = require('./controllers/profileCntrl')
const { sequelize } = require('./util/database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SECRET,
    cookie: { maxAge: 86400000 }
}))

Users.hasOne(Colors)
Colors.belongsTo(Users)

app.post('/login', login)
app.post('/register', register)
app.get('/user', getUser)
app.post('/logout', logout)

app.get('/search/:username', searchUser)
app.post('/searchFriends', searchFriends)
app.post('/addFriend', addFriend)
app.get('/friends/:id', getFriends)
app.get('/searchUser/:id', searchFriend)

app.put('/newColors/:id', newColorScheme)


const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
    }
})

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`)

    socket.on('create', room => {
        socket.join(room)
    })

    //this sockets is getting all the messages
    socket.on('enter', async ({ room }) => {
        if (room === 0) {
            console.log('no friend selected')
        } else {
            socket.join(room)
            const receiveMessages = await Messages.findAll({ where: { room_id: room } })
            socket.emit('joined', receiveMessages)
        }
    })

    socket.on('send_message', async data => {
        let newMessage = await Messages.create({
            message: data.message,
            author_id: data.user,
            room_id: data.room
        })
        // const receiveMessages = await Messages.findAll({ where: { room_id: data.room } })

        io.in(data.room).emit('receive_message', newMessage)
    })
})


// {force:true}
sequelize.sync().then(() => {
    server.listen(SERVER_PORT, () => {
        console.log(`BEEP ${SERVER_PORT} BOOP`)
    })
})
    .catch(err => console.log(err))