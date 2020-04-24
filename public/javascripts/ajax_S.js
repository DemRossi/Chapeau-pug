let SignUpBtn = document
  .querySelector('.btn--signup')
  .addEventListener('click', (e) => {
    let name = document.querySelector('#name').value
    let username = document.querySelector('#username').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    // //init primus websocket on this very own page
    // this.primus = Primus.connect("/", {
    //     reconnect: {
    //         max: Infinity // Number: The max delay before we try to reconnect.
    //       , min: 500 // Number: The minimum delay before we try reconnect.
    //       , retries: 10 // Number: How many times we should try to reconnect.
    //     }
    // });
    // console.log("test")

    //do sign up fetch
    fetch('/users/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        profilepic: '../images/LogoOld.svg',
        gamesplayed: 0,
        gameswon: 0,
        password: password,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.status == 'success') {
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

          window.location.href = '/'
        } else {
          alert('login failed')
        }
      })
    e.preventDefault()
  })
