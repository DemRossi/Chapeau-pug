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
          let profileWrapper = document.createElement('div')
          profileWrapper.classList.add(
            'content__list',
            'content__list--profile'
          )

          let profileTemplate = `
              <div class="profile_profilepic">
                <img src="${localStorage.getItem('profilepic')}" />
              </div>
              <form>
                <div class="form-group custom-file">
                  <label class="custom-file-label" for="File">Change profile picture</label>
                  <input class="custom-file-input" id="customFile" type="file" />
                </div>
                <div class="form-group">
                  <input class="form-control" id="username" type="text" value="${
                    json.data.username
                  }" />
                </div>
                <div class="form-group">
                  <input class="form-control" id="email" type="email" value="${
                    json.data.email
                  }" />
                </div>
                
                <div class="form-group text-center">
                  <input class="btn btn-success btn--save-profile" type="submit" value="Update profile" />
                </div>
              </form>
            `
          // change password template
          // <div class="form-group">
          //   <input class="form-control" id="oldPassword" type="password" placeholder="Old password"/>
          // </div>
          // <div class="form-group">
          //   <input class="form-control" id="password" type="password" placeholder="New password"/>
          // </div>
          profileWrapper.innerHTML = profileTemplate
          const profileList = document.querySelector(
            '.content__wrapper--middle-middle-profile'
          )
          profileList.appendChild(profileWrapper)
        } else if (json['status'] == 'failed') {
          // build profile - error page with data
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  updateUserById() {
    let url = window.location.href.replace(/\/$/, '')
    let user_id = url.substr(url.lastIndexOf('/') + 1)
    console.log(user_id)
    // https://cloudinary.com/documentation/node_image_and_video_upload
    console.log(
      'Will finalize this later, further research is needed. (cloudinary, fs, ...)'
    )
  }
}
