const socketio = require('socket.io')

let go = (server) => {
  const io = socketio(server)

  // Runs when client connects
  io.on('connection', (socket) => {
    // console.log('New player logged in!')

    // Welcome current user
    socket.emit('message', 'Welcome to Chapeau!')

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A player has logged in!')

    // Send request to add new lobby
    socket.on('addLobby', (lobbyData) => {
      socket.broadcast.emit('updateHome', lobbyData)
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
      io.emit('message', 'A player has logged out!')
    })
  })
}

module.exports.go = go
