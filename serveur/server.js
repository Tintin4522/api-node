const express = require("express");
const cors = require('cors');
const path = require('path');
const { initClientDbConnection } = require("../config/db");
const port = 8000;

const catwayRoutes = require('../routes/route-catway');
const userRoute = require('../routes/route-users');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/controllers', express.static(path.join(__dirname, '../controllers')));

// connexion à la BDD
initClientDbConnection();

app.use('/catways', catwayRoutes);
app.use('/users', userRoute);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/index.html'))
});

app.get('/add-user', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/add-user.html'))
});

app.get('/list-catways', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/list-catways.html'))
});

app.get('/edit-catway', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/edit-catway.html'));
});

app.get('/catway-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/catway-details.html'));
});

app.get('/add-catway', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/add-catway.html'));
})

// lancement du serveur
app.listen(port, () => console.log("le serveur a démarré au port" + port)
);