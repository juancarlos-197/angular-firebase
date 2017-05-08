'use strict';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import firebase from 'firebase';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

var auth = firebase.auth();
// Get a database reference to our posts
var db = firebase.database();
var ref = db.ref('user');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      var token = "";
      if (req.query && req.query.hasOwnProperty('access_token')) {
        token = req.query.access_token;
      }else if(req.headers.authorization){
        token = req.headers.authorization;
      }else{
        console.log('hola---------');
        return res.status(401).end();
      }
      console.log(req.headers);
      auth.verifyIdToken(token).then(function(decodedToken) {
        req.user = decodedToken;
        next();
      }).catch(function(error){
        console.log(error);
        res.json({satus:false,error:error,head:true});
      });

    })
    // Attach user to request
    .use(function(req, res, next) {
      console.log('1.-',req.user);
      ref.child(req.user.uid)
      .once('value').then(function(data){
        if(data.val() !== null){
          req.user = data.val();
          req.user.key = data.key;
          req.user.data = true;
          req.user.role = 'u';
        }
        console.log('2.-',req.user);
        next();
      }).catch(function(error){
        res.json({status:false,error:error});
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if(!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        return next();
      } else {
        return res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if(!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}
