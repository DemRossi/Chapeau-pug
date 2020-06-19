let user = new User()
user.getUserById()

window.onload = (e) => {
  let updateBtn = document
    .querySelector('.btn--save-profile')
    .addEventListener('click', (e) => {
      user.updateUserById()
      //   console.log('tester')
      e.preventDefault()
    })
}
