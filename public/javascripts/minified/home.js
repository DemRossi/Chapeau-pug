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
      for (i = 0; i < json.data.length; i++) {
        // console.log(json.data[i].lobbyname)
        let lobbyWrapper = document.createElement('div')
        lobbyWrapper.classList.add('content__list', 'content__list--home')
        lobbyWrapper.dataset.id = json.data[i]._id
        let playersinside = json.data[i].playersinside.length
        // console.log(json.data[i])
        let lobbyTemplate = `
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
          <div class="content__list_profilepic_wrapper--small">
            <div class="content__list_profilepic--small"></div>
            <div class="content__list_profilepic--small"></div>
            <div class="content__list_profilepic--small"></div>
            <div class="content__list_profilepic--small"></div>
            <div class="content__list_profilepic--small"></div>
          </div>
        </div>

        <div class="content__btn">
          <a href="" data-id="${json.data[i]._id}" class="btn btn-success btn--join">Join</a>
        </div>
        `
        lobbyWrapper.innerHTML = lobbyTemplate

        const lobbyList = document.querySelector(
          '.content__wrapper--middle-middle'
        )
        lobbyList.appendChild(lobbyWrapper)
      }
    } else if (json['status'] == 'failed') {
      // let lobbyWrapper = document.createElement('div')
      // lobbyWrapper.classList.add('content__list', 'content__list--home')
      let lobbyTemplate = `
      <h2 class="content__list_error">${json.message}</h2>
      `
      const lobbyList = document.querySelector(
        '.content__wrapper--bottom-middle'
      )
      lobbyList.innerHTML = lobbyTemplate
      // lobbyList.appendChild(lobbyWrapper)
    }
  })
  .catch((err) => {
    console.log('error!!!')
    console.log(err)
    // something wrong happend page

    // Delete existing tokens and redirect
    // localStorage.removeItem('token')
    // localStorage.removeItem('user_id')
    // localStorage.removeItem('username')
    // window.location.href = '/login'
  })
