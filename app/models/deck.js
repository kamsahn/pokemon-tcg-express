const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wins: {
    type: Number
  },
  loses: {
    type: Number
  }
}, {
  timestamps: true,
  toObject: {virtuals: true}
})

deckSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'deck'
})

module.exports = mongoose.model('Deck', deckSchema)
