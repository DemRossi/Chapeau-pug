let createBtn = document
  .querySelector('.btn--create')
  .addEventListener('click', (e) => {
    let lobby = new Lobby()
    lobby.create()

    e.preventDefault()
  })
