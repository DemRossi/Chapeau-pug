//logout on clicking logout btn
let logoutBtn = document.querySelector('.btn--logout')
logoutBtn.addEventListener('click', function (e) {
  //   //send live user over websockets
  //   this.primus.write({
  //     action: 'liveUserGone',
  //     username: localStorage.getItem('username'),
  //   })

  //delete localstorage token, user_id and username
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('username')

  //redirect to login page
  document.location.href = 'http://localhost:3000/login'

  e.preventDefault()
})
