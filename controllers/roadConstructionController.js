const RoadConstructionHeader = require('../models/roadConstructionHeaderModel')
const RoadConstructionPost = require('../models/roadConstructionPostModel')

// Header
const getHeader = async (req, res) => {
  try {
    const doc = await RoadConstructionHeader.findOne()
    if (!doc) return res.json(new RoadConstructionHeader())
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateHeader = async (req, res) => {
  try {
    const payload = req.body
    let doc = await RoadConstructionHeader.findOne()
    if (doc) {
      if (payload.title !== undefined) doc.title = payload.title
      if (payload.description !== undefined) doc.description = payload.description
      if (payload.image !== undefined) doc.image = payload.image
      await doc.save()
    } else {
      doc = await RoadConstructionHeader.create(payload)
    }
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

// Posts
const createPost = async (req, res) => {
  try {
    const { title, description, images, link } = req.body
    if (!title) return res.status(400).json({ message: 'Title is required' })
    const doc = await RoadConstructionPost.create({ title, description, images: Array.isArray(images) ? images : [], link: link || '' })
    res.status(201).json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const listPosts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100)
    const skip = (page - 1) * limit
    const [items, total] = await Promise.all([
      RoadConstructionPost.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
      RoadConstructionPost.countDocuments()
    ])
    res.json({ items, total, page, limit })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const getPost = async (req, res) => {
  try {
    const doc = await RoadConstructionPost.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const updatePost = async (req, res) => {
  try {
    const { title, description, images, link } = req.body
    const doc = await RoadConstructionPost.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    if (title !== undefined) doc.title = title
    if (description !== undefined) doc.description = description
    if (link !== undefined) doc.link = link
    if (images !== undefined && Array.isArray(images)) doc.images = images
    await doc.save()
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const deletePost = async (req, res) => {
  try {
    const doc = await RoadConstructionPost.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteImage = async (req, res) => {
  try {
    const index = Number(req.params.index)
    const doc = await RoadConstructionPost.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    if (!Array.isArray(doc.images) || index < 0 || index >= doc.images.length) return res.status(400).json({ message: 'Index out of range' })
    doc.images.splice(index, 1)
    await doc.save()
    res.json({ success: true })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getHeader, updateHeader, createPost, listPosts, getPost, updatePost, deletePost, deleteImage }
