const User = require('../../../models/User')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
  let name = req.body.name
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password

  const user = new User({
    name: name,
    username: username,
    email: email,
  })
  await user.setPassword(password)
  await user
    .save()
    .then((result) => {
      dotenv.config()
      let secret = process.env.JWT_SECRET
      let token = jwt.sign(
        {
          uid: result._id,
        },
        secret
      )

      res.json({
        status: 'success',
        data: {
          token: token,
        },
      })
    })
    .catch((error) => {
      res.json({
        status: 'error',
      })
    })
}

const login = async (req, res, next) => {
  const user = await User.authenticate()(req.body.username, req.body.password)
    .then((result) => {
      res.json({
        status: 'success',
        data: {
          user: result,
        },
      })
    })
    .catch((error) => {
      res.json({
        status: 'error',
        message: error,
      })
    })
}

module.exports.signup = signup
module.exports.login = login
