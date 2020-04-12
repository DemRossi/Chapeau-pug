/* Controller */
const Lobby = require('../../../models/Lobby')

let getAll = (req, res) => {
  Lobby.find({}, (err, docs) => {
    if (err) {
      res.json({
        status: 'error',
        message: err.message,
      })
    }
    //if no errors, go ahead and do your job!
    if (!err) {
      res.json({
        status: 'success',
        data: docs,
      })
    }
  })
}

let create = (req, res) => {
  let lobby = new Lobby()

  lobby.lobbyname = req.body.lobbyname
  lobby.owner = req.body.owner
  lobby.playersamount = req.body.playersamount

  lobby.save((err, doc) => {
    if (err) {
      res.json({
        status: 'error',
        message: err.message,
      })
    }
    if (!err) {
      res.json({
        status: 'success',
        data: {
          lobby: doc,
        },
      })
    }
  })
}

module.exports.getAll = getAll
module.exports.create = create
