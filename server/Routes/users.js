const express = require('express')
const { createUser, getUserById, signupUser, getUsers, deleteUser, countNewUsersInCurrentMonth, countUsers, updateUser } = require('../Controllers/UserController')

const router = express.Router()

router.get('/', getUsers)

router.get('/count', countUsers)

router.get('/new-count', countNewUsersInCurrentMonth)

router.get('/:id', getUserById)

router.post('/', createUser)

router.post('/signup', signupUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router