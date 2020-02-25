const router = require('express').Router()
const {Stock} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const stocks = await Stock.findAll({where: {userId: id}})
    res.json(stocks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const stock = await Stock.create(req.body)
    res.json(stock)
  } catch (err) {
    next(err)
  }
})
