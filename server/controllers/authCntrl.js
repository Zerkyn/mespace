require('dotenv').config()
const bcrypt = require('bcryptjs')
const {Users} = require('../models/users')


module.exports = {

    register: async (req, res) => {
       try {
        const {email, password} = req.body
        const foundUser = await Users.findOne({where: {email: email}})
        if (foundUser) {
            res.status(400).send('Email already exists!')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const newUser = await Users.create({email: email, password: hash})
            console.log(newUser)
            req.session.user = {
                userId: newUser.dataValues.id,
                email: newUser.dataValues.email
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
            const {email, password} = req.body
            const foundUser = await Users.findOne({where: {email}})
            const isAuthenticated = bcrypt.compareSync(password, foundUser.password)
            if (isAuthenticated) {
                req.session.user = {
                    userId: foundUser.dataValues.id,
                    email: foundUser.dataValues.email
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(400).send(`couldn't find ${email}`)
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