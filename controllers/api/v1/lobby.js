/* Controller */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LobbySchema = new Schema({
    lobbyname: String,
    owner: String,
    playersamount: Number
});
const Lobby = mongoose.model('Lobbies', LobbySchema);

let getAll = (req, res)=>{
    Lobby.find({}, (err, docs)=>{
        // if( err){
        //     res.json({
        //         "status": "error",
        //         "message": err.message
        //     });
        // }
        //if no errors, go ahead and do your job!
        if(!err){
            res.json({
                "status": "success",
                "data": docs
            })
        }
    });
}

let create = (req,res)=>{
    let lobby = new Lobby();
    lobby.lobbyname = "Mijn tweede lobby";
    lobby.owner = "Weske";
    lobby.playersamount = 6;
    lobby.save( (err, doc)=>{
        if(!err){
            res.json({ 
                "status": "success",
                "data": {
                    "lobby": doc
                }
            })
        }
    })
    
    console.log(res)
}


module.exports.getAll = getAll
module.exports.create = create