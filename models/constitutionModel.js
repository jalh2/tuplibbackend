const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { _id: true })

const constitutionSchema = new mongoose.Schema({
  sections: { type: [sectionSchema], default: [] }
}, { timestamps: true })

module.exports = mongoose.model('ConstitutionContent', constitutionSchema)
