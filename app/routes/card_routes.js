const express = require('express')
const passport = require('passport')

const Card = require('../models/card')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// to require ownership, add requireToken as second argument in router functions
router.get('/cards', (req, res, next) => {
  Card.find()
    .then(cards => {
      return cards.map(card => card.toObject())
    })
    .then(cards => res.status(200).json({ cards }))
    .catch(next)
})

router.get('/cards/:id', (req, res, next) => {
  Card.findById(req.params.id)
    .then(handle404)
    .then(card => res.status(200).json({ card: card.toObject() }))
    .catch(next)
})

router.post('/cards', (req, res, next) => {
  // req.body.card.owner = req.user.id

  Card.create(req.body.card)
    .then(card => {
      res.status(201).json({ card: card.toObject() })
    })
    .catch(next)
})

router.patch('/cards/:id', removeBlanks, (req, res, next) => {
  delete req.body.card.owner

  Card.findById(req.params.id)
    .then(handle404)
    .then(card => {
      // requireOwnership(req, card)

      return card.update(req.body.card)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/cards/:id', (req, res, next) => {
  Card.findById(req.params.id)
    .then(handle404)
    .then(card => {
      // requireOwnership(req, card)
      card.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
