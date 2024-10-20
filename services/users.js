const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Récupère un utilisateur par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.id - L'ID de l'utilisateur.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} L'utilisateur trouvé ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide ou si une erreur serveur survient.
 * 
 * @example
 * // Exemple de requête HTTP GET
 * fetch('/users/614c1b5a7b1e8a32fc8995d4')
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
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

/**
 * Ajoute un nouvel utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.body - Corps de la requête contenant les informations de l'utilisateur.
 * @param {string} req.body.name - Le nom de l'utilisateur.
 * @param {string} req.body.firstname - Le prénom de l'utilisateur.
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur (avant hachage).
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} L'utilisateur ajouté ou un message d'erreur.
 * @throws {Error} Si l'email existe déjà ou si une erreur survient lors de l'ajout.
 * 
 * @example
 * // Exemple de requête HTTP POST
 * fetch('/users', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     name: 'Doe',
 *     firstname: 'John',
 *     email: 'john.doe@example.com',
 *     password: 'securepassword'
 *   })
 * })
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.add = async (req, res) => {
    const { name, firstname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'L\'email existe déjà.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            name,
            firstname,
            email,
            password: hashedPassword 
        });
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur', error });
    }
};

/**
 * Met à jour un utilisateur par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.id - L'ID de l'utilisateur à mettre à jour.
 * @param {Object} req.body - Corps de la requête contenant les champs à mettre à jour.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} L'utilisateur mis à jour ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide, l'utilisateur n'est pas trouvé ou si une erreur serveur survient.
 * 
 * @example
 * // Exemple de requête HTTP PUT
 * fetch('/users/614c1b5a7b1e8a32fc8995d4', {
 *   method: 'PUT',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     name: 'Doe',
 *     firstname: 'John'
 *   })
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

/**
 * Récupère tous les utilisateurs.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @returns {Array<Object>} Liste des utilisateurs ou un message d'erreur.
 * @throws {Error} Si une erreur survient lors de la récupération des utilisateurs.
 * 
 * @example
 * // Exemple de requête HTTP GET
 * fetch('/users')
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
};

/**
 * Supprime un utilisateur par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.params - Paramètres de la requête.
 * @param {string} req.params.id - L'ID de l'utilisateur à supprimer.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} Un message de succès ou un message d'erreur.
 * @throws {Error} Si l'ID est invalide, l'utilisateur n'est pas trouvé ou si une erreur serveur survient.
 * 
 * @example
 * // Exemple de requête HTTP DELETE
 * fetch('/users/614c1b5a7b1e8a32fc8995d4', {
 *   method: 'DELETE'
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
        const deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser) {
            return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        }

        return res.status(404).json({ message: 'user_not_found' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};

/**
 * Authentifie un utilisateur et génère un token JWT.
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.body - Corps de la requête contenant les informations d'authentification.
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} Un message de succès et un token ou un message d'erreur.
 * @throws {Error} Si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect.
 * 
 * @example
 * // Exemple de requête HTTP POST
 * fetch('/login', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     email: 'john.doe@example.com',
 *     password: 'securepassword'
 *   })
 * })
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error));
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifie si l'email est fourni
        if (!email) {
            return res.status(400).json({ message: 'Email requis' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Comparaison du mot de passe haché
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Création du token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Dépose le token dans un cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        return res.status(200).json({ message: 'Connexion réussie' });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};