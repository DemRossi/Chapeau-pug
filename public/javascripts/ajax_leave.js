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
          //redirect to /
          window.location.href = `/`
        }
      })
    e.preventDefault()
  })
