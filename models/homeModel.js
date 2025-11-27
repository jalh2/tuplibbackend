const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
  headerTitle: { type: String, default: '' },
  logo: { type: String, default: '' }, // base64
  hero: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    images: { type: [String], default: [] }, // data URI base64
    overlayColor: { type: String, default: '' },
    backgroundImage: { type: String, default: '' }
  },
  contract: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  snippets: {
    about: { type: String, default: '' },
    news: { type: String, default: '' },
    manifesto: { type: String, default: '' },
    gallery: { type: String, default: '' }
  },
  contactInfo: {
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' }
  },
  footer: {
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' }
  }
}, { timestamps: true })

module.exports = mongoose.model('HomeContent', homeSchema)
