const express = require('express')
const router = express.Router()
const { login, logout, me, createUser, listUsers, updatePassword, setActive } = require('../controllers/userController')
const { requireAuth, requireRole } = require('../middleware/auth')

// Public
router.post('/login', login)
router.post('/logout', logout)

// Authenticated
router.get('/me', requireAuth, me)
router.patch('/password', requireAuth, updatePassword)

// Super Admin Only
router.post('/', requireRole(['superAdmin']), createUser)
router.get('/', requireRole(['superAdmin']), listUsers)
router.patch('/status', requireRole(['superAdmin']), setActive)

module.exports = router
