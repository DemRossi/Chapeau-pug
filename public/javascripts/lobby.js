// CLIENT
class Lobby {
  constructor() {
    let url = 'http://localhost:3000'

    this.primus = Primus.connect(url, {
      reconnect: {
        max: Infinity, // Number: The max delay before we try to reconnect.
        min: 500, // Number: The minimum delay before we try reconnect.
        retries: 10, // Number: How many times we should try to reconnect.
      },
    })
    this.primus.on('data', (json) => {
      if (json.action === 'addLobby') {
        appendLobby(json.data)
      }
      // else if (json.action === 'addPlayer') {
      //   console.log(json)
      //   // console.log('new player added!')
      //   let lobbyid = json.data.data._id
      //   // console.log(lobbyid)
      //   let joinedLobby = document.querySelector(`[data-id='${lobbyid}']`)
      //   console.log(
      //     joinedLobby.firstElementChild.nextElementSibling.nextElementSibling
      //       .lastElementChild
      //   )
      // }
    })
  }

  // GET all lobbies
  getAllLobbies() {
    fetch('http://localhost:3000/api/v1/lobby', {
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
        // console.log(json)
        if (json['status'] == 'success') {
          // console.log(json)
          for (let i = 0; i < json.data.length; i++) {
            // console.log(json.data[i])
            let lobbyWrapper = document.createElement('div')
            lobbyWrapper.classList.add('content__list', 'content__list--home')
            lobbyWrapper.dataset.id = json.data[i]._id
            let playersinside = json.data[i].playersinside.length
            // console.log(json.data[i])
            let lobbyInfoTemplate = `
              <h2 class="content__list_name">${json.data[i].lobbyname}</h2>

              <div class="content__list_amountPlayers">
                <h5>
                  <span class="content__list_amountPlayers_amount">${playersinside}</span>
                  /
                  <span class="content__list_amountPlayers_many">${json.data[i].playersamount}</span>
                  players inside
                </h5>
              </div>
              <div class="content__list_playersInside">
                <h6 class="content__list_playersInside_peopleTitle">People in lobby:</h6>
                <div class="content__list_profilepic_wrapper--small picture__wrapper-${i}">

                </div>
              </div>
              <div class="content__btn">
                <a href="" data-id="${json.data[i]._id}" class="btn btn-success btn--join">Join</a>
              </div>
            `
            lobbyWrapper.innerHTML = lobbyInfoTemplate

            const lobbyList = document.querySelector(
              '.content__wrapper--middle-middle'
            )
            lobbyList.appendChild(lobbyWrapper)
            // console.log(json.data[i].playersinside.length)

            if (json.data[i].playersinside.length > 0) {
              // console.log(json.data[i].playersinside.length)
              for (let p = 0; p < json.data[i].playersinside.length; p++) {
                // console.log(json.data[i].playersinside[p].profilepic)
                let img = document.createElement('img')
                img.classList.add('content__list_profilepic--small')
                img.src = json.data[i].playersinside[p].profilepic

                let profilepicWrapper = document.querySelector(
                  `.picture__wrapper-${i}`
                )
                profilepicWrapper.appendChild(img)
              }
            } else {
              let message = document.createElement('p')
              message.innerHTML = 'No players inside this lobby.'

              let profilepicWrapper = document.querySelector(
                `.picture__wrapper-${i}`
              )
              profilepicWrapper.appendChild(message)
            }
          }
        } else if (json['status'] == 'failed') {
          // let lobbyWrapper = document.createElement('div')
          // lobbyWrapper.classList.add('content__list', 'content__list--home')
          let lobbyTemplate = `
        <h2 class="content__list_error">${json.message}</h2>
        `
          const lobbyList = document.querySelector(
            '.content__wrapper--middle-middle'
          )
          lobbyList.innerHTML = lobbyTemplate
          // lobbyList.appendChild(lobbyWrapper)
        }
      })
      .catch((err) => {
        console.log('error!!!')
        console.log(err)
        // something wrong happend page
      })
  }

