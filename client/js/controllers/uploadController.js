angular.module('embroidery-pattern')
    .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', '$mdMedia', function ($scope, Upload, $timeout, baseURL, $mdMedia) {
        'use strict';

        $scope.$mdMedia = $mdMedia;
        $scope.numberOfColor = 20;
        $scope.formShow = false;
        $scope.imageResult = false;
        $scope.uploadProgress = false;

        $scope.imageLoaded = function(result){
            $scope.formShow = true;
            $scope.imageParams = result;
            $scope.$apply();
        };

        $scope.widthChange = function (newWidth) {
            if(newWidth < 5 || undefined){
                console.log("wrong!!!");
                $scope.imageParams.widthImage = 5;
            }
            $scope.imageParams.heightImage = parseInt($scope.imageParams.proportion * newWidth);
        };

        $scope.numberChange = function(value) {
            if(value < 2 || undefined){
                console.log("wrong!!!");
                $scope.numberOfColor = 2;
            }
            if(value > 200 || undefined){
                console.log("wrong!!!");
                $scope.numberOfColor = 200;
            }
        };

        $scope.uploadPic = function (file) {
            var data = angular.extend({
                file: file,
                numberOfColor: $scope.numberOfColor
            }, $scope.imageParams);
            console.log(data);
            file.upload = Upload.upload({
                url: baseURL + '/upload',
                data: data
            });

            file.upload.then(function (response) {
                $scope.imageResult = true;
                $scope.imageResultUrl = response.data.fileName;
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