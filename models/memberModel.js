const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, default: '' },
  email: { type: String, default: '' },
  occupation: { type: String, default: '' },
  idNumber: { type: String, default: '' },
  district: { type: String, default: '' },
  sex: { type: String, default: '' },
  age: { type: String, default: '' },
  photo: { type: String, default: '' },
  status: { type: String, default: 'pending' }
}, { timestamps: true })

module.exports = mongoose.model('MemberSubmission', memberSchema)
