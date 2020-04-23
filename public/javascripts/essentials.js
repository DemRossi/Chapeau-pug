class Essentials {
  constructor() {
    // console.log('test classes')

    let base_url = 'http://localhost:3000'

    let that = this

    this.primus = Primus.connect(base_url, {
      reconnect: {
        max: Infinity, // Number: The max delay before we try to reconnect.
        min: 500, // Number: The minimum delay before we try reconnect.
        retries: 10, // Number: How many times we should try to reconnect.
      },
    })

    // Set profile image in navigation
    // let profilepic = localStorage.getItem("profilepic")
    // get element put pic in

    // Logout listener
    let logoutBtn = document.querySelector('.btn--logout')
    logoutBtn.addEventListener('click', (e) => {
      //delete localstorage token, user_id and username
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')

      //redirect to login page
      document.location.href = 'http://localhost:3000/login'

      e.preventDefault()
    })
  }
}
