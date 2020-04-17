let createBtn = document
  .querySelector('.btn--create')
  .addEventListener('click', (e) => {
    let lobbyName = document.querySelector('#LobbyName').value
    let playersAmount = document.querySelector('#PeopleAmount').value

    // Start create fetch
    fetch('/api/v1/lobby', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        lobbyname: lobbyName,
        owner: localStorage.getItem('username'),
        playersamount: parseInt(playersAmount),
        playersinside: [
          // {
          //   user_id: '5e99d9a04d69d4309c3662a8',
          //   username: 'weske',
          //   gamesplayed: 0,
          //   gameswon: 0,
          // },
          // {
          //   user_id: '5e99d9a04d69d4309c3662a8',
          //   username: 'weske',
          //   gamesplayed: 0,
          //   gameswon: 0,
          // },
        ],
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.status == 'success') {
          // take lobby id
          console.log(json.data.lobby._id)
          let lobby_id = json.data.lobby._id
          //redirect to /lobby/:id
          window.location.href = `/lobby/${lobby_id}`
        }
      })
    e.preventDefault()
  })
