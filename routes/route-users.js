const express = require('express');
const router = express.Router();

const user = require('../services/users');

router.get('/users', user.getAll);
router.get('/users/:id', user.getById);
router.post('/users', user.add);
router.patch('/users/:id', user.update);
router.delete('/users/:id', user.deleteById);
router.post('/login', user.login);

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Déconnexion réussie' });
});


module.exports = router;
