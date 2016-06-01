
angular.module('embroidery-pattern', ['ui.router', 'ngResource', 'ngAnimate', 'ngFileUpload', 'ngMaterial', 'ngCookies'])
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
                        templateUrl: 'template/navigation.html',
                        controller: 'Navigation'
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
                        templateUrl: 'template/freePattern.html',
                        controller: 'FreePattern'
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
            })
            .state('app.patternForFree', {
                url: 'freePattern/:id',
                views: {
                    'content@': {
                        templateUrl: 'template/pattern.html',
                        controller: 'FreePattern'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);


;angular.module('embroidery-pattern')
    .controller('FreePattern', ['$scope', 'freePatternService', '$stateParams', '$mdMedia', function ($scope, freePatternService, $stateParams, $mdMedia) {
        'use strict';

        $scope.id = $stateParams.id;
        $scope.$mdMedia = $mdMedia;
        $scope.showColor = false;
        //this part contron app.freePattern page. For aa.freePattern/id we shouldn't get list of pattern we do else
        if ($scope.id === undefined) {
            $scope.listOfPatterns = "";
            freePatternService.getFreePattern()
                .then(function (response) {
                    $scope.listOfPatterns = response;
                });
        } else {
            $scope.listOfColors = "";
            freePatternService.getListOfColor($scope.id)
                .then(function (response) {
                    $scope.listOfColors = response;
                });
        }


        $scope.colorToggle = function () {
            $scope.showColor = !$scope.showColor;
        };









    }]);;angular.module('embroidery-pattern')
    .controller('Navigation', ['$scope', '$mdSidenav', '$mdMedia', '$mdDialog', 'userService', 'dialogWindow', function ($scope, $mdSidenav, $mdMedia, $mdDialog, userService, dialogWindow) {
        'use strict';

        $scope.showMobileMainHeader = true;
        $scope.openSideNavPanel = function () {
            $mdSidenav('right').open();
        };
        $scope.closeSideNavPanel = function () {
            $mdSidenav('right').close();
        };
        $scope.$mdMedia = $mdMedia;
        $scope.user = {};
        $scope.loginSuccess = false;

        //check user already log in
        userService.getCurrentUser()
            .then(function (response) {
                $scope.user = response.user;
                $scope.loginSuccess = response.success;
                console.log("user: ", $scope.user);
            });


        //Modal window for register. $scope.showRegistration forms modal window and prefer data, controller for control active inside modal window. then - what happen when modal window will close
        // registerController function control form inside model window.
        $scope.showRegistration = function (ev) {
            var templateUrl = 'template/register.html';
            dialogWindow.dialogShow($scope.user, templateUrl)
                .then(function (user) {
                    console.log('You said the information was: ', user);
                    userService.registration(user)
                        .then(function (response) {
                            $scope.loginSuccess = response.success;

                        })
                        .catch(function (err) {
                            var status = err.status,
                                message = err.data.message;
                            dialogWindow.alertShow(status, message);
                        });

                });
        };

        //Modal Window for log In
        $scope.showLogIn = function (ev) {
            var templateUrl = 'template/logIn.html';
            dialogWindow.dialogShow($scope.user, templateUrl)
                .then(function (user) {
                    console.log('You said the information was:', user);
                    userService.logIn(user)
                        .then(function (response) {
                            $scope.loginSuccess = response.success;
                        }).catch(function (err) {
                            var status = err.status,
                                message = err.data.message;
                            dialogWindow.alertShow(status, message);
                        });
                });

        };


        $scope.logOut = function (user) {
            userService.logOut(user)
                .then(function (response) {
                    $scope.loginSuccess = !response.success;
                    $scope.user = {};
                });
        };


    }]);
;angular.module('embroidery-pattern')
    .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', '$mdMedia', '$mdDialog', function ($scope, Upload, $timeout, baseURL, $mdMedia, $mdDialog) {
        'use strict';

        $scope.$mdMedia = $mdMedia;
        $scope.numberOfColor = 20;
        $scope.formShow = false;
        $scope.doNotLike = false;
        $scope.imageResult = false;

        $scope.imageLoaded = function(result){
            $scope.formShow = true;
            $scope.doNotLike = false;
            $scope.imageParams = result;
            $scope.$apply();
        };

        $scope.widthChange = function (newWidth) {
            $scope.imageParams.heightImage = parseInt($scope.imageParams.proportion * newWidth);
        };

        $scope.notLike = function() {
            $scope.imageResult = false;
            $scope.doNotLike = true;
            $scope.picFile.progress = 0;
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
                $scope.color = response.data.color;
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


        //Modal Window with list of color
        $scope.customFullscreen = $mdMedia('xs');
        $scope.showConfirm = function(ev) {
            var useFullScreen = $mdMedia('xs');
            console.log('$scope.color', $scope.color);
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'ctrl',
                templateUrl: 'template/colorList.html',
                locals: {
                    color: $scope.color
                },
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                    console.log('You said the information was "' + answer + '".');
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                    console.log('You cancelled the dialog.');
                });
            $scope.$watch(function() {
                return $mdMedia('xs');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        function DialogController($scope, $mdDialog, color) {
            $scope.listOfColors = color;
            $scope.testColor = $scope.listOfColors[0].name;
            console.log("color in controller", $scope.listOfColors);
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.save = function(answer) {
                console.log('save');
                $mdDialog.hide(answer);
            };
        }





    }]);;angular.module('embroidery-pattern')
    .directive('fit', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.fit = function () {
                    console.log('fit');
                    element.attr('style','width: 100%');
                };
            }
        };
    });;angular.module('embroidery-pattern')
    .directive('imageProcessing', [function () {

        return {
            restrict: 'A',
            scope: {
                imageOnLoad: '&'
            },
            link: function (scope, element, attrs) {
                element.bind("load", function (e) {
                    var imageParams = {};
                    console.log("load image");
                    // success, "onload" catched
                    // now we can do specific stuff:
                    imageParams.heightImage = parseInt(this.naturalHeight*0.9);
                    imageParams.widthImage = parseInt(this.naturalWidth*0.9);
                    imageParams.maxWidth = this.naturalWidth;
                    imageParams.maxHeigth = this.naturalHeight;
                    imageParams.proportion = this.naturalHeight / this.naturalWidth;
                    imageParams.numberOfColor = 20;
                    scope.imageOnLoad({result: imageParams});
                });

            }
        };


    }]);
