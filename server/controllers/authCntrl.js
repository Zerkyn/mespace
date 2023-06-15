// require('dotenv').config()
const bcrypt = require('bcryptjs')
const {Users} = require('../models/users')
const {Colors} = require('../models/colors')


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
            const colorScheme = await Colors.create({
                background_one: '#ffffff',
                background_two: '#bfbfbf',
                bubble: '#404040',
                friend_bubble: '#7f7f7f',
                button_color: '#000000',
                dark_background_one: false,
                dark_background_two: false,
                dark_bubble: true,
                dark_friend_bubble: true,
                dark_button_color: true,
                userId: newUser.dataValues.id
            })
            req.session.user = {
                userId: newUser.dataValues.id,
                username: newUser.dataValues.username,
                profileImg: newUser.dataValues.profileImg,
                colorScheme
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
            const colorScheme = await Colors.findOne({where: {userId: foundUser.dataValues.id}})
            if (isAuthenticated) {
                req.session.user = {
                    userId: foundUser.dataValues.id,
                    username: foundUser.dataValues.username,
                    profileImg: foundUser.dataValues.profileImg,
                    colorScheme
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