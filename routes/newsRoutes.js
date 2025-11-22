const express = require('express')
const header = express.Router()
const posts = express.Router()
const { getHeader, updateHeader } = require('../controllers/newsHeaderController')
const { createPost, listPosts, getPost, updatePost, deletePost, deleteImage } = require('../controllers/newsPostController')
const { requireAuth, requireRole } = require('../middleware/auth')

// News Header Routes
header.get('/', getHeader)
header.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateHeader)

// News Posts Routes
posts.get('/', listPosts)
posts.get('/:id', getPost)

// Protected Post Routes
posts.post('/', requireAuth, requireRole(['superAdmin', 'admin']), createPost)
posts.put('/:id', requireAuth, requireRole(['superAdmin', 'admin']), updatePost)
posts.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deletePost)
posts.delete('/:id/images/:index', requireAuth, requireRole(['superAdmin', 'admin']), deleteImage)

module.exports = { header, posts }
