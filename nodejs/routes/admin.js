const express = require('express')
const router = express.Router()

const adminController = require("../controller/adminController")

router.post('/login',adminController.adminLogin)
router.get('/getAllUsers',adminController.getAllUsers)
router.put('/removeUser',adminController.removeUser)
router.put('/editUser',adminController.editUser)
router.post('/addUser',adminController.addUser)


module.exports = router