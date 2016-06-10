angular.module('embroidery-pattern')

  .factory('$localStorage', ['$window', function ($window) {
    return {
      store: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key) {
        return $window.localStorage[key];
      },
      put: function (key, value) {
        return $window.localStorage.setItem(key, value);
      },
      storeObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      },
      destroy: function (key) {
        return localStorage.removeItem(key);
      }
    };
  }]);
