let url = window.location.href.replace(/\/$/, '')
let lobby_id = url.substr(url.lastIndexOf('/') + 1)

fetch(`http://localhost:3000/api/v1/lobby/${lobby_id}`, {
  method: 'get',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((result) => {
    return result.json()
  })
  .then((json) => {
    console.log(json)
    if (json['status'] == 'success') {
      let lobbyname = json.data.lobbyname
      document.querySelector('.lobbyname').innerHTML = lobbyname

      for (i = 0; i < json.data.playersinside.length; i++) {
        let playerWrapper = document.createElement('div')
        playerWrapper.classList.add('content__list', 'content__list--lobby')
        let playerTemplate = `
        <div class="content__list_profilepic_wrapper--big content__list_profilepic--big"></div>
        <h4 class="content__list_username">${json.data.playersinside[i].username}</h4>
        <div class="content__list_amountPlays">
            <h6><span class="content__list_amountPlays_amount">${json.data.playersinside[i].gamesplayed}</span> games played</h6>
        </div>
        <div class="content__list_amountWins">
            <h6><span class="content__list_amountWins_amount">${json.data.playersinside[i].gameswon}</span> games won</h6>
        </div>
      `
        playerWrapper.innerHTML = playerTemplate
        const playerList = document.querySelector(
          '.content__wrapper--middle-middle'
        )
        playerList.appendChild(playerWrapper)
      }
    } else if (json['status'] == 'failed') {
      console.log('here')
      const title = 'Oops'
      document.querySelector('.lobbyname').innerHTML = title
      document.querySelector('.btn--ready').remove()
      // Make error message for lobby not found
      let alert = document.createElement('div')
      alert.classList.add(
        'alert',
        'alert-danger',
        'alert-dismissible',
        'fade',
        'show'
      )
      let alertTemplate = `
          <strong>Hats not found!</strong> Something went wrong with retrieving data for this lobby. Go back and try again.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
      `
      alert.innerHTML = alertTemplate

      const alertbox = document.querySelector(
        '.content__wrapper--middle-middle'
      )
      alertbox.appendChild(alert)
    }
  })
  .catch((err) => {})
