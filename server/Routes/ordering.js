const express = require('express')
const { getOrders, deleteOrder, updateOrder, newOrders, countPending, createOrder, countOrders } = require('../Controllers/OrderController')

const router = express.Router()

router.get('/', getOrders)

router.get('/count', countOrders)

router.get('/new-orders', newOrders)

router.get('/pending', countPending)

router.post('/', createOrder) 

router.delete('/:id', deleteOrder)

router.patch('/:id', updateOrder)

module.exports = router