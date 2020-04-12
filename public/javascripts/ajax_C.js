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
        owner: 'Weske',
        playersamount: parseInt(playersAmount),
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.status == 'success') {
          alert('lobby created')
        }
      })
    e.preventDefault()
  })
