const express = require('express')
const router = express.Router()
const passport = require('../passport/passport')

/* GET login/register page. */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Chapeau - Log in' })
})
router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Chapeau - signup' })
})

/* GET home page. */
router.get(
  '/',
  // passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.render('index', { title: 'Chapeau - Home' })
  }
)
/* GET create page. */
router.get(
  '/create',
  // passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res, next) => {
    res.render('create', { title: 'Chapeau - Create Lobby' })
  }
)
/* GET lobby page. */
router.get(
  '/lobby/:lobbyId',
  // passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.render('lobby', { title: 'Chapeau - Inside lobby' })
  }
)
/* GET profile page. */
router.get(
  '/profile/:id',
  // passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.render('profile', { title: 'Chapeau - Profile' })
  }
)
/* GET game page. */
router.get(
  '/game',
  // passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.render('game', { title: 'Chapeau - Game' })
  }
)
module.exports = router
