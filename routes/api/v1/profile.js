/* Route */
const express = require('express')
const router = express.Router()
const profileController = require('../../../controllers/api/v1/profile')

/* /api/v1/profile */
// router.get('/', lobbyController.getAll)

router.get('/:id', profileController.getProfileById)

// router.post('/', lobbyController.create)

// router.put('/:id', lobbyController.join)

// router.put('/:id/:uid', lobbyController.leave)

module.exports = router
