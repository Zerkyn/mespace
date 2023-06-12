// require('dotenv').config()
const bcrypt = require('bcryptjs')
const {Users} = require('../models/users')


module.exports = {

    register: async (req, res) => {
       try {
        const {username, password} = req.body
        const foundUser = await Users.findOne({where: {username: username}})
        if (foundUser) {
            res.status(400).send('username already exists!')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const newUser = await Users.create({username: username, password: hash})
            console.log(newUser)
            req.session.user = {
                userId: newUser.dataValues.id,
                username: newUser.dataValues.username
            }
            res.status(200).send(req.session.user)
        }
       } 
       catch(err) {
        console.log(err)
        res.sendStatus(400)
       }
    },

    login: async (req, res) => {
        try {
            const {username, password} = req.body
            const foundUser = await Users.findOne({where: {username}})
            const isAuthenticated = bcrypt.compareSync(password, foundUser.password)
            if (isAuthenticated) {
                req.session.user = {
                    userId: foundUser.dataValues.id,
                    username: foundUser.dataValues.username
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(400).send(`couldn't find ${username}`)
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(400)
        }
    },

    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(400).send('User not found')
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}