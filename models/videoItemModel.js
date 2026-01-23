const mongoose = require('mongoose')

const videoItemSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  previewImage: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  videoData: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('VideoItem', videoItemSchema)
