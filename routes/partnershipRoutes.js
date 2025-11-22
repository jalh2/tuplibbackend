const express = require('express')
const page = express.Router()
const partners = express.Router()
const { getPage, updatePage, createPartner, listPartners, updatePartner, deletePartner } = require('../controllers/partnershipController')
const { requireAuth, requireRole } = require('../middleware/auth')

page.get('/', getPage)
page.put('/', requireAuth, requireRole(['superAdmin', 'admin']), updatePage)

partners.get('/', listPartners)
partners.post('/', requireAuth, requireRole(['superAdmin', 'admin']), createPartner)
partners.put('/:id', requireAuth, requireRole(['superAdmin', 'admin']), updatePartner)
partners.delete('/:id', requireAuth, requireRole(['superAdmin', 'admin']), deletePartner)

module.exports = { page, partners }
