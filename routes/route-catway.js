const express = require('express');
const router = express.Router();

const catway = require('../services/catway');

router.get('/catways', catway.getAll);
router.get('/catways/:id', catway.getById);
router.post('/catways', catway.add);
router.patch('/catways/:id', catway.update);
router.delete('/catways/:id', catway.deleteById);

router.get('/catways', async (req, res) => {
    const { number } = req.query;
    try {
        const catway = await Catway.findOne({ catwayNumber: number });
        if (!catway) {
            return res.status(404).json({ message: 'Catway introuvable.' });
        }
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du catway.', error });
    }
});

module.exports = router;