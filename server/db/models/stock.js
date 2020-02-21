const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  companyName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  latestPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Stock

/**
 * instanceMethods
 */

/**
 * classMethods
 */
