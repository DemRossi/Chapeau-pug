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
  })
  .catch((err) => {
    console.log('error!!!')
    // Delete existing tokens and redirect
    localStorage.removeItem('token')
    window.location.href = '/login'
  })
