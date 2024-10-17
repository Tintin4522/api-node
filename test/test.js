const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const server = require('../serveur/server'); 
const User = require('../models/user');
const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

chai.use(chaiHttp);
const { expect } = chai;


describe('API Tests', () => {
    let userId, catwayId, reservationId;
    let mongoServer;

    before(async () => {
        // Démarrer MongoDB en mémoire
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        // Vérifiez si Mongoose est déjà connecté avant d'appeler connect()
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoUri, {
                dbName: 'russel_test',
            });
            console.log('MongoDB connecté');
        }
    });

    after(async () => {
        // Déconnexion de la base de données après les tests
        await mongoose.disconnect();
        await mongoServer.stop();
        console.log('MongoDB déconnecté');
    });

    describe('User Management', () => {
        it('should create a new user', (done) => {
            chai.request(server)
                .post('/users/users')
                .send({ name: 'Test User', firstname: 'User Test', email: 'test@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('_id');
                    userId = res.body._id; 
                    done();
                });
        });

        it('should retrieve the created user', (done) => {
            chai.request(server)
                .get(`/users/users/${userId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include({
                        name: 'Test User',
                        email: 'test@example.com'
                    });
                    done();
                });
        });

        it('should delete the user', (done) => {
            chai.request(server)
                .delete(`/users/users/${userId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Utilisateur supprimé avec succès');
                    done();
                });
        });
    });

    describe('Catway Management', () => {
        it('should create a new catway', (done) => {
            chai.request(server)
                .post('/catways/catways')
                .send({ catwayNumber: 1000, type: 'Long', catwayState: 'Disponible' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('_id');
                    catwayId = res.body._id; 
                    done();
                });
        });

        it('should retrieve the created catway', (done) => {
            chai.request(server)
                .get(`/catways/catways/${catwayId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include({
                        catwayNumber: 1000,
                        type: 'Long',
                        catwayState: 'Disponible'
                    });
                    done();
                });
        });

        it('should delete the catway', (done) => {
            chai.request(server)
                .delete(`/catways/catways/${catwayId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Catway supprimé avec succès');
                    done();
                });
        });
    });

    describe('Reservation Management', () => {
        it('should create a new reservation', (done) => {
            chai.request(server)
                .post('/reservations/catways/reservations')
                .send({
                    catwayNumber: 1,
                    clientName: 'John Doe',
                    boatName: 'Boat 1',
                    checkIn: new Date(),
                    checkOut: new Date(new Date().getTime() + 86400000), 
                    catwayId: catwayId 
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('_id');
                    reservationId = res.body._id; 
                    done();
                });
        });

        it('should retrieve the created reservation', (done) => {
            chai.request(server)
                .get(`/reservations/catways/reservations/${reservationId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include({
                        clientName: 'John Doe',
                        boatName: 'Boat 1'
                    });
                    done();
                });
        });

        it('should delete the reservation', (done) => {
            chai.request(server)
                .delete(`/reservations/catways/reservations/${reservationId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Réservation supprimée avec succès');
                    done();
                });
        });
    });
});
