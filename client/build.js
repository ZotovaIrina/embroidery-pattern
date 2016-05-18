
angular.module('embroidery-pattern', ['ui.router', 'ngResource', 'ngAnimate', 'ngFileUpload', 'ui.bootstrap-slider', 'ngMaterial'])
    .constant("baseURL", "http://localhost:3000")
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
    function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('deep-purple', {
                'default': '400', // by default use shade 400
                'hue-1': '100', // light
                'hue-2': '50', // very light
                'hue-3': '900' // very dark
            })
            .accentPalette('green', {
                'default': 'A200', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // light
                'hue-2': '50', // very light
                'hue-3': '900' // very dark
            });
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'navigation': {
                        templateUrl: 'template/navigation.html'
                    },
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
            })
            .state('app.freePattern', {
                url: 'freePattern',
                views: {
                    'content@': {
                        templateUrl: 'template/freePattern.html'
                    }
                }
            })
            .state('app.learn', {
                url: 'learn',
                views: {
                    'content@': {
                        templateUrl: 'template/learn.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);


;angular.module('embroidery-pattern')
    .controller('navigation', ['$scope','$mdSidenav', '$mdMedia', function ($scope, $mdSidenav, $mdMedia) {
        'use strict';

        $scope.showMobileMainHeader = true;
        $scope.openSideNavPanel = function() {
            $mdSidenav('right').open();
        };
        $scope.closeSideNavPanel = function() {
            $mdSidenav('right').close();
        };
        $scope.$mdMedia = $mdMedia;


    }]);
;angular.module('embroidery-pattern')
    .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', function ($scope, Upload, $timeout, baseURL) {
        'use strict';

        $scope.widthImage = 0;
        $scope.heightImage = 0;
        $scope.maxWidth = 0;
        $scope.maxHeigth = 0;
        $scope.numberOfColor = 20;
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
                    numberOfColor: $scope.numberOfColor,
                    file: file
                }
            });

            file.upload.then(function (response) {
                console.log("response: ", response);
                console.log("path: ", response.data.file.path);
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
                    scope.heightImage = this.naturalHeight;
                    scope.widthImage = this.naturalWidth;
                    scope.maxWidth = this.naturalWidth;
                    scope.maxHeigth = this.naturalHeight;
                    scope.proportion = this.naturalHeight / this.naturalWidth;
                    scope.formShow = true;
                    scope.$apply();
                });

            }
        };


    }]);
;angular.module('embroidery-pattern')
    .directive('menuButtons', [function () {
        return {
            templateUrl: 'js/directives/menuButtons.html',
            replace: true
        };


    }]);