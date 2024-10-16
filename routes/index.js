const express = require('express');
const router = express.Router();

const catwayRoutes = require('./catway');
const reservationRoutes = require('./reservation');

router.use('/', catwayRoutes);
router.use('/', reservationRoutes);

module.exports = router;
