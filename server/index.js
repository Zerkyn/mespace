require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env

//controller imports
const {login, register} = require('./controllers/cntrl.js')

const app = express()

app.use(cors())
app.use(express.json())

//user endpoints
app.post('/login', login)
app.post('/register', register)

app.listen(SERVER_PORT, () => {
    console.log(`on ${SERVER_PORT}`)
})