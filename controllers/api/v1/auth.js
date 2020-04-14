const User = require('../../../models/User')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

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
      let secret = process.env.JWT_SECRET
      let token = jwt.sign(
        {
          uid: result._id,
          username: result.username,
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
      if (!result.user) {
        return res.json({
          status: 'failed',
          message: 'Login failed',
        })
      }
      let secret = process.env.JWT_SECRET
      let token = jwt.sign(
        {
          uid: result.user._id,
          username: result.user.username,
        },
        secret
      )
      return res.json({
        status: 'success',
        data: {
          token: token,
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
