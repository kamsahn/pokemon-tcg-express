const express = require('express')
const passport = require('passport')

const Card = require('../models/card')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// router.get('/cards', requireToken, (req, res, next) => {
//   Card.find()
//     .then(cards => {
//       return cards.map(card => card.toObject())
//     })
//     .then(cards => res.status(200).json({ cards }))
//     .catch(next)
// })
//
// router.get('/cards/:id', requireToken, (req, res, next) => {
//   Card.findById(req.params.id)
//     .then(handle404)
//     .then(card => res.status(200).json({ card: card.toObject() }))
//     .catch(next)
// })

router.post('/cards', requireToken, (req, res, next) => {
  req.body.card.owner = req.user.id
  const newCard = req.body.card
  Card.find({ deck: req.body.card.deck })
    .then((cards) => {
      if (cards.length < 60) {
        if (newCard.supertype === 'Energy') {
          return Card.create(newCard)
        }
        if (cards.filter(card => card.name === newCard.name).length < 4) {
          return Card.create(newCard)
        }
      }
    })
    .then(card => {
      res.status(201).json({ card: card.toObject() })
    })
    .catch(next)

  // Card.create(req.body.card)
  //   .then(card => {
  //     res.status(201).json({ card: card.toObject() })
  //   })
  //   .catch(next)
})

// router.patch('/cards/:id', requireToken, removeBlanks, (req, res, next) => {
//   delete req.body.card.owner
//
//   Card.findById(req.params.id)
//     .then(handle404)
//     .then(card => {
//       requireOwnership(req, card)
//
//       return card.update(req.body.card)
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

router.delete('/cards/:id', requireToken, (req, res, next) => {
  Card.findById(req.params.id)
    .then(handle404)
    .then(card => {
      requireOwnership(req, card)
      card.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
