const express = require('express')
const router = express.Router()
const { getTeamPage, updateTeamPage, createMember, listMembers, getMember, updateMember, deleteMember } = require('../controllers/teamController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Team Page Header
router.get('/', getTeamPage)
router.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updateTeamPage)

// Team Members
router.get('/members', listMembers)
router.post('/members', requireAuth, requireRole(['superAdmin', 'admin']), createMember)
router.get('/members/:id', getMember)
router.put('/members/:id', requireAuth, requireRole(['superAdmin', 'admin']), updateMember)
router.delete('/members/:id', requireAuth, requireRole(['superAdmin', 'admin']), deleteMember)

module.exports = router
