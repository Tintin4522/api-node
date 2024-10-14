const mongoose = require('mongoose');
const Catway = require('../models/catway');

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

exports.getAll = async (req, res) => {
    try {
        const catways = await Catway.find();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des catways', error });
    }
};

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
