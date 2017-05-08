'use strict';
// @flow
class _User {
  _id: string = '';
  name: string = '';
  email: string = '';
  role: string = '';
  $promise = undefined;
}

export function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
  'ngInject';
  var safeCb = Util.safeCb;
  var currentUser: _User = new _User();
  var userRoles = appConfig.userRoles || [];
  /**
   * Check if userRole is >= role
   * @param {String} userRole - role of current user
   * @param {String} role - role to check against
   */
  var hasRole = function(userRole, role) {
    return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
  };

  // if($cookies.get('token') && $location.path() !== '/logout') {
    // if($cookies.get('admi')){
    //   currentUser = $cookies.get('admi');
    // }else{
      // currentUser = $cookies.get('user');
    // }
  // }

  var Auth = {
    /**
     * Authenticate userAdmin and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    loginAdmin(user, callback: Function) {
      return $http.post('/auth/yunius/pe/login', user)
        .then(res => {
          console.log(res.data);
          $cookies.put('admi', JSON.stringify(res.data.datos));
          $cookies.put('isAdmi',true);
          currentUser = res.data;
          return currentUser;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
    },

    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    login(user, callback: Function) {
      return $http.post('/auth/yunius/cl/login', user)
        .then(res => {
          $cookies.put('user', JSON.stringify(res.data));
          $cookies.put('isAdmi',false);
          currentUser = res.data;
          return currentUser;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
    },

    /**
     * Delete access token and user info
     */
    logout() {
      $cookies.remove('user');
      $cookies.remove('admi');
      $cookies.remove('token');
      $cookies.remove('isAdmi');
      currentUser = new _User();
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - function(error, user)
     * @return {Promise}
     */
    createUser(user, callback?: Function) {
      return User.save(user,
        function(data) {
          $cookies.put('token', data.token);
          currentUser = User.get();
          return safeCb(callback)(null, user);
        },
        function(err) {
          Auth.logout();
          return safeCb(callback)(err);
        }).$promise;
    },

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - function(error, user)
     * @return {Promise}
     */
    changePassword(oldPassword, newPassword, callback?: Function) {
      return User.changePassword({ id: currentUser._id }, { oldPassword, newPassword }, function() {
        return safeCb(callback)(null);
      }, function(err) {
        return safeCb(callback)(err);
      }).$promise;
    },

    /**
     * Gets all available info on a user
     *
     * @param  {Function} [callback] - function(user)
     * @return {Promise}
     */
    getCurrentUser(callback?: Function) {
      var value = currentUser.hasOwnProperty('$promise')
        ? currentUser.$promise
        : currentUser;

      return $q.when(value)
        .then(user => {
          safeCb(callback)(user);
          return user;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Gets all available info on a user
     *
     * @return {Object}
     */
    getCurrentUserSync() {
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *
     * @return {Promise}
     */
    isLoggedIn() {
      return Auth.tieneAcceso();
    },

    /**
     * Check if a user is logged in
     *
     * @return {Bool}
     */
    isLoggedInSync() {
      return currentUser.hasOwnProperty('role');
    },

     /**
      * Check if a user has a specified role or higher
      *
      * @param  {String}     role     - the role to check against
      * @param  {Function} [callback] - function(has)
      * @return {Promise}
      */
    hasRole(role, callback?: Function) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          var has = user.hasOwnProperty('role')
            ? hasRole(user.role, role)
            : false;

          safeCb(callback)(has);
          return has;
        });
    },

    /**
      * Check if a user has a specified role or higher
      *
      * @param  {String} role - the role to check against
      * @return {Bool}
      */
    hasRoleSync(role) {
      return hasRole(currentUser.role, role);
    },

     /**
      * Check if a user is an admin
      *   (synchronous|asynchronous)
      *
      * @param  {Function|*} callback - optional, function(is)
      * @return {Bool|Promise}
      */
    isAdmin() {
      return Auth.getQ();
    },

     /**
      * Check if a user is an admin
      *
      * @return {Bool}
      */
    isAdminSync() {
      return Auth.hasRoleSync('admin');
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken() {
      return $cookies.get('token');
    },

    /**
     * Get admi
     *
     * @return {String} - el administrador
     */
    getAdmi() {
      try {
        return JSON.parse($cookies.get('admi'));  
      } catch (error) {
        return undefined;
      }
    },

    /**
     * Get user
     *
     * @return {String} - el usuario
     */
    getUser() {
      try {
        return JSON.parse($cookies.get('user'));  
      } catch (error) {
        return undefined
      }
      
    },

    /**
     * Get user
     *
     * @return {String} - el usuario
     */
    getQ() {
      return $cookies.get('isAdmi');
    },

    /**
     * Check if a user is logged in
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    isLoggedAsAdmi() {
        return ($cookies.get('admi')?true:false) && (Auth.getToken()?true:false);
    },

    /**
     * Set auth token
     *
     */
    setToken(token) {
      $cookies.put('token',token);
    },

    tieneAcceso(){
      if(Auth.getToken()!=undefined && Auth.getToken()!=null){
        return true;
      }
      return false;
    },
    /**
     * Set data
     *
     */
    setData(data) {
      $cookies.put('data',JSON.stringify(data));
    }
  };

  return Auth;
}
