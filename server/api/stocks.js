const router = require('express').Router()
const {Stock, User, Transaction} = require('../db/models')
const axios = require('axios')
module.exports = router

let apiKey
if (process.env.NODE_ENV !== 'production') {
  apiKey = require('../../secrets').ApiKey
} else {
  apiKey = process.env.apiKey
}

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const stocks = await Stock.findAll({where: {userId: id}})
    const user = await User.findOne({
      where: {id}
    })
    // console.log(user.dataValues.portfolio)
    res.json({stocks, myCash: user.dataValues.portfolio})
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  let userData
  let apiData

  const {userId, quantity, symbol} = req.body
  try {
    apiData = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`
    )
  } catch (err) {
    console.error(err)
    console.error(err.stack)
    next(err.response)
  }

  const {latestPrice, companyName} = apiData.data
  const id = Number(userId)

  try {
    userData = await User.findOne({
      where: {id: id}
    })

    const myCash = userData.dataValues.portfolio - latestPrice * quantity
    if (myCash < 0) {
      const error = new Error('Internal server error')
      error.response = {status: 500, statusText: 'Not Enough Cash'}
      next(error.response)
      return
    }

    const oldStock = await Stock.findOrCreate({
      where: {userId: id, symbol},
      defaults: {quantity: 0, companyName, latestPrice}
    })
    const oldQty = oldStock[0].dataValues.quantity
    await Stock.update(
      {quantity: quantity + oldQty, latestPrice},
      {where: {userId: id, symbol}}
    )

    User.update({portfolio: myCash}, {where: {id}})

    Transaction.create({
      symbol,
      price: latestPrice,
      quantity,
      userId: id
    })

    res.json({
      ...oldStock[0].dataValues,
      quantity: quantity + oldQty,
      myCash
    })
  } catch (err) {
    next(err)
  }
})
