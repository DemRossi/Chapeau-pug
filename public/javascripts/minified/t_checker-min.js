localStorage.getItem("token")?fetch("http://localhost:3000/users/check",{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},body:JSON.stringify({username:localStorage.getItem("username")})}).then(e=>e.json()).then(e=>{}).catch(e=>{console.log(e),localStorage.removeItem("token"),localStorage.removeItem("user_id"),localStorage.removeItem("username"),window.location.href="/login"}):window.location.href="/login";