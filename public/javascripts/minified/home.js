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
    console.log(json)
    if (json['status'] == 'success') {
      for (i = 0; i < json.data.length; i++) {
        // console.log(json.data[i].lobbyname)
        let lobbyWrapper = document.createElement('div')
        lobbyWrapper.classList.add('content__list', 'content__list--home')
        lobbyWrapper.dataset.id = json.data[i]._id

        let lobbyTemplate = `
        <h2 class="content__list_name">${json.data[i].lobbyname}</h2>

        <div class="content__list_amountPlayers">
          <h5>
            <span class="content__list_amountPlayers_amount">5</span>
            /
            <span class="content__list_amountPlayers_many">6</span>
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
          <button class="btn btn-success btn--join">Join</button>
        </div>
        `
        lobbyWrapper.innerHTML = lobbyTemplate

        const lobbyList = document.querySelector(
          '.content__wrapper--bottom-middle'
        )
        lobbyList.appendChild(lobbyWrapper)
      }
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
