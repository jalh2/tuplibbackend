const mongoose = require('mongoose')

const roadConstructionPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  images: { type: [String], default: [] },
  link: { type: String, default: '' }, // Added link as per requirement
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model('RoadConstructionPost', roadConstructionPostSchema)
