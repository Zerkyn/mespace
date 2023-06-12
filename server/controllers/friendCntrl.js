const { Users } = require('../models/users')
const { Friends } = require('../models/friends')

module.exports = {
    searchUser: async (req, res) => {
        try {
            const { username } = req.params
            const findFriend = await Users.findOne({ where: { username } })
            if (findFriend) {
                const friend = {
                    id: findFriend.id,
                    username: findFriend.username,
                    profileImg: findFriend.profileImg
                }
                res.status(200).send(friend)
            } else {
                res.status(400).send(`couldn't find ${username}`)
            }
        }
        catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    },

    searchFriends: async (req, res) => {
        try {
            const { friend, user } = req.body
            const findFriendOne = await Friends.findOne({
                where: {
                    friend_one: user.userId,
                    friend_two: friend.id
                }
            })
            const findFriendTwo = await Friends.findOne({
                where: {
                    friend_one: friend.id,
                    friend_two: user.userId
                }
            })
            if (findFriendOne) {
                res.status(200).send(findFriendOne)
            } else if (findFriendTwo) {
                res.status(200).send(findFriendTwo)
            } else {
                res.status(200).send('Not Friends')
            }
        }
        catch{
            res.sendStatus(400)
        }
    },

    addFriend: async (req, res) =>{
        try{
            const {friendOne, friendTwo, status} = req.body
            await Friends.create({friend_one: friendOne, friend_two: friendTwo, status})
            res.status(201).send('Added Friend')
        }
        catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    },

    getFriends: async (req, res) => {
        try {
            const {id} = req.params
            const columnOne = await Friends.findAll({where: {friend_one: id}})
            const columnTwo = await Friends.findAll({where: {friend_two: id}})
            const friendList = [columnOne, columnTwo]
            // console.log(friendList)
            res.status(200).send(friendList)
        }
        catch{

        }
    },

    searchFriend: async (req, res) => {
        try {
            const { id } = req.params
            const findFriend = await Users.findOne({ where: { id } })
            if (findFriend) {
                const friend = {
                    id: findFriend.id,
                    username: findFriend.username,
                    profileImg: findFriend.profileImg
                }
                res.status(200).send(friend)
            } else {
                res.status(400).send(`couldn't find ${id}`)
            }
        }
        catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    }
}