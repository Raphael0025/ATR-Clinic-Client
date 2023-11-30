const express = require('express')
const { getOrders, deleteOrder, updateOrder, createOrder, countOrders } = require('../Controllers/OrderController')

const router = express.Router()

router.get('/', getOrders)

router.get('/count', countOrders)

router.post('/', createOrder) 

router.delete('/:id', deleteOrder)

router.patch('/:id', updateOrder)

module.exports = router