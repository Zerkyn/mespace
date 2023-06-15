const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Messages: sequelize.define('messages', {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        message: DataTypes.STRING,
        author_id: DataTypes.INTEGER,
        room_id: DataTypes.INTEGER
    })
}