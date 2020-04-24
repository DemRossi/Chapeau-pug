const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const Profile = new Schema({
  user_id: String,
  profilepicture: String,
  gamesplayed: Number,
  gameswon: Number,
})
Profile.plugin(passportLocalMongoose)

module.exports = mongoose.model('Profile', Profile)
