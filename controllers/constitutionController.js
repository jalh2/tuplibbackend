const ConstitutionContent = require('../models/constitutionModel')

const getConstitution = async (req, res) => {
  try {
    const doc = await ConstitutionContent.findOne()
    if (!doc) return res.json(new ConstitutionContent())
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateConstitution = async (req, res) => {
  try {
    const { sections } = req.body
    let doc = await ConstitutionContent.findOne()
    
    if (doc) {
      if (sections) doc.sections = sections
      await doc.save()
    } else {
      doc = await ConstitutionContent.create({ sections })
    }
    
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getConstitution, updateConstitution }
