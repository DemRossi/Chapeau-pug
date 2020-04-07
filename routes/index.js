var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chapeau - Home' });
});
router.get('/login', (req, res,next)=>{
  res.render('login', {title: 'Chapeau - Log in'} )
})
router.get('/register', (req, res,next)=>{
  res.render('register', {title: 'Chapeau - Register'} )
})
router.get('/create', (req, res,next)=>{
  res.render('create', {title: 'Chapeau - Create Lobby'} )
})
module.exports = router;