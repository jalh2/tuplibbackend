const express = require('express')
const router = express.Router()
const { getAbout, updateAbout, deleteAboutImage } = require('../controllers/aboutController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.get('/', getAbout)

// Admin/SuperAdmin
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateAbout)
router.delete('/image', requireAuth, requireRole(['superAdmin', 'admin']), deleteAboutImage)

module.exports = router
