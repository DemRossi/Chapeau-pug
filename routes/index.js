const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chapeau - Home' })
});
router.get('/login', (req, res,next)=>{
  res.render('login', {title: 'Chapeau - Log in'} )
})
router.get('/signup', (req, res,next)=>{
  res.render('signup', {title: 'Chapeau - signup'} )
})
router.get('/create', (req, res,next)=>{
  res.render('create', {title: 'Chapeau - Create Lobby'} )
})
router.get('/lobby', (req, res,next)=>{
  res.render('lobby', {title: 'Chapeau - Inside lobby'} )
})
module.exports = router;