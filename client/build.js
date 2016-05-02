
angular.module('embroidery-pattern', ['ui.router', 'ngResource', 'ngAnimate', 'ngFileUpload'])
    .constant("baseURL", "http://localhost:3000")
    .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'template/home.html'
                    }
                }
            })
            .state('app.uploadImage', {
                url: 'uploadImage',
                views: {
                    'content@': {
                        templateUrl: 'template/upload.html',
                        controller: 'UploadController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);


;angular.module('embroidery-pattern')
    .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', function ($scope, Upload, $timeout, baseURL) {
        'use strict';

        $scope.widthImage = 0;
        $scope.heightImage = 0;
        $scope.maxWidth = 0;
        $scope.maxheigth = 0;
        $scope.formShow = true;

        $scope.widthChange = function(){
            console.log("widthChange");
            $scope.heightImage = $scope.proportion * $scope.widthImage;
        };

        $scope.heightChange = function(){
            console.log("heightChange");
            $scope.widthImage = $scope.heightImage / $scope.proportion;
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


    }]);;angular.module('embroidery-pattern')
    .directive('imageProcessing', [function () {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                element.bind("load", function (e) {
                    console.log("load image");
                    // success, "onload" catched
                    // now we can do specific stuff:
                    console.log(this.naturalHeight);
                    scope.heightImage = this.naturalHeight;
                    scope.widthImage = this.naturalWidth;
                    scope.maxWidth = this.naturalWidth;
                    scope.maxheigth = this.naturalHeight;
                    scope.proportion = this.naturalHeight / this.naturalWidth;
                    console.log(scope.proportion);
                    scope.$apply();
                });

            }
        };


    }]);


//var image;
//element.on("load", function () {
//    angular.element(this).attr("src", baseResourceURL + "/404error.jpg");
//    angular.element(this).attr("style", "left: 0;");
//    //modelObject is a scope property of the parent/current scope
//    image.error = true;
//    scope.$apply();
//    console.log(image);
//});
//scope.$watch(attrs.errorSrc, function(value){
//    image = value;
//});