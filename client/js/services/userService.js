angular.module('embroidery-pattern')

    .service('userService', ['baseURL', '$http', function (baseURL, $http) {

        this.registration = function (newUser) {
            var URL = baseURL + '/users/register';
            console.log("service", newUser);
            return $http.post(URL, newUser)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
        };

    }]);