const express = require('express')
const router = express.Router()
const {
  createItem,
  listItems,
  getItem,
  bulkCreate,
  updateItem,
  deleteItem
} = require('../controllers/videoGalleryController')
const { requireAuth, requireRole } = require('../middleware/auth')

router.get('/', listItems)
router.get('/:id', getItem)
router.post('/', requireAuth, requireRole(['superAdmin', 'admin']), createItem)
router.post('/bulk', requireAuth, requireRole(['superAdmin', 'admin']), bulkCreate)
router.put('/:id', requireAuth, requireRole(['superAdmin', 'admin']), updateItem)
router.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deleteItem)

module.exports = router
