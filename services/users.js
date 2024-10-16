const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        // Vérifie si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Recherche par _id
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json({ message: 'user_not_found' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.add = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'L\'email existe déjà.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur', error });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        // Vérifie si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Mise à jour de l'utilisateur par _id
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (updatedUser) {
            return res.status(200).json(updatedUser);
        }

        return res.status(404).json({ message: 'user_not_found' });
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
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
        const deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser) {
            return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        }

        return res.status(404).json({ message: 'user_not_found' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};
