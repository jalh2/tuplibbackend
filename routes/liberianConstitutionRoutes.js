const express = require('express')
const router = express.Router()
const { getLiberianConstitution, updateLiberianConstitution } = require('../controllers/liberianConstitutionController')
const { requireAuth, requireRole } = require('../middleware/auth')

router.get('/', getLiberianConstitution)
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateLiberianConstitution)

module.exports = router
