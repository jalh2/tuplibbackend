const express = require('express')
const router = express.Router()
const { getHome, updateHome, deleteHeroImage } = require('../controllers/homeController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getHome)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateHome)
router.delete('/hero-image/:index', requireAuth, requireRole(['superAdmin', 'admin']), deleteHeroImage)

module.exports = router
