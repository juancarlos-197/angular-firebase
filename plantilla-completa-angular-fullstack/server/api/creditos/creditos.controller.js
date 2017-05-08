'use strict'

import firebase from 'firebase';


var db = firebase.database();
var crer=db.ref('credito');



export function creditos(req,res){
    crer.orderByChild('max').endAt(req.body.max).once('value')
    .then(function(snapshot){
        var arr = [];
        snapshot.forEach(function(item){
            var child = item.val();
            child.id=item.key;
            if( child.min>=req.body.min ){
                arr.push(child);
            }
        });
        res.json(arr);
    }).catch(function(error){
        res.status(500).json({status:false,error:error.message});
    });
}