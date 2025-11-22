const express = require('express')
const router = express.Router()
const { createItem, listItems, bulkCreate, updateItem, deleteItem } = require('../controllers/galleryController')
const { requireAuth, requireRole } = require('../middleware/auth')

router.get('/', listItems)
router.post('/', requireAuth, requireRole(['superAdmin', 'admin']), createItem)
router.post('/bulk', requireAuth, requireRole(['superAdmin', 'admin']), bulkCreate)
router.put('/:id', requireAuth, requireRole(['superAdmin', 'admin']), updateItem)
router.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deleteItem)

module.exports = router
