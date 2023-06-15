const {dataTypes, DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Colors: sequelize.define('colors', {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        background_one: DataTypes.STRING,
        dark_background_one: DataTypes.BOOLEAN,
        background_two: DataTypes.STRING,
        dark_background_two: DataTypes.BOOLEAN,
        bubble: DataTypes.STRING,
        dark_bubble: DataTypes.BOOLEAN,
        friend_bubble: DataTypes.STRING,
        dark_friend_bubble: DataTypes.BOOLEAN,
        button_color: DataTypes.STRING,
        dark_button_color: DataTypes.BOOLEAN
    })
}