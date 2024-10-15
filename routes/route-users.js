const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/users', authMiddleware.authenticateToken, userController.createUser);
router.patch('/users/:id', authMiddleware.authenticateToken, userController.updateUser);
router.delete('/users/:id', authMiddleware.authenticateToken, userController.deleteUser);



module.exports = router;