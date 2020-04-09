const express = require('express')
const router = express.Router()
const lobbyController = require('../../../controllers/api/v1/lobby')

/* /api/v1/lobby */
router.get("/", lobbyController.getAll)

router.post("/", lobbyController.create)

module.exports = router