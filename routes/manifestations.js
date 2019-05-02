const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database');


router.get('/manifestations', (req, res, next) => {
    mysqlConnection.query('SELECT *, DATE_FORMAT(dateDebut, "%d/%m") dateDebut, DATE_FORMAT(heureDebut, "%HH%i") heureDebut FROM manifestations', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

router.get('/manifestation/:id', (req, res, next) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT M.id, M.affiche, M.nom, DATE_FORMAT(M.dateDebut, "%d/%m") dateDebut, DATE_FORMAT(M.heureDebut, "%HH%i") heureDebut, M.resume, M.prix, L.lieu, P.public FROM manifestations M ' +
        'INNER JOIN lieu L ON L.id = M.id_lieu INNER JOIN public P ON P.id = M.id_public WHERE M.id = ?', [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

router.get('/manifestations/user/:id', (req, res, next) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT r.nbPlaces, r.id id_user, M.*, DATE_FORMAT(M.dateDebut, "%d/%m") dateDebut, DATE_FORMAT(M.heureDebut, "%HH%i") heureDebut FROM reserver r ' +
        'INNER JOIN manifestations M ON M.id = r.id_manifestations WHERE r.id = ?', [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

router.get('/manifestation/:id/avis', (req, res, next) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT A.avis, A.note, U.nom, U.prenom FROM avis A ' +
    'INNER JOIN users U ON U.id = A.id_users INNER JOIN manifestations M ON M.id = A.id_manifestations WHERE M.id = ?', [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return
        }
        res.json(rows)
    })
});

module.exports = router;