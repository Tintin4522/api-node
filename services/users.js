const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

// Créer un utilisateur
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return { message: 'Utilisateur créé avec succès', user: newUser };
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
    }
};

// Authentifier un utilisateur
const authenticate = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Identifiants invalides');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Identifiants invalides');
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
};

// Modifier un utilisateur par ID
const updateUser = async (userId, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
        throw new Error('Utilisateur non trouvé');
    }
    return updatedUser;
};

// Supprimer un utilisateur par ID
const deleteUser = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new Error('Utilisateur non trouvé');
    }
    return deletedUser;
};

module.exports = {
    createUser,
    authenticate,
    updateUser,
    deleteUser
};
