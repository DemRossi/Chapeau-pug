let loginBtn=document.querySelector(".btn--login").addEventListener("click",e=>{let t=document.querySelector("#username").value,o=document.querySelector("#password").value;fetch("/users/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:o})}).then(e=>e.json()).then(e=>{if("success"===e.status){let t=e.data.token,o=e.data.user_id,a=e.data.username;localStorage.setItem("token",t),localStorage.setItem("user_id",o),localStorage.setItem("username",a),window.location.href="/"}else alert("login failed")}),e.preventDefault()});