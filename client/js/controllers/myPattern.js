angular.module('embroidery-pattern')
    .controller('MyPattern', ['$scope', 'saveImageService', '$stateParams', '$mdMedia', 'dialogWindow', '$state', 'baseURL', 'patternService',
        function ($scope, saveImageService, $stateParams, $mdMedia, dialogWindow, $state, baseURL, patternService) {
        'use strict';

        $scope.id = $stateParams.id;
        $scope.$mdMedia = $mdMedia;
        $scope.images = {};
        //this part contron app.freePattern page. For aa.freePattern/id we shouldn't get list of pattern we do else
        if ($scope.id === undefined) {
            saveImageService.getImage()
            .then(function(response) {
                    console.log("get images");
                    $scope.images = response;
                    angular.forEach($scope.images, function(image, index) {
                        if (image === null) {
                            $scope.images.splice(index, 1);
                        }
                    });
                })
            .catch(function() {
                    dialogWindow.alertShow("Error!", "You must log in");
                    $state.go('app');
                });
        } else {
            $scope.address = "/public/images/temp_convert/";
            $scope.extension = "";
            var URL = baseURL + '/public/images/temp_convert/' + $scope.id +'.json';
            patternService.getListOfColor(URL)
                .then(function (response) {
                    $scope.listOfColors = response;
                });

        }


        $scope.deleteImage = function (image) {
            console.log("delete image: ", image);
            saveImageService.deleteImage(image)
            .then(function(response) {
                 console.log("delete");
                    $scope.images = response;
                    angular.forEach($scope.images, function(image, index) {
                        if (image === null) {
                            $scope.images.splice(index, 1);
                        }
                    });
                });


        };










    }]);