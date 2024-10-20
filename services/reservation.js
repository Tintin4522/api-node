const mongoose = require('mongoose');
const Reservation = require('../models/reservation');

/**
 * Récupère une réservation par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.reservationId - L'ID de la réservation.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} La réservation trouvée ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide ou si une erreur serveur survient.
 * 
 * @example
 * // Exemple de requête HTTP GET
 * fetch('/reservations/614c1b5a7b1e8a32fc8995d4')
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
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

/**
 * Ajoute une nouvelle réservation.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.body - Corps de la requête contenant les détails de la réservation.
 * @param {string} req.body.catwayNumber - Le numéro du catway.
 * @param {string} req.body.clientName - Le nom du client.
 * @param {string} req.body.boatName - Le nom du bateau.
 * @param {Date} req.body.checkIn - La date d'arrivée.
 * @param {Date} req.body.checkOut - La date de départ.
 * @param {string} req.body.catwayId - L'ID du catway associé.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} La réservation créée ou un message d'erreur.
 * @throws {Error} Si une erreur survient lors de l'ajout de la réservation.
 * 
 * @example
 * // Exemple de requête HTTP POST
 * fetch('/reservations', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     catwayNumber: 'CW123',
 *     clientName: 'John Doe',
 *     boatName: 'Boaty McBoatface',
 *     checkIn: '2024-10-01T14:00:00Z',
 *     checkOut: '2024-10-10T12:00:00Z',
 *     catwayId: '614c1b5a7b1e8a32fc8995d4'
 *   })
 * })
 * .then(response => response.json())
 * .then(data => console.log(data))
 * .catch(error => console.error('Error:', error));
 */
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

/**
 * Met à jour une réservation existante.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.reservationId - L'ID de la réservation à mettre à jour.
 * @param {Object} req.body - Corps de la requête contenant les nouvelles informations de la réservation.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} La réservation mise à jour ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide ou si une erreur survient lors de la mise à jour.
 * 
 * @example
 * // Exemple de requête HTTP PUT
 * fetch('/reservations/614c1b5a7b1e8a32fc8995d4', {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     clientName: 'Jane Doe',
 *     checkOut: '2024-10-15T12:00:00Z'
 *   })
 * })
 * .then(response => response.json())
 * .then(data => console.log(data))
 * .catch(error => console.error('Error:', error));
 */
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

/**
 * Récupère toutes les réservations.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @returns {Array} La liste des réservations ou un message d'erreur.
 * @throws {Error} Si une erreur survient lors de la récupération des réservations.
 * 
 * @example
 * // Exemple de requête HTTP GET
 * fetch('/reservations')
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.getAll = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('catwayId');
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
};

/**
 * Supprime une réservation par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.reservationId - L'ID de la réservation à supprimer.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} Un message de succès ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide ou si une erreur survient lors de la suppression.
 * 
 * @example
 * // Exemple de requête HTTP DELETE
 * fetch('/reservations/614c1b5a7b1e8a32fc8995d4', {
 *   method: 'DELETE'
 * })
 * .then(response => response.json())
 * .then(data => console.log(data))
 * .catch(error => console.error('Error:', error));
 */
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
