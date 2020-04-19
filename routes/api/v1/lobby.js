/* Route */
const express = require('express')
const router = express.Router()
const lobbyController = require('../../../controllers/api/v1/lobby')

/* /api/v1/lobby */
router.get('/', lobbyController.getAll)

router.get('/:id', lobbyController.getLobbyById)

router.post('/', lobbyController.create)

router.put('/:id', lobbyController.join)

router.put('/:id/:uid', lobbyController.leave)

module.exports = router
