const express = require('express')
const router = express.Router()
const { getHeader, updateHeader, createMember, listMembers, deleteMember } = require('../controllers/membershipController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Header
router.get('/', getHeader)
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateHeader)

// Members
router.post('/submit', createMember) // Public
router.get('/list', requireAuth, requireRole(['superAdmin', 'admin']), listMembers)
router.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deleteMember)

module.exports = router
