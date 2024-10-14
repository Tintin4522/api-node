const mongoose = require('mongoose');

const clientOptions = {
    dbName : 'russell'
}

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, clientOptions);
        console.log('MongoDB connecté');
    } catch (error) {
        console.error('Erreur de connection à MongoDB', error);
        throw error; 
    }
};


