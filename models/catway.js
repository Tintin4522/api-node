const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type:Number,
        trim:true,
        required:[true, 'Un numéro est requis']
    },
    type: {
        type:String,
        trim:true,
    },
    catwayState: {
        type:String,
        trim:true,
        required:[true, 'état requis']
    }
});

module.exports = mongoose.model('Catway', Catway)
