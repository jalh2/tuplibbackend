const MembershipHeader = require('../models/membershipHeaderModel')
const MemberSubmission = require('../models/memberModel')

// Header
const getHeader = async (req, res) => {
  try {
    const doc = await MembershipHeader.findOne()
    if (!doc) return res.json(new MembershipHeader())
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateHeader = async (req, res) => {
  try {
    const payload = req.body
    let doc = await MembershipHeader.findOne()
    if (doc) {
      if (payload.title !== undefined) doc.title = payload.title
      if (payload.description !== undefined) doc.description = payload.description
      if (payload.image !== undefined) doc.image = payload.image
      await doc.save()
    } else {
      doc = await MembershipHeader.create(payload)
    }
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

// Members
const createMember = async (req, res) => {
  try {
    const { name, phone, address, email, occupation } = req.body
    if (!name || !phone) return res.status(400).json({ message: 'Name and Phone are required' })
    const doc = await MemberSubmission.create({ name, phone, address, email, occupation })
    res.status(201).json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const listMembers = async (req, res) => {
  try {
    const items = await MemberSubmission.find({}).sort({ createdAt: -1 })
    res.json(items)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteMember = async (req, res) => {
  try {
    const doc = await MemberSubmission.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getHeader, updateHeader, createMember, listMembers, deleteMember }
