const express = require('express')
const router = express.Router()
const { getConstitution, updateConstitution } = require('../controllers/constitutionController')
const { requireAuth, requireRole } = require('../middleware/auth')

router.get('/', getConstitution)
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateConstitution)

module.exports = router
