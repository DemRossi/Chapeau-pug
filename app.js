const createError = require('http-errors')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('./passport/passport')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const apiLobbyRouter = require('./routes/api/v1/lobby')
const apiProfileRouter = require('./routes/api/v1/profile')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// mongoose setup
dotenv.config()
let connectionString = process.env.MONGOCON_URI
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use(
  '/api/v1/lobby',
  passport.authenticate('jwt', { session: false }),
  apiLobbyRouter
)
app.use(
  '/api/v1/profile',
  passport.authenticate('jwt', { session: false }),
  apiProfileRouter
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// catch 401 and redirect to login
// app.use(function (err, req, res, next) {
//   if (401 == err.status) {
//     console.log('401 error test')
//     res.redirect('/login')
//   }
// })
module.exports = app
