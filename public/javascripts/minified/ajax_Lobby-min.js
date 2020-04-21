let url=window.location.href.replace(/\/$/,""),lobby_id=url.substr(url.lastIndexOf("/")+1);fetch(`http://localhost:3000/api/v1/lobby/${lobby_id}`,{method:"get",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{if(console.log(e),"success"==e.status){let t=e.data.lobbyname;for(document.querySelector(".lobbyname").innerHTML=t,i=0;i<e.data.playersinside.length;i++){let t=document.createElement("div");t.classList.add("content__list","content__list--lobby");let n=`\n        <div class="content__list_profilepic_wrapper--big content__list_profilepic--big"></div>\n        <h4 class="content__list_username">${e.data.playersinside[i].username}</h4>\n        <div class="content__list_amountPlays">\n            <h6><span class="content__list_amountPlays_amount">${e.data.playersinside[i].gamesplayed}</span> games played</h6>\n        </div>\n        <div class="content__list_amountWins">\n            <h6><span class="content__list_amountWins_amount">${e.data.playersinside[i].gameswon}</span> games won</h6>\n        </div>\n      `;t.innerHTML=n,document.querySelector(".content__wrapper--middle-middle").appendChild(t)}}else if("failed"==e.status){console.log("here");const e="Oops";document.querySelector(".lobbyname").innerHTML=e,document.querySelector(".btn--ready").remove();let t=document.createElement("div");t.classList.add("alert","alert-danger","alert-dismissible","fade","show");let n='\n          <strong>Hats not found!</strong> Something went wrong with retrieving data for this lobby. Go back and try again.\n          <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n            <span aria-hidden="true">&times;</span>\n          </button>\n      ';t.innerHTML=n,document.querySelector(".content__wrapper--middle-middle").appendChild(t)}}).catch(e=>{});