;angular.module('embroidery-pattern')
    .directive('listOfColor', [function () {
        return {
            templateUrl: 'js/directives/listOfColor.html',
            replace: true
        };


    }]);;angular.module('embroidery-pattern')
    .directive('menuButtons', [function () {
        return {
            templateUrl: 'js/directives/menuButtons.html',
            replace: true
        };


    }]);;angular.module('embroidery-pattern')
    .directive('zoomIn', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.zoomIn= function() {
                console.log('Zoom in');
                var startHeight = element[0].clientHeight;
                //var startWidth = element[0].clientWidth;
                var height = parseInt(startHeight*1.2);
                //var width = parseInt(startWidth*1.2);
                console.log(element);
                console.log("startHeight", startHeight);
                console.log("height", height);
                element.attr('style','max-width: none; width: auto; height: '+ height + 'px;');
            };
        }
    };
});;angular.module('embroidery-pattern')
    .directive('zoomOut', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.zoomOut= function() {
                    console.log('Zoom out');
                    var startHeight = element[0].clientHeight;
                    //var startWidth = element[0].clientWidth;
                    var height = parseInt(startHeight/1.2);
                    //var width = parseInt(startWidth*1.2);
                    console.log(element);
                    console.log("startHeight", startHeight);
                    console.log("height", height);
                    element.attr('style','height: '+ height + 'px;');
                };
            }
        };
    });;angular.module('embroidery-pattern')

    .service('dialogWindow', ['baseURL', '$mdDialog', '$mdMedia', function (baseURL, $mdDialog, $mdMedia) {

        function logInController($scope, $mdDialog, user) {
            $scope.user = user;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.login = function (user) {
                $mdDialog.hide(user);
            };
        }

        this.dialogShow = function (user, templateUrl) {
            var useFullScreen = $mdMedia('xs');
             return $mdDialog.show({
                controller: logInController,
                controllerAs: 'ctrl',
                templateUrl: templateUrl,
                locals: {
                    user: user
                },
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        };

        this.alertShow = function (status, message) {
            return $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error!')
                    .textContent(status + " " + message)
                    .ariaLabel('Alert error')
                    .ok('OK')
            );
        };


    }]);;angular.module('embroidery-pattern')

    .service('freePatternService', ['baseURL', '$http', function (baseURL, $http) {

        this.getFreePattern = function () {
            var patternJson = baseURL + '/public/freePattern/freePattern.json';
            return $http.get(patternJson)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
        };
        this.getListOfColor = function (name) {
            var colorJson = baseURL + '/public/freePattern/' + name +'.json';
            return $http.get(colorJson)
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

    }]);;angular.module('embroidery-pattern')

    .service('userService', ['baseURL', '$http', '$q', '$cookies', function (baseURL, $http, $q, $cookies) {
        this.registration = function (newUser) {
            var URL = baseURL + '/users/register';
            console.log("service", newUser);
            return $http.post(URL, newUser)
                .then(function (response) {
                    $cookies.put('x-access-token', response.data.token);
                    return response.data;
                }, function (err) {
                    return $q.reject(err);
                });
        };

        this.logIn = function (user) {
            var URL = baseURL + '/users/login';
            console.log("service", user);
            return $http.post(URL, user)
                .then(function (response) {
                    $cookies.put('x-access-token', response.data.token);
                    user = response.data;
                    return response.data;
                }, function (err) {
                    return $q.reject(err);
                });
        };
        this.logOut = function (user) {
            var URL = baseURL + '/users/logout';
            $cookies.remove('x-access-token');
            return $http.post(URL, user)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    $q.reject(err);
                });
        };

        this.getCurrentUser = function () {
            var token = $cookies.get('x-access-token'),
                URL = baseURL + '/users/login';
            if (token === undefined) {
                return  $q.reject("No token passed");
            } else {
                return $http.post(URL, {}, {headers: {"x-access-token": token} })
                    .then(function (response) {
                        console.log(response);
                        return response.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            }

        };


    }]);