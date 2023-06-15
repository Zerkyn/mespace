const {Colors} = require('../models/colors')
const {Users} = require('../models/users')

module.exports = {
    newColorScheme: async (req, res) => {
        try{
            const { newImage, newColorScheme } = req.body
            const { id } = req.params
            await Users.update({profileImg: newImage}, {where: {id: id}})
            const updatedColors = await Colors.update({
                background_one: newColorScheme.backgroundOne,
                background_two: newColorScheme.backgroundTwo,
                bubble: newColorScheme.bubble,
                friend_bubble: newColorScheme.friendBubble,
                button_color: newColorScheme.buttonColor,
                dark_background_one: newColorScheme.darkBackgroundOne,
                dark_background_two: newColorScheme.darkBackgroundTwo,
                dark_bubble: newColorScheme.darkBubble,
                dark_friend_bubble: newColorScheme.darkFriendBubble,
                dark_button_color: newColorScheme.darkButtonColor
            }, { where: {userId: id}})
            const updatedUser = await Users.findOne({where: { id }})
            const sendUser = {
                userId: updatedUser.dataValues.id,
                username: updatedUser.dataValues.username,
                profileImg: updatedUser.dataValues.profileImg,
                updatedColors
            }
            res.status(200).send(sendUser)
        }
        catch (err){
            console.log(err)
            res.sendStatus(400)
        }
    }
}