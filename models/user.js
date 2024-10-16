const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Un nom est requis']
    },
    firstname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Un e-mail est requis']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Mot de passe requis']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);
