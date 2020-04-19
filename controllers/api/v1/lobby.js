/* Controller */
const Lobby = require('../../../models/Lobby')
const isEmpty = require('is-empty')

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
      if (isEmpty(docs)) {
        res.json({
          status: 'failed',
          message: `No lobbies found! If you want to play you'll need to create a lobby.`,
        })
      } else {
        res.json({
          status: 'success',
          data: docs,
        })
      }
    }
  })
}

// GET callback for getting a SPECIFIC Lobby by it's ID
let getLobbyById = (req, res) => {
  let lobbyId = req.params.id
  // console.log(lobbyId)

  Lobby.findById({ _id: lobbyId }, (err, doc) => {
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
        data: doc,
      })
    }
  })
}

let create = (req, res) => {
  let lobby = new Lobby()

  lobby.lobbyname = req.body.lobbyname
  lobby.owner = req.body.owner
  lobby.playersamount = req.body.playersamount
  lobby.playersinside = req.body.playersinside

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

//PUT callback for joining a lobby
let join = (req, res, next) => {
  let lobbyid = req.params.id
  let userdata = {
    user_id: '5e99d9a04d69d4309c3662a8',
    username: 'weske',
    gamesplayed: 0,
    gameswon: 0,
  }
  //search the specific message by it's id and update it
  Lobby.findOneAndUpdate(
    { _id: lobbyid },
    { $push: { playersinside: userdata } },
    { new: true },
    (err, docs) => {
      //handle error if there is any (don't block the thread!)
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
    }
  )
}

//PUT callback for leaving a lobby
let leave = (req, res, next) => {
  let lobbyid = req.params.id
  let userid = req.params.uid

  let userdata = {
    user_id: '5e99d9a04d69d4309c3662a8',
    username: 'weske',
    gamesplayed: 0,
    gameswon: 0,
  }
  //search the specific message by it's id and update it
  Lobby.findOneAndUpdate(
    { _id: lobbyid },
    { $pull: { playersinside: userdata } },
    { new: true },
    (err, docs) => {
      //handle error if there is any (don't block the thread!)
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
    }
  )
}

module.exports.getAll = getAll
module.exports.create = create
module.exports.getLobbyById = getLobbyById
module.exports.join = join
module.exports.leave = leave
