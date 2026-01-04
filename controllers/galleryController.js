const GalleryItem = require('../models/galleryItemModel')

const createItem = async (req, res) => {
  try {
    const { image, caption, category } = req.body
    if (!image) return res.status(400).json({ message: 'Image is required' })
    const doc = await GalleryItem.create({ image, caption, category })
    res.status(201).json(doc)
  } catch (e) {
    console.error('Create Item Error:', e);
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const listItems = async (req, res) => {
  try {
    // Pagination to prevent large payload 500 errors
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const items = await GalleryItem.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    // Optional: Return total count for frontend pagination
    // const total = await GalleryItem.countDocuments({});

    res.json(items);
  } catch (e) {
    console.error("Error fetching gallery items:", e);
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const bulkCreate = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : []
    if (!items.length) return res.status(400).json({ message: 'No items' })
    
    // Log batch size for debugging
    console.log(`Processing bulk upload of ${items.length} items. Payload size approx: ${JSON.stringify(items).length} bytes`);

    const docs = await GalleryItem.insertMany(items)
    res.status(201).json(docs)
  } catch (e) {
    console.error('Bulk Create Error:', e);
    res.status(500).json({ message: 'Server error: ' + e.message })
  }
}

const updateItem = async (req, res) => {
  try {
    const { image, caption, category } = req.body
    const doc = await GalleryItem.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    if (image !== undefined) doc.image = image
    if (caption !== undefined) doc.caption = caption
    if (category !== undefined) doc.category = category
    await doc.save()
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteItem = async (req, res) => {
  try {
    const doc = await GalleryItem.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { createItem, listItems, bulkCreate, updateItem, deleteItem }
