const express = require('express');
const router = express.Router();

const reservation = require('../services/reservation');

router.get('/catways/reservations', reservation.getAll);
router.get('/catways/reservations/:reservationId', reservation.getById);
router.post('/catways/reservations', reservation.add);
router.patch('/catways/reservations/:reservationId', reservation.update);
router.delete('/catways/reservations/:reservationId', reservation.deleteById);

module.exports = router;
