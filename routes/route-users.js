const express = require('express');
const router = express.Router();
const userController = require('../services/users');


router.post('/users',  userController.createUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);



module.exports = router;