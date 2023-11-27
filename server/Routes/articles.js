const express = require('express')
const { getArticles, deleteArticle, updateArticle, getLatest, createArticle } = require('../Controllers/ArticleController')

const router = express.Router()

router.get('/', getArticles)

router.get('/latest', getLatest)

router.post('/', createArticle)

router.delete('/:id', deleteArticle)

router.patch('/:id', updateArticle)

module.exports = router