const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const { initClientDbConnection } = require("../config/db");
const port = 8000;

const catwayRoutes = require('../routes/route-catway');
const userRoute = require('../routes/route-users');
const reservationRoutes = require('../routes/route-reservation');
const auth = require('../middleware/auth');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/controllers', express.static(path.join(__dirname, '../controllers')));

// connexion à la BDD
initClientDbConnection();

app.use('/catways', catwayRoutes);
app.use('/users', userRoute);
app.use('/reservations', reservationRoutes);

// Routes publiques
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/index.html'))
})

// Routes sécurisées
app.get('/menu', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/menuapi.html'))
})

app.get('/list-user', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/list-users.html'))
})

app.get('/edit-user', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/edit-user.html'))
})

app.get('/add-user', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/add-user.html'))
});

app.get('/list-catways', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/list-catways.html'))
});

app.get('/edit-catway', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/edit-catway.html'));
});

app.get('/catway-details', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/catway-details.html'));
});

app.get('/add-catway', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/add-catway.html'));
})

app.get('/list-reservations', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/list-reservations.html'));
})

app.get('/edit-reservation', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/edit-reservation.html'));
})

app.get('/add-reservation', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/add-reservation.html'));
})

app.get('/reservation-details', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/reservation-details.html'));
})

// lancement du serveur
app.listen(port, () => console.log("le serveur a démarré au port" + port)
);

module.exports = app;