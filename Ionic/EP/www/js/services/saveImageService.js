angular.module('embroidery-pattern')

    .service('saveImageService', ['baseURL', '$http', '$localStorage', '$q', function (baseURL, $http, $localStorage, $q) {

        this.getImage = function () {
            var URL = baseURL + '/images/';
            var token = $localStorage.get('x-access-token');
            if (!token){
                return $q.reject();
            } else {
                return $http.get(URL, {headers: {"x-access-token": token}})
                    .then(function (response) {
                        console.log(response.data[0].images);
                        return response.data[0].images;
                    });
            }
        };

        this.saveImage = function (image) {
            var URL = baseURL + '/images/';
            var token = $localStorage.get('x-access-token');
            return $http.post(URL, {_id: image}, {headers: {"x-access-token": token}})
                .then(function (response) {
                    console.log(response);
                });
        };


        this.deleteImage = function (image) {
            var URL = baseURL + '/images/' + image;
            var token = $localStorage.get('x-access-token');
            return $http.delete(URL, {headers: {"x-access-token": token}})
                .then(function (response) {
                    console.log(response);
                    return response.data.images;
                });
        };

    }]);
