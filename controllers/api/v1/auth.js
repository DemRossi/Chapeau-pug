const User = require('../../../models/User')
const Profile = require('../../../models/profile')
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
      let user_id = result._id
      let username = result.username
      let profilepic = req.body.profilepic
      let gamesplayed = req.body.gamesplayed
      let gameswon = req.body.gameswon

      let profile = new Profile()

      profile.user_id = user_id
      profile.profilepicture = profilepic
      profile.gamesplayed = req.body.gamesplayed
      profile.gameswon = req.body.gameswon

      profile.save()

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
          user_id: user_id,
          username: username,
          profilepic: profilepic,
          gamesplayed: gamesplayed,
          gameswon: gameswon,
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

      // GET Profile by id
      let user_id = result.user._id
      let username = result.user.username

      console.log('here')
      Profile.find({ user_id: user_id }, (err, doc) => {
        // console.log(doc)
        if (err) {
          res.json({
            status: 'failed',
            message: err.message,
          })
        }
        //if no errors, go ahead and do your job!
        if (!err) {
          let profilepic = doc[0].profilepicture
          let gamesplayed = doc[0].gamesplayed
          let gameswon = doc[0].gameswon

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
              user_id: user_id,
              username: username,
              profilepic: profilepic,
              gamesplayed: gamesplayed,
              gameswon: gameswon,
            },
          })
        }
      })
    })
    .catch((error) => {
      res.json({
        status: 'error',
        message: error,
      })
    })
}

let check = (req, res) => {
  let username = req.body.username
  // console.log(username)
  User.findOne({ username: username }, (err, doc) => {
    if (err) {
      res.json({
        status: 'error',
        message: err.message,
      })
    }
    //if no errors, go ahead and do your job!
    if (!err) {
      // console.log(doc)
      res.json({
        status: 'success',
        data: doc,
      })
    }
  })
}

module.exports.signup = signup
module.exports.login = login
module.exports.check = check
