const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  pdf: { type: String, default: '' } // Base64 PDF
}, { _id: true })

const liberianConstitutionSchema = new mongoose.Schema({
  sections: { type: [sectionSchema], default: [] }
}, { timestamps: true })

module.exports = mongoose.model('LiberianConstitutionContent', liberianConstitutionSchema)
