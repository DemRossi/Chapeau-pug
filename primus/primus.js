const Primus = require('primus')

let go = (server) => {
  let primus = new Primus(server, {
    /* options */
  })
  primus.on('connection', (spark) => {
    console.log('Received spark!!!')
    // console.log(spark.id)
    spark.on('data', (data) => {
      console.log(data)
      console.log('Backend received data!!!!')
      primus.write(data)
    })
  })
}

module.exports.go = go
