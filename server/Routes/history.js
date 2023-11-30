const express = require('express')
const { getOrders, createOrder } = require('../Controllers/HistoryController')

const router = express.Router()

router.get('/', getOrders)

router.post('/', createOrder) 

module.exports = router