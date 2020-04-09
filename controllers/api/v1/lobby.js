let getAll = (req, res)=>{
    res.json({
        "status": "success",
        "data": {
            "lobbies": [
                // "lobby1":{
                //     "lobbyname": "Nieuwe lobby",
                //     "playeramount": "6",
                //     "private": false 
                // },
                // "lobby2":{
                //     "lobbyname": "Nieuwe lobby",
                //     "playeramount": "6",
                //     "private": false 
                // }
            ]
        }
    })
}

let create = (req,res)=>{
    res.json({
        "status": "success",
        "data": {
            "newlobby": {
               "lobbyname": "Nieuwe lobby",
                "playeramount": "6",
                "private": false 
            }
        }
    })
    console.log(res)
}


module.exports.getAll = getAll
module.exports.create = create