/* Model */
let mongoose = require("mongoose")
let Schema = mongoose.Schema

let LobbySchema = new Schema({
  lobbyname: String,
  owner: {
    type: String,
    required: true,
  },
  playersamount: Number,
})
const Lobby = mongoose.model("Lobbies", LobbySchema)

module.exports = Lobby
