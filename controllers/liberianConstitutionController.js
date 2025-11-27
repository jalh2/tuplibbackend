const LiberianConstitutionContent = require('../models/liberianConstitutionModel')

const getLiberianConstitution = async (req, res) => {
  try {
    const doc = await LiberianConstitutionContent.findOne()
    if (!doc) return res.json(new LiberianConstitutionContent())
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateLiberianConstitution = async (req, res) => {
  try {
    const { sections } = req.body
    let doc = await LiberianConstitutionContent.findOne()
    
    if (doc) {
      if (sections) doc.sections = sections
      await doc.save()
    } else {
      doc = await LiberianConstitutionContent.create({ sections })
    }
    
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getLiberianConstitution, updateLiberianConstitution }
