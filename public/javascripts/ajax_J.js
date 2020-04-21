window.onload = (event) => {
  // let that = this
  let lobbiesContainer = document
    .querySelector('.content__wrapper--bottom-middle')
    .addEventListener('click', (e) => {
      let playersinside = parseInt(
        e.target.parentElement.previousElementSibling.previousElementSibling
          .firstElementChild.firstElementChild.innerHTML
      )

      let playersamount = parseInt(
        e.target.parentElement.previousElementSibling.previousElementSibling
          .firstElementChild.lastElementChild.innerHTML
      )

      console.log(playersinside + playersamount)
      console.log(playersamount)

      if (playersinside >= playersamount) {
        // console.log('cant join!!!!')
        // Full Lobby error
      } else {
        console.log('can join!!!!')
        // proceed to join
        // if (e.target.matches('.btn--join')) {
        //   // Get lobby id
        //   let lobby_id = e.target.parentElement.parentElement.dataset.id

        //   // Get user data
        //   let user_id = localStorage.getItem('user_id')
        //   let username = localStorage.getItem('username')
        //   let gamesplayed = localStorage.getItem('gamesplayed')
        //   let gameswon = localStorage.getItem('gameswon')

        //   // console.log(lobby_id)
        //   // console.log(user_id)
        //   // console.log(username)
        //   // console.log(gamesplayed)
        //   // console.log(gameswon)

        //   // Start join fetch

        //   fetch(`/api/v1/lobby/${lobby_id}`, {
        //     method: 'put',
        //     headers: {
        //       Accept: 'application/json, text/plain, */*',
        //       'Content-Type': 'application/json',
        //       Authorization: 'Bearer ' + localStorage.getItem('token'),
        //     },
        //     body: JSON.stringify({
        //       // Put user data in json
        //       uid: user_id,
        //       username: username,
        //       gamesplayed: gamesplayed,
        //       gameswon: gameswon,
        //     }),
        //   })
        //     .then((response) => {
        //       return response.json()
        //     })
        //     .then((json) => {
        //       if (json.status == 'success') {
        //         //redirect to /lobby/:id
        //         window.location.href = `/lobby/${lobby_id}`
        //       }
        //     })
        // }
      }
      e.preventDefault()
    })
  event.preventDefault()
}
