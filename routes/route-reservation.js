const express = require('express');
const reservationService = require('../services/reservation');
const router = express.Router();

// Récupérer toutes les réservations 
router.get('/reservations', async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer une réservation d'un catway
router.get('/catways/:id/reservations/:idReservation', async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.id, req.params.idReservation);
        res.json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Créer une nouvelle réservation pour un catway
router.post('/catways/:id/reservations', async (req, res) => {
    try {
        const savedReservation = await reservationService.createReservation(req.params.id, req.body);
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une réservation d'un catway
router.delete('/catways/:id/reservations/:idReservation', async (req, res) => {
    try {
        const result = await reservationService.deleteReservation(req.params.id, req.params.idReservation);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
