const express = require('express');
const router = express.Router();
const authController = require('../controllers/api/v1/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
