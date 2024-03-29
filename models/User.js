const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
  name: String,
  username: String,
  email: String,
  profile: {
    profilepicture: String,
    gamesplayed: Number,
    gameswon: Number,
  },

  // gamesplayed: Number,
  // gameswon: Number,
})
User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
