'use strict'

import firebase from 'firebase';
var db = firebase.database();
var ref = db.ref('credito');
export function add(req, res) {
    ref.push(req.body).then(function (snapshot) {
        res.json({ status: 'true' });
    }).catch(function (error) {
        res.status(500).json({ status: false, error: error.message });
    });
}
export function get(req, res) {
    ref2.once('value')
        .then(function (snapshot) {
            console.log(snapshot);
            res.json(snapshot.val());
        }).catch(function (error) {
            res.status(500).json({ status: false, error: error.message });
        });
}