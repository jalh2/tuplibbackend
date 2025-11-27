const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  showRoadConstruction: { type: Boolean, default: false }
}, { _id: true })

const manifestoSchema = new mongoose.Schema({
  sections: { type: [sectionSchema], default: [] }
}, { timestamps: true })

module.exports = mongoose.model('ManifestoContent', manifestoSchema)
