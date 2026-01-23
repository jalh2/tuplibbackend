const mongoose = require('mongoose')
const ManifestoPost = require('../models/manifestoPostModel')
const ManifestoContent = require('../models/manifestoModel')

const sectionExists = async (sectionId) => {
  if (!mongoose.Types.ObjectId.isValid(sectionId)) return false
  const doc = await ManifestoContent.findOne({ 'sections._id': sectionId }).select('_id')
  return Boolean(doc)
}

const createPost = async (req, res) => {
  try {
    const { title, description, images, link, manifestoSectionId } = req.body
    if (!title) return res.status(400).json({ message: 'Title is required' })
    if (!manifestoSectionId) return res.status(400).json({ message: 'Manifesto section is required' })

    const sectionOk = await sectionExists(manifestoSectionId)
    if (!sectionOk) return res.status(400).json({ message: 'Manifesto section not found' })

    const doc = await ManifestoPost.create({
      title,
      description,
      images: Array.isArray(images) ? images : [],
      link: link || '',
      manifestoSectionId
    })
    res.status(201).json(doc)
  } catch (e) {
    console.error('Create Manifesto Post Error:', e)
    res.status(500).json({ message: 'Server error' })
  }
}

const listPosts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100)
    const skip = (page - 1) * limit
    const sectionId = req.query.sectionId

    if (sectionId && !mongoose.Types.ObjectId.isValid(sectionId)) {
      return res.status(400).json({ message: 'Invalid section id' })
    }

    const filter = sectionId ? { manifestoSectionId: sectionId } : {}
    const [items, total] = await Promise.all([
      ManifestoPost.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ManifestoPost.countDocuments(filter)
    ])

    res.json({ items, total, page, limit })
  } catch (e) {
    console.error('List Manifesto Posts Error:', e)
    res.status(500).json({ message: 'Server error' })
  }
}

const getPost = async (req, res) => {
  try {
    const doc = await ManifestoPost.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (e) {
    console.error('Get Manifesto Post Error:', e)
    res.status(500).json({ message: 'Server error' })
  }
}

const updatePost = async (req, res) => {
  try {
    const { title, description, images, link, manifestoSectionId } = req.body
    const doc = await ManifestoPost.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })

    if (manifestoSectionId !== undefined) {
      if (!manifestoSectionId) return res.status(400).json({ message: 'Manifesto section is required' })
      const sectionOk = await sectionExists(manifestoSectionId)
      if (!sectionOk) return res.status(400).json({ message: 'Manifesto section not found' })
      doc.manifestoSectionId = manifestoSectionId
    }

    if (title !== undefined) doc.title = title
    if (description !== undefined) doc.description = description
    if (link !== undefined) doc.link = link
    if (images !== undefined && Array.isArray(images)) doc.images = images

    await doc.save()
    res.json(doc)
  } catch (e) {
    console.error('Update Manifesto Post Error:', e)
    res.status(500).json({ message: 'Server error' })
  }
}

const deletePost = async (req, res) => {
  try {
    const doc = await ManifestoPost.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch (e) {
    console.error('Delete Manifesto Post Error:', e)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteImage = async (req, res) => {
  try {
    const index = Number(req.params.index)
    const doc = await ManifestoPost.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    if (!Array.isArray(doc.images) || index < 0 || index >= doc.images.length) {
      return res.status(400).json({ message: 'Index out of range' })
    }
    doc.images.splice(index, 1)
    await doc.save()
    res.json({ success: true })
  } catch (e) {
    console.error('Delete Manifesto Post Image Error:', e)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { createPost, listPosts, getPost, updatePost, deletePost, deleteImage }
