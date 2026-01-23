const express = require('express')
const router = express.Router()
const {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost,
  deleteImage
} = require('../controllers/manifestoPostController')
const { requireAuth, requireRole } = require('../middleware/auth')

router.get('/', listPosts)
router.get('/:id', getPost)

router.post('/', requireAuth, requireRole(['superAdmin', 'admin']), createPost)
router.put('/:id', requireAuth, requireRole(['superAdmin', 'admin']), updatePost)
router.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deletePost)
router.delete('/:id/images/:index', requireAuth, requireRole(['superAdmin', 'admin']), deleteImage)

module.exports = router
