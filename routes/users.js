const express = require('express')
const router = express.Router()
const authController = require('../controllers/api/v1/auth')
const passport = require('../passport/passport')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})
router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post(
  '/check',
  passport.authenticate('jwt', { session: false }),
  authController.check
)
router.get(
  '/profile/:id',
  // passport.authenticate('jwt', { session: false }),
  authController.getUserById
)
router.post('/profile/:id', authController.updateUserById)

module.exports = router
