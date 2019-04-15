const express = require('express')
const passport = require('passport')

const Deck = require('../models/deck')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
const Card = require('../models/card.js')

router.get('/decks', requireToken, (req, res, next) => {
  Deck.find({ owner: req.user._id }).populate('cards')
    .then(decks => {
      return decks.map(deck => deck.toObject())
    })
    .then(decks => res.status(200).json({ decks }))
    .catch(next)
})

router.get('/decks/:id', requireToken, (req, res, next) => {
  Deck.findById(req.params.id).populate('cards')
    .then(handle404)
    .then(deck => res.status(200).json({ deck: deck.toObject() }))
    .catch(next)
})

router.post('/decks', requireToken, (req, res, next) => {
  req.body.deck.owner = req.user.id

  Deck.create(req.body.deck)
    .then(deck => {
      res.status(201).json({ deck: deck.toObject() })
    })
    .catch(next)
})

router.patch('/decks/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.deck.owner

  Deck.findById(req.params.id)
    .then(handle404)
    .then(deck => {
      requireOwnership(req, deck)

      return deck.update(req.body.deck)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/decks/:id', requireToken, (req, res, next) => {
  Deck.findById(req.params.id)
    .then(handle404)
    .then(deck => {
      requireOwnership(req, deck)
      const id = deck
      Card.deleteMany({deck: id}, (err, res) => { if (err) throw err })
      deck.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
