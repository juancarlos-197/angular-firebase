'use strict';
const firebase = require('firebase');
import Base from '../../../components/object/base/Base';

export default class LoginController extends Base{

  private Auth:any;
  private $location:any;
  public user:any;
  private $http:any;
  private login:any;


  /*@ngInject*/
  constructor($rootScope, $http, $location, Auth, Tb) {
    super($rootScope,Tb);
    this.Auth = Auth;
    this.$location = $location;
    this.$http = $http;
    if(this.Auth.isLoggedIn()){
      this._$rootScope.auth = true;
      this.$location.path('/');
      // this._$rootScope.rol = this.Auth.getData().role;
    }
  }

  public inicio() {
    if(this.login.$valid){
      firebase.auth().signInWithEmailAndPassword(this.user.correo, this.user.contrasena).then(function(){
        this._$rootScope.auth = true;
        var user:any = firebase.auth().currentUser;
        if (user) {
          console.log(user);
          this.Auth.setToken(user._lat);
          this.$http.post('/api/user/get').then(function(res){
            if(res.data.hasOwnProperty('satus')){
              this.Auth.logout();
              this._$rootScope.auth = false;
            }else{
              this.Auth.setData(res.data);
              this.$location.path('/');
            }
          }.bind(this)).catch(function(err){
              this.Auth.logout();
              this._$rootScope.auth = false;
            console.log(err);
          }.bind(this));
        } else {
          // No user is signed in.
        }
      }.bind(this)).catch(function(error:any) {
        var errorCode = error.code;
        if(errorCode==='auth/invalid-email'){
          //Invalid Email
        }else if(errorCode==='auth/user-disabled'){
          //User disabled
        }else if(errorCode==='auth/user-not-found'){
          //Not found
        }else if(errorCode==='auth/wrong-password'){
          //Invalid Pasword
        }
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
    }
  }
}