  // GET lobby by id
  getLobbyById() {
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
        // console.log(json)
        if (json['status'] == 'success') {
          let lobbyname = json.data.lobbyname
          document.querySelector('.lobbyname').innerHTML = lobbyname

          for (let i = 0; i < json.data.playersinside.length; i++) {
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
          <div class="content__list_ready_wrapper">
              <div class="content__list_unready"></div>
          </div>
        `
            playerWrapper.innerHTML = playerTemplate
            const playerList = document.querySelector(
              '.content__wrapper--middle-middle-lobby'
            )
            playerList.appendChild(playerWrapper)
          }
        } else if (json['status'] == 'failed') {
          // console.log('here')
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
      .catch((err) => {
        console.log(err.message)
      })
  }

  // CREATE new lobby
  create() {
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
          // Put owner in
          {
            user_id: localStorage.getItem('user_id'), // '5e99d9a04d69d4309c3662a8',
            username: localStorage.getItem('username'), // 'weske',
            profilepic: localStorage.getItem('profilepic'),
            gamesplayed: localStorage.getItem('gamesplayed'), // 0,
            gameswon: localStorage.getItem('gameswon'), // 0,
          },
        ],
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.status == 'success') {
          // Let server know a Lobby is created
          this.primus.write({
            action: 'addLobby',
            data: json,
          })

          // take lobby id
          let lobby_id = json.data.lobby._id
          //redirect to /lobby/:id
          window.location.href = `/lobby/${lobby_id}`
        }
      })
  }

  // Join a lobby
  join() {
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
            <strong>Hats up!</strong> This lobby has no empty places left.
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
            let profilepic = localStorage.getItem('profilepic')
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
                profilepic: profilepic,
                gamesplayed: gamesplayed,
                gameswon: gameswon,
              }),
            })
              .then((response) => {
                return response.json()
              })
              .then((json) => {
                if (json.status == 'success') {
                  // Let server know to add 1 to playersinside number on home
                  // this.primus.write({
                  //   action: 'addPlayer',
                  //   data: json,
                  // })
                  //redirect to /lobby/:id
                  window.location.href = `/lobby/${lobby_id}`
                  // console.log(json)
                }
              })
          }
        }
        e.preventDefault()
      })
  }
  leave() {
    let lobbiesContainer = document
      .querySelector('.btn--leave')
      .addEventListener('click', (e) => {
        let user_id = localStorage.getItem('user_id')
        /* remove optional end / of url*/
        let url = window.location.href.replace(/\/$/, '')
        let lobby_id = url.substr(url.lastIndexOf('/') + 1)

        // Start leave fetch
        fetch(`/api/v1/lobby/${lobby_id}/${user_id}`, {
          method: 'put',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            if (json.status == 'success') {
              // Let server know reduce 1 to playersinside number on home
              // Redirect to /
              window.location.href = `/`
            }
          })
        e.preventDefault()
      })
  }
}

// append lobby
let appendLobby = (json) => {
  console.log(json)
  try {
    let lobbyWrapper = document.createElement('div')
    lobbyWrapper.classList.add('content__list', 'content__list--home')
    lobbyWrapper.dataset.id = json.data.lobby._id
    console.log(json.data.lobby._id)
    let playersinside = json.data.lobby.playersinside.length
    console.log(playersinside)
    let lobbyTemplate = `
      <h2 class="content__list_name">${json.data.lobby.lobbyname}</h2>
      <div class="content__list_amountPlayers">
          <h5>
            <span class="content__list_amountPlayers_amount">${playersinside}</span>
            /
            <span class="content__list_amountPlayers_many">${json.data.lobby.playersamount}</span>
            players inside
          </h5>
        </div>
      <div class="content__list_playersInside">
          <h6 class="content__list_playersInside_peopleTitle">People in lobby:</h6>
          <div class="content__list_profilepic_wrapper--small">
            <img src="${json.data.lobby.playersinside[0].profilepic}" class="content__list_profilepic--small" >
            
          </div>
        </div>
      <div class="content__btn">
      <a href="" data-id="${json.data.lobby._id}" class="btn btn-success btn--join">Join</a>
      </div>
    `
    lobbyWrapper.innerHTML = lobbyTemplate
    const lobbyList = document.querySelector('.content__wrapper--middle-middle')
    lobbyList.appendChild(lobbyWrapper)
  } catch (e) {
    // Return when lobby doesn't need to append
    return
  }
}
