// CLIENT
class User {
  constructor() {}

  getUserById() {
    let url = window.location.href.replace(/\/$/, '')
    let user_id = url.substr(url.lastIndexOf('/') + 1)

    fetch(`http://localhost:3000/users/profile/${user_id}`, {
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
          // build profile page with data
          //   let profileWrapper = document.createElement('div')
        } else if (json['status'] == 'failed') {
          // build profile - error page with data
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}
