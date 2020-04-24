let loginBtn = document
  .querySelector('.btn--login')
  .addEventListener('click', (e) => {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value

    // //init primus websocket on this very own page
    // this.primus = Primus.connect("/", {
    //     reconnect: {
    //         max: Infinity // Number: The max delay before we try to reconnect.
    //       , min: 500 // Number: The minimum delay before we try reconnect.
    //       , retries: 10 // Number: How many times we should try to reconnect.
    //     }
    // });

    //do login fetch
    fetch('/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.status === 'success') {
          //send live user over websockets
          //   this.primus.write({
          //     action: "liveUser",
          //     username: json.data.username,
          //   })

          //save variables from json result and store them in localstorage + redirect
          let token = json.data.token
          let user_id = json.data.user_id
          let username = json.data.username
          let profilepic = json.data.profilepic
          let gamesplayed = json.data.gamesplayed
          let gameswon = json.data.gameswon

          localStorage.setItem('token', token)
          localStorage.setItem('user_id', user_id)
          localStorage.setItem('username', username)
          localStorage.setItem('profilepic', profilepic)
          localStorage.setItem('gamesplayed', gamesplayed)
          localStorage.setItem('gameswon', gameswon)

          // window.location.replace("http://www.w3schools.com")
          window.location.href = '/'
        } else {
          alert('login failed')
        }
      })
    e.preventDefault()
  })
