const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Accès interdit' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = auth;
