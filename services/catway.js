const Catway = require('../models/catway');

exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        let catway = await Catway.findOne({catwayNumber: id});

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res) => {
    const newCatway = new Catway(req.body);

    try {
        const savedCatway = await newCatway.save();
        return res.status(201).json(savedCatway);
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de l\'ajout du catway', error });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id; 

    try {
        const updatedCatway = await Catway.findByIdAndUpdate(id, req.body, { new: true }); 

        if (updatedCatway) {
            return res.status(200).json(updatedCatway);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(400).json({ message: 'Erreur lors de la mise à jour du catway', error });
    }
}

exports.getAll = async (req, res) => {
    try {
        const catways = await Catway.find(); 
        return res.status(200).json(catways); 
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des catways', error });
    }
};
