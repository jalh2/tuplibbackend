const mongoose = require('mongoose')

const membershipHeaderSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('MembershipPageHeader', membershipHeaderSchema)
