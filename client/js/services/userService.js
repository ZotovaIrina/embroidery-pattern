angular.module('embroidery-pattern')

    .service('userService', ['baseURL', '$http', '$q', '$cookies', function (baseURL, $http, $q, $cookies) {
        this.registration = function (newUser) {
            var URL = baseURL + '/users/register';
            console.log("service", newUser);
            return $http.post(URL, newUser)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return $q.reject(err);
                });
        };

        this.logIn = function (user) {
            var URL = baseURL + '/users/login';
            console.log("service", user);
            return $http.post(URL, user)
                .then(function (response) {
                    user = response.data;
                    return response.data;
                }, function (err) {
                    return $q.reject(err);
                });
        };
        this.logOut = function (user) {
            var URL = baseURL + '/users/logout';
            $cookies.remove('x-access-token');
            return $http.post(URL, user)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    $q.reject(err);
                });
        };

        this.getCurrentUser = function () {
            var token = $cookies.get('x-access-token'),
                URL = baseURL + '/users/login';
            if (token === undefined) {
                return  $q.reject("No token passed");
            } else {
                return $http.post(URL, {}, {headers: {"x-access-token": token} })
                    .then(function (response) {
                        console.log(response);
                        return response.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            }

        };


    }]);