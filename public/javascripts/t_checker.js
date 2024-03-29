if (!localStorage.getItem('token')) {
  console.log('no token')
  window.location.href = '/login'
} else {
  fetch('http://localhost:3000/users/check', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({
      username: localStorage.getItem('username'),
    }),
  })
    .then((result) => {
      return result.json()
    })
    .then((json) => {
      // console.log(json)
      console.log('valid token')
    })
    .catch((err) => {
      console.log(err)
      // Delete existing data and redirect
      console.log('invalid token')
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
      localStorage.removeItem('profilepic')
      localStorage.removeItem('gamesplayed')
      localStorage.removeItem('gameswon')

      window.location.href = '/login'
    })
}
