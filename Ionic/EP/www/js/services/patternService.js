angular.module('embroidery-pattern.services')

    .service('patternService', ['baseURL', '$http', function (baseURL, $http) {

        this.getFreePattern = function () {
            var patternJson = baseURL + '/public/freePattern/freePattern.json';
            return $http.get(patternJson)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
        };
        this.getListOfColor = function (URL) {
            console.log("url: ", URL);
            return $http.get(URL)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
        };
        this.getPattern = function (name) {
            var pattern = baseURL + '/public/freePattern/' + name +'.git';
            return $http.get(pattern)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
        };

    }]);
