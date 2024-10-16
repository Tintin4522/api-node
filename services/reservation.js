const Reservation = require('../models/reservation');

// Récupérer toutes les réservations
const getAllReservations = async () => {
    try {
        return await Reservation.find();
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des réservations : ${error.message}`);
    }
};

// Récupérer une réservation d'un catway
const getReservationById = async (catwayId, reservationId) => {
    try {
        const reservation = await Reservation.findOne({
            _id: reservationId,
            catwayId: catwayId,
        });
        if (!reservation) {
            throw new Error('Réservation non trouvée');
        }
        return reservation;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de la réservation : ${error.message}`);
    }
};

// Créer une nouvelle réservation pour un catway
const createReservation = async (catwayId, reservationData) => {
    const reservation = new Reservation({
        ...reservationData,
        catwayId: catwayId,
    });

    try {
        return await reservation.save();
    } catch (error) {
        throw new Error(`Erreur lors de la création de la réservation : ${error.message}`);
    }
};

// Supprimer une réservation d'un catway
const deleteReservation = async (catwayId, reservationId) => {
    try {
        const deletedReservation = await Reservation.findOneAndDelete({
            _id: reservationId,
            catwayId: catwayId,
        });
        if (!deletedReservation) {
            throw new Error('Réservation non trouvée');
        }
        return { message: 'Réservation supprimée avec succès' };
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la réservation : ${error.message}`);
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    deleteReservation,
};
