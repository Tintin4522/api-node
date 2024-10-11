const express = require('express');
const router = express.Router();

const catway = require('../services/catway');

router.get('/', catway.getAll);
router.get('/:id', catway.getById);
router.post('/add', catway.add);
router.patch('/:id', catway.update);
//router.delete('/:id', catway.delete);

module.exports = router;