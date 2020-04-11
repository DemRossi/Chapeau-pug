const User = require("../../../models/User")

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
      res.json({
        status: "success",
      })
    })
    .catch((error) => {
      res.json({
        status: "error",
      })
    })
}

const login = async (req, res, next) => {
  const user = await User.authenticate()(req.body.username, req.body.password)
    .then((result) => {
      res.json({
        status: "success",
        data: {
          user: result,
        },
      })
    })
    .catch((error) => {
      res.json({
        status: "error",
        message: error,
      })
    })
}

module.exports.signup = signup
module.exports.login = login
