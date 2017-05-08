'use strict';

import firebase from 'firebase';

var db = firebase.database();
var ref = db.ref('isaac');
var crer = db.ref('credito');
var solref = db.ref('solicitud');

/**
 *     {
 *          'nombre':'Isaac Lopez',
 *          'profecion':'Developer'
 *      }
 * 
 * set---
 * {
 *  'isaac':{
 *          'nombre':'Isaac Lopez',
 *          'profecion':'Developer'
 *      }
 * }
 * push---
 * {
 *  'isaac':{
 *      'asdf76asdf78sdf':{
 *          'nombre':'Isaac Lopez',
 *          'profecion':'Developer'
 *        },
 *      'sdfgsdfg76':{}
 *   }
 * }
 */

export function add(req, res){
    ref.push(req.body)
    .then(function(snapshot){
        res.json({status:true});
    }).catch(function(error){
        res.status(500).json({status:false,error:error.message});
    });
}

export function get(req, res){
    ref.once('value')
    .then(function(snapshot){
        res.json(snapshot.val());
    }).catch(function(error){
        res.status(500).json({status:false,error:error.message});
    });
}

export function creditos(req, res){
    crer.once('value')
    .then(function(snapshot){
        var arr = [];
        snapshot.forEach(function(item) {
            var child = item.val();
            child.idCredito = item.key;
            arr.push(child);
        });
        res.json(arr);
    }).catch(function(error){
        res.status(500).json({status:false,error:error.message});
    });
}

export function addSolicitud(req,res){
    solref.push(req.body).then(function(snapshot){
        res.json({status: 'true'});
    }).catch(function(error){
        res.status(500).json({status: false, error: error.message});
    });
    
}