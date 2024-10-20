const mongoose = require('mongoose');
const Catway = require('../models/catway');

/**
 * Récupère un catway par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.id - L'ID du catway.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} Le catway trouvé ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide ou si une erreur serveur survient.
 * 
 * @example
 * // Exemple de requête HTTP GET
 * fetch('/catways/614c1b5a7b1e8a32fc8995d4')
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        // Vérifie si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Recherche par _id
        let catway = await Catway.findById(id);

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json({ message: 'catway_not_found' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};

/**
 * Ajoute un nouveau catway.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.body - Corps de la requête contenant les données du catway.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} Le catway ajouté ou un message d'erreur.
 * @throws {Error} Si le catwayNumber existe déjà ou si une erreur survient lors de l'ajout.
 * 
 * @example
 * // Exemple de requête HTTP POST
 * fetch('/catways/reservations', {
 *  method: 'POST',
 *  headers: {
 *      'Content-Type': 'application/json',
 *  },
 *  body: JSON.stringify({ catwayNumber: 'C123', ... })
 * })
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.add = async (req, res) => {
    const { catwayNumber } = req.body;

    try {
        const existingCatway = await Catway.findOne({ catwayNumber });

        if (existingCatway) {
            return res.status(400).json({ message: 'Le catwayNumber existe déjà.' });
        }

        const newCatway = new Catway(req.body);
        const savedCatway = await newCatway.save();
        return res.status(201).json(savedCatway);
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de l\'ajout du catway', error });
    }
};

/**
 * Met à jour un catway par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.id - L'ID du catway à mettre à jour.
 * @param {Object} req.body - Corps de la requête contenant les nouvelles données du catway.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} Le catway mis à jour ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide ou si une erreur survient lors de la mise à jour.
 * 
 * @example
 * // Exemple de requête HTTP PATCH
 * fetch('/catways/reservations/614c1b5a7b1e8a32fc8995d4', {
 *  method: 'PATCH',
 *  headers: {
 *      'Content-Type': 'application/json',
 *  },
 *  body: JSON.stringify({ catwayNumber: 'C456', ... })
 * })
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        // Vérifie si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Mise à jour du catway par _id
        const updatedCatway = await Catway.findByIdAndUpdate(id, req.body, { new: true });

        if (updatedCatway) {
            return res.status(200).json(updatedCatway);
        }

        return res.status(404).json({ message: 'catway_not_found' });
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de la mise à jour du catway', error });
    }
};

/**
 * Récupère tous les catways.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @returns {Array} La liste de tous les catways ou un message d'erreur.
 * @throws {Error} Si une erreur survient lors de la récupération des catways.
 * 
 * @example
 * // Exemple de requête HTTP GET
 * fetch('/catways/reservations')
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.getAll = async (req, res) => {
    try {
        const catways = await Catway.find();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des catways', error });
    }
};

/**
 * Supprime un catway par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.id - L'ID du catway à supprimer.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} Un message de succès ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide ou si une erreur survient lors de la suppression.
 * 
 * @example
 * // Exemple de requête HTTP DELETE
 * fetch('/catways/reservations/614c1b5a7b1e8a32fc8995d4', {
 *  method: 'DELETE'
 * })
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.deleteById = async (req, res) => {
    const id = req.params.id;

    try {
        // Vérifie si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Suppression par _id
        const deletedCatway = await Catway.findByIdAndDelete(id);

        if (deletedCatway) {
            return res.status(200).json({ message: 'Catway supprimé avec succès' });
        }

        return res.status(404).json({ message: 'catway_not_found' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression du catway', error });
    }
};
