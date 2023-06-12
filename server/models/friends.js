const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/database')

module.exports = {
    Friends: sequelize.define('friends', {
        // timestamps: false,
        // createdAt: false,
        // updatedAt: false,
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        friend_one: DataTypes.INTEGER,
        friend_two: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
    })
}