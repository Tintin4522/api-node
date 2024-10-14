const express = require('express');
const router = express.Router();

const catway = require('../services/catway');

router.get('/', catway.getAll);
router.get('/:id', catway.getById);
router.post('/', catway.add);
router.patch('/:id', catway.update);
router.delete('/:id', catway.deleteById);

module.exports = router;