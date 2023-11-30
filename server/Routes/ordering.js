const express = require('express')
const { getOrders, deleteOrder, updateOrder, totalAmountRoute, newOrders, countCompleted, countInProgress, countPending, createOrder, countOrders } = require('../Controllers/OrderController')

const router = express.Router()

router.get('/', getOrders)

router.get('/count', countOrders)

router.get('/new-orders', newOrders)

router.get('/pending', countPending)

router.get('/complete', countCompleted)

router.get('/in-progress', countInProgress)
// Use totalAmountRoute instead of totalAmount
router.get('/get-total', totalAmountRoute);

router.get('/total-sales', totalSales)

router.get('/completed-orders', getCompletedOrders);

router.post('/', createOrder) 

router.delete('/:id', deleteOrder)

router.patch('/:id', updateOrder)

module.exports = router