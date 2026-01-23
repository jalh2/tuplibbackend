const mongoose = require('mongoose')

const manifestoPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  images: { type: [String], default: [] },
  link: { type: String, default: '' },
  manifestoSectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model('ManifestoPost', manifestoPostSchema)
