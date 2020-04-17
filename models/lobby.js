/* Model */
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let LobbySchema = new Schema({
  lobbyname: String,
  owner: {
    type: String,
    required: true,
  },
  playersamount: Number,
  playersinside: Object,
  // playersinside: [
  //   {
  //     user_id: Number,
  //     username: String,
  //     gamesplayed: Number,
  //     gameswon: Number,
  //   },
  // ],
})
const Lobby = mongoose.model('Lobbies', LobbySchema)

module.exports = Lobby
