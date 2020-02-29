const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const transactions = await Transaction.findAll({where: {userId: id}})
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})
