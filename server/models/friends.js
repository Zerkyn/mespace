const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = { 
    Friends: sequelize.define('friends', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        friendOne: DataTypes.INTEGER,
        friendTwo: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN
    })
}