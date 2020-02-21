const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  transactionType: {
    type: Sequelize.ENUM('buy', 'sell'),
    allowNull: false
  }
})

module.exports = Transaction

/**
 * instanceMethods
 */

/**
 * classMethods
 */
