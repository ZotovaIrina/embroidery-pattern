
angular.module('embroidery-pattern', ['ui.router', 'ngResource', 'ngAnimate', 'ngFileUpload'])
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


;
angular.module('embroidery-pattern')
    .controller('UploadController', ['$scope', 'Upload', '$timeout','$document', function ($scope, Upload, $timeout, $document) {
        'use strict';


        //watch canging in $scope.activeimage in order to disabled OK button
        $scope.$watch('picFile', function (newValue, oldValue) {

            if(newValue !== undefined) {
                console.log(newValue, oldValue);
                var elem = angular.element(document.getElementById('#workImage'));
                console.log(elem.style);
                //$scope.widthImage = document.getElementById(picFile).clientWidth;
                //$scope.heightImage = document.getElementById(picFile).clientheight;
            }
        });

        $scope.uploadPic = function (file) {
            console.log(file);
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {username: $scope.username, file: file}
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
    .directive('thumbnail', ['$window', function ($window) {
        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {
                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }
                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({width: width, height: height});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
                var params = scope.$eval(attributes.thumbnail);
                var canvas = element.find('canvas');
            }
        };
    }]);