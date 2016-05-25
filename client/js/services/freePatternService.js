angular.module('embroidery-pattern')

    .service('textService', ['baseURL', '$http', function (baseURL, $http) {

        this.getFreePattern = function () {
            var patternJson = baseURL + 'public/freePattern/freePattern.json';
            return $http.get(patternJson)
                .then(function (responce) {
                    console.log(responce);
                    return responce.data;
                }, function (err) {
                    return err.data;
                });
        };

        this.setHtml = function (fileAddress, data) {

            return $http.put(fileAddress, data)
                .then(function (responce) {
                    return responce.data;
                })
                .catch(function (err) {
                    return err;
                });

        };


    }]);