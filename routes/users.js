const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database');


/**
 * Fetch all users
 */
router.get('/users', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

router.post('/user/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    mysqlConnection.query('SELECT * FROM users WHERE login = ? AND password = ?', [username, password], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

router.post('/user/manifestation', (req, res, next) => {
    const userId = req.body.userId;
    const manifId = req.body.manifId;
    const nbPers = req.body.nbPers;
    mysqlConnection.query('INSERT INTO reserver (nbPlaces, id, id_manifestations) VALUES (?, ?, ?)', [nbPers, userId, manifId], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

router.post('/user/avis', (req, res, next) => {
    const avis = req.body.avis;
    const note = req.body.note;
    const userId = req.body.userId;
    const manifId = req.body.manifId;
    mysqlConnection.query('INSERT INTO avis (avis, note, id_users, id_manifestations) VALUES (?, ?, ?, ?)', [avis, note, userId, manifId], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

/**
 * Fetch user by id
 */
router.get('/users/:id', (req, res, next) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

/**
 * Add new user
 */
router.post('/user', (req, res, next) => {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const number = req.body.number;
    const username = req.body.username;
    const password = req.body.password;
    mysqlConnection.query('INSERT INTO users (nom, prenom, email, numero, login, password) VALUES (?, ?, ?, ?, ?, ?)', [lastName, firstName, email, number, username, password], (err, results, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.end()
    })
});

/**
 * Update user by id
 */
router.put('/user', (req, res, next) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    mysqlConnection.query('UPDATE users SET email = ?, password = ? WHERE id = ?', [email, password, id], (err, results, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.end()
    })
});

/**
 * Delete user by id
 */
router.delete('/user', (req, res, next) => {
    const id = req.body.id;
    mysqlConnection.query('DELETE FROM users WHERE id = ?', [id], (err, results, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.end()
    })
});

module.exports = router;