const ManifestoContent = require('../models/manifestoModel')

const getManifesto = async (req, res) => {
  try {
    const doc = await ManifestoContent.findOne()
    if (!doc) return res.json(new ManifestoContent())
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

const updateManifesto = async (req, res) => {
  try {
    const { sections } = req.body
    let doc = await ManifestoContent.findOne()
    
    if (doc) {
      if (sections) doc.sections = sections
      await doc.save()
    } else {
      doc = await ManifestoContent.create({ sections })
    }
    
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getManifesto, updateManifesto }
