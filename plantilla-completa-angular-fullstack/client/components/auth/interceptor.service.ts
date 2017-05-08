'use strict';

export function authInterceptor($rootScope, $q, $cookies, $location, Util, Tb) {
  'ngInject';

  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if (response.status === 401) {
        // remove any stale tokens
        $cookies.remove('token');
        $cookies.remove('user');
        $cookies.remove('admi');
        $cookies.remove('isAdmi');
        $location.path('/login');
        //TODO: Agregar lo del rootScope
        Tb.hideToolbar();
        $rootScope.show = Tb.getToolbar();
      }
      return $q.reject(response);
    }

    // Change token cache if in response exist token att
    /*response(response) {
        if(response.data.hasOwnProperty('token')){
            $cookies.put('token', response.data.token);
            delete response.data.token;
        }
        return response;
    }*/
  };
}
