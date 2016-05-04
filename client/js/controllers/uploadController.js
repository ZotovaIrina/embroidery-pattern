angular.module('embroidery-pattern')
    .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', function ($scope, Upload, $timeout, baseURL) {
        'use strict';

        $scope.widthImage = 0;
        $scope.heightImage = 0;
        $scope.maxWidth = 0;
        $scope.maxHeigth = 0;
        $scope.formShow = false;


        $scope.widthChange = function(){
            $scope.heightImage = parseInt($scope.proportion * $scope.widthImage);
        };

        $scope.heightChange = function(){
            $scope.widthImage = parseInt($scope.heightImage / $scope.proportion);
        };

        $scope.uploadPic = function (file) {
            console.log(file);
            file.upload = Upload.upload({
                url: baseURL + '/upload',
                data: {
                    widthImage: $scope.widthImage,
                    heightImage: $scope.heightImage,
                    file: file
                }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };


    }]);