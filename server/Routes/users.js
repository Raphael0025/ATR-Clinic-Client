const express = require('express')
const { createUser, getUserById, getUsers, deleteUser, updateUser } = require('../Controllers/UserController')

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router