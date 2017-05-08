'use strict';

/*import * as admin from "firebase-admin";

var db = admin.database();
var ref = db.ref('encuestas');*/
import firebase from 'firebase';

var db = firebase.database();
var ref = db.ref('encuestas');

export function manzana(req, res) {
    return res.json({ color: "Rojo", peso: "0.1" });
}

export default function naranja(req, res) {
    return res.json({ color: "Naranja", peso: "0.15" });
}

// Creates a new Encuesta in the DB
/*export function create(req, res) {
    ref.push().set(req.body)
        .then(function() {
            res.json({ status: true });
        }).catch(function(error) {
            res.json({ status: false, error: error });
        });
}*/

export function hola(req, res){
   /* ref.push().set(req.body)
  .then(function(){
      console.log('hola');
   //res.json({status:true});
  }).catch(function(error){
      console.log('hola'+error);
    //res.json({status:false, error:error});
  });*/
  
     
    console.error(ref.push(req.body,function(error) {
            console.log('hola 1');
        if (error) {
            console.log('hola'+error);
            //return res.json({ status: false, error: error });
        } else {
            console.log('hola');
            //return res.json({ status: true });
        }
    }));
    res.json({});
}