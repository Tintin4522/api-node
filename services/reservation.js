const mongoose = require('mongoose');
const Reservation = require('../models/reservation');

exports.getById = async (req, res) => {
    const id = req.params.reservationId;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const reservation = await Reservation.findById(id).populate('catwayId');

        if (reservation) {
            return res.status(200).json(reservation);
        }

        return res.status(404).json({ message: 'reservation_not_found' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.add = async (req, res) => {
    const { catwayNumber, clientName, boatName, checkIn, checkOut, catwayId } = req.body;

    try {
        const newReservation = new Reservation({
            catwayNumber,
            clientName,
            boatName,
            checkIn,
            checkOut,
            catwayId
        });

        const savedReservation = await newReservation.save();
        return res.status(201).json(savedReservation);
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de l\'ajout de la réservation', error });
    }
};

exports.update = async (req, res) => {
    const id = req.params.reservationId;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true }).populate('catwayId');

        if (updatedReservation) {
            return res.status(200).json(updatedReservation);
        }

        return res.status(404).json({ message: 'reservation_not_found' });
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de la mise à jour de la réservation', error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('catwayId');
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
};

exports.deleteById = async (req, res) => {
    const id = req.params.reservationId;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedReservation = await Reservation.findByIdAndDelete(id);

        if (deletedReservation) {
            return res.status(200).json({ message: 'Réservation supprimée avec succès' });
        }

        return res.status(404).json({ message: 'reservation_not_found' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error });
    }
};
