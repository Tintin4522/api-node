const express = require('express');
const router = express.Router();

const catway = require('../services/catway');

router.get('/catways', catway.getAll);
router.get('/catways/:id', catway.getById);
router.post('/catways', catway.add);
router.patch('/catways/:id', catway.update);
router.delete('/catways/:id', catway.deleteById);

module.exports = router;