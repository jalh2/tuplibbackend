const express = require('express')
const router = express.Router()
const { getManifesto, updateManifesto } = require('../controllers/manifestoController')
const { requireAuth, requireRole } = require('../middleware/auth')

router.get('/', getManifesto)
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateManifesto)

module.exports = router
