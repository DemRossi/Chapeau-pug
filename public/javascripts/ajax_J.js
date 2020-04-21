window.onload = (event) => {
  let lobbiesContainer = document
    .querySelector('.content__wrapper--middle-middle')
    .addEventListener('click', (e) => {
      let playersinside = parseInt(
        e.target.parentElement.previousElementSibling.previousElementSibling
          .firstElementChild.firstElementChild.innerHTML
      )
      let playersamount = parseInt(
        e.target.parentElement.previousElementSibling.previousElementSibling
          .firstElementChild.lastElementChild.innerHTML
      )

      if (playersinside >= playersamount) {
        // console.log('cant join!!!!')
        // Make error message for full lobby
        let alert = document.createElement('div')
        alert.classList.add(
          'alert',
          'alert-warning',
          'alert-dismissible',
          'fade',
          'show'
        )
        let alertTemplate = `
            <strong>Hads up!</strong> This lobby has no empty places left.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        `
        alert.innerHTML = alertTemplate

        const alertbox = document.querySelector(
          '.content__wrapper--bottom-middle'
        )
        alertbox.appendChild(alert)
      } else {
        // console.log('can join!!!!')
        // proceed to join
        if (e.target.matches('.btn--join')) {
          // Get lobby id
          let lobby_id = e.target.parentElement.parentElement.dataset.id

          // Get user data
          let user_id = localStorage.getItem('user_id')
          let username = localStorage.getItem('username')
          let gamesplayed = localStorage.getItem('gamesplayed')
          let gameswon = localStorage.getItem('gameswon')

          // Start join fetch
          fetch(`/api/v1/lobby/${lobby_id}`, {
            method: 'put',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
              // Put user data in json
              uid: user_id,
              username: username,
              gamesplayed: gamesplayed,
              gameswon: gameswon,
            }),
          })
            .then((response) => {
              return response.json()
            })
            .then((json) => {
              if (json.status == 'success') {
                //redirect to /lobby/:id
                window.location.href = `/lobby/${lobby_id}`
              }
            })
        }
      }
      e.preventDefault()
    })
  event.preventDefault()
}
