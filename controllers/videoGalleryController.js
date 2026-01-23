const VideoItem = require('../models/videoItemModel')

const MAX_VIDEO_BASE64_LENGTH = 15 * 1024 * 1024

const createItem = async (req, res) => {
  try {
    const { videoData, videoUrl, title, description, previewImage } = req.body
    if (!videoData && !videoUrl) {
      return res.status(400).json({ message: 'Video data or video URL is required' })
    }
    if (videoData && videoData.length > MAX_VIDEO_BASE64_LENGTH) {
      return res.status(413).json({ message: 'Video too large. Please upload a smaller file (about 12MB max).' })
    }

    const doc = await VideoItem.create({ videoData, videoUrl, title, description, previewImage })
    res.status(201).json(doc)
  } catch (e) {
    console.error('Create Video Error:', e)
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const listItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const skip = (page - 1) * limit

    const total = await VideoItem.countDocuments({})
    const items = await VideoItem.find({})
      .select('-videoData')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (e) {
    console.error('Error fetching videos:', e)
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const getItem = async (req, res) => {
  try {
    const doc = await VideoItem.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (e) {
    console.error('Get Video Error:', e)
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const bulkCreate = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : []
    if (!items.length) return res.status(400).json({ message: 'No items' })

    const missingSource = items.find(item => !item.videoData && !item.videoUrl)
    if (missingSource) {
      return res.status(400).json({ message: 'Each item must include video data or a video URL.' })
    }

    const oversizedItem = items.find(item => item.videoData && item.videoData.length > MAX_VIDEO_BASE64_LENGTH)
    if (oversizedItem) {
      return res.status(413).json({ message: 'One or more videos are too large. Please upload smaller files (about 12MB max).' })
    }

    console.log(`Processing bulk video upload of ${items.length} items. Payload size approx: ${JSON.stringify(items).length} bytes`)

    const docs = await VideoItem.insertMany(items)
    res.status(201).json(docs)
  } catch (e) {
    console.error('Bulk Video Create Error:', e)
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const updateItem = async (req, res) => {
  try {
    const { title, description, previewImage, videoData, videoUrl } = req.body
    const doc = await VideoItem.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })

    if (videoData !== undefined && videoData && videoData.length > MAX_VIDEO_BASE64_LENGTH) {
      return res.status(413).json({ message: 'Video too large. Please upload a smaller file (about 12MB max).' })
    }

    if (title !== undefined) doc.title = title
    if (description !== undefined) doc.description = description
    if (previewImage !== undefined) doc.previewImage = previewImage
    if (videoData !== undefined) doc.videoData = videoData
    if (videoUrl !== undefined) doc.videoUrl = videoUrl

    await doc.save()
    res.json(doc)
  } catch (e) {
    console.error('Update Video Error:', e)
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const deleteItem = async (req, res) => {
  try {
    const doc = await VideoItem.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch (e) {
    console.error('Delete Video Error:', e)
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

module.exports = { createItem, listItems, getItem, bulkCreate, updateItem, deleteItem }
