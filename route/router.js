const express = require('express')
const userController = require('../controllers/userController')
const noteController = require('../controllers/noteController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post('/addnotes',jwtMiddleware,noteController.addNotesController)

router.get('/getnotes',jwtMiddleware,noteController.getNotesController)

router.put('/notes/:pid/edit',jwtMiddleware,noteController.editNotesController)

router.delete('/notes/:pid/remove',jwtMiddleware,noteController.removeNotesController)

router.get('/searchnotes',jwtMiddleware,noteController.searchNotesController)

module.exports = router