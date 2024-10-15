const express = require('express');
const Reservation = require('../models/reservation');
const Catway = require('../models/catway'); 
const router = express.Router();

// Récupérer toutes les réservations 
router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer une réservation d'un catway
router.get('/catways/:id/reservations/:idReservation', async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayId: req.params.id,
        });
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer une nouvelle réservation pour un catway
router.post('/catways/:id/reservations', async (req, res) => {
    const { clientName, boatName, checkIn, checkOut } = req.body;
    const reservation = new Reservation({
        catwayNumber: req.body.catwayNumber,
        clientName,
        boatName,
        checkIn,
        checkOut,
        catwayId: req.params.id, 
    });

    try {
        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une réservation d'un catway
router.delete('/catways/:id/reservations/:idReservation', async (req, res) => {
    try {
        const deletedReservation = await Reservation.findOneAndDelete({
            _id: req.params.idReservation,
            catwayId: req.params.id,
        });
        if (!deletedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
