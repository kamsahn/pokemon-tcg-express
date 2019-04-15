const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  imageUrl: {
    type: String
  },
  types: {
    type: String
  },
  number: {
    type: Number
  },
  setCode: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Card', cardSchema)
