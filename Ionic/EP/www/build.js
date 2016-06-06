// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in appCtrl.js

angular.module('embroidery-pattern', ['ionic', 'ngResource', 'ngAnimate', 'ngFileUpload', 'ngMaterial', 'ngCookies'])

  .constant("baseURL", "http://localhost:3000")
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'mainContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })

      .state('app.uploadImage', {
        url: '/uploadImage',
        views: {
          'mainContent': {
            templateUrl: 'templates/upload.html'
          }
        }
      })

      .state('app.freePattern', {
        url: '/freePattern',
        views: {
          'mainContent': {
            templateUrl: 'templates/freePattern.html',
            controller: 'FreePattern'
          }
        }
      })
      .state('app.myPattern', {
        url: '/myPattern',
        views: {
          'mainContent': {
            templateUrl: 'templates/myPattern.html'
          }
        }
      })

      .state('app.viewPattern', {
        url: '/myPattern/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/pattern.html'
          }
        }
      })
      .state('app.patternForFree', {
        url: '/freePattern/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/pattern.html'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });

;angular.module('embroidery-pattern')


  .controller('AppCtrl', ['$scope', '$ionicModal', 'userService', function ($scope, $ionicModal, userService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal

    // Create the login modal that we will use later
    $scope.user = {};
    userService.getCurrentUser()
      .then(function (response) {
        console.log("CurrentUser", response);
        $scope.user = response.user;
        $scope.loginSuccess = response.success;
        console.log("user: ", $scope.user);
      });

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalLogin = modal;
    });

    $ionicModal.fromTemplateUrl('templates/register.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalRegister = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modalLogin.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modalLogin.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.user);

      userService.logIn($scope.user)
        .then(function (response) {
          $scope.loginSuccess = response.success;
        }).catch(function (err) {
          var message = err.status + " " + err.data.message,
            title = "Error!";
          console.log(title, message);
        });


      $scope.modalLogin.hide();
    };

    $scope.registration = function () {
      console.log('registration');
      $scope.modalRegister.show();
    };

    $scope.doRegistration = function () {
      console.log('Doing registration', $scope.user);
      userService.registration($scope.user)
        .then(function (response) {
          console.log("registration controller: ", response);
          $scope.loginSuccess = response.success;

        })
        .catch(function (err) {
          var message = err.status + " " + err.data.message,
            title = "Error!";
          console.log(title, message);
        });
      $scope.modalRegister.hide();
    };

    $scope.closeRegistration = function () {
      $scope.modalRegister.hide();
      console.log('hide');
    };


    $scope.lodOut = function () {
      userService.logOut($scope.user)
        .then(function (response) {
          $scope.loginSuccess = !response.success;
          $scope.user = {};
        });
    };


  }]);
;angular.module('embroidery-pattern')
    .controller('FreePattern', ['$scope', 'patternService', '$stateParams', 'baseURL',
        function ($scope, patternService, $stateParams, baseURL) {
        'use strict';

        $scope.id = $stateParams.id;
          $scope.baseURL = baseURL;
        $scope.showColor = false;
        //this part contron app.freePattern page. For aa.freePattern/id we shouldn't get list of pattern we do else
        if ($scope.id === undefined) {
            $scope.listOfPatterns = "";
            patternService.getFreePattern()
                .then(function (response) {
                    $scope.listOfPatterns = response;
                });
        } else {
            $scope.listOfColors = "";
            $scope.address = "/public/freePattern/";
            $scope.extension = ".gif";
            var URL = baseURL + '/public/freePattern/' + $scope.id +'.json';
            patternService.getListOfColor(URL)
                .then(function (response) {
                    $scope.listOfColors = response;
                });
        }


        $scope.colorToggle = function () {
            $scope.showColor = !$scope.showColor;
        };









    }]);
;angular.module('embroidery-pattern')
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
;angular.module('embroidery-pattern')
  .controller('Navigation', ['$scope', '$ionicModal', 'userService', 'dialogWindow', function ($scope, $ionicModal, userService, dialogWindow) {
    'use strict';
    console.log('navigation');
    $scope.user = {};
    $scope.loginSuccess = false;

    //check user already log in
    userService.getCurrentUser()
      .then(function (response) {
        console.log("CurrentUser", response);
        $scope.user = response.user;
        $scope.loginSuccess = response.success;
        console.log("user: ", $scope.user);
      });

    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.close = function() {
      $scope.modal.hide();
    };


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
              var message = err.status + " " + err.data.message,
                title = "Error!";
              dialogWindow.alertShow(title, message);
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
              var message = err.status + " " + err.data.message,
                title = "Error!";
              dialogWindow.alertShow(title, message);
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
    .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', '$mdMedia', '$mdDialog', 'saveImageService', 'dialogWindow',
        function ($scope, Upload, $timeout, baseURL, $mdMedia, $mdDialog, saveImageService, dialogWindow) {
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

        $scope.save = function() {
            console.log("save", $scope.imageResultUrl);
            saveImageService.saveImage($scope.imageResultUrl)
            .then(function () {
                    dialogWindow.alertShow("Save", "Pattern saved");
                })
                .catch(function (err) {
                    var message = err.status + " " + err.data.message,
                        title = "Error!";
                    dialogWindow.alertShow(title, message);
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





    }]);
;angular.module('embroidery-pattern')
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
;angular.module('embroidery-pattern')

    .service('saveImageService', ['baseURL', '$http', '$cookies', '$q', function (baseURL, $http, $cookies, $q) {

        this.getImage = function () {
            var URL = baseURL + '/images/';
            var token = $cookies.get('x-access-token');
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
            var token = $cookies.get('x-access-token');
            return $http.post(URL, {_id: image}, {headers: {"x-access-token": token}})
                .then(function (response) {
                    console.log(response);
                });
        };


        this.deleteImage = function (image) {
            var URL = baseURL + '/images/' + image;
            var token = $cookies.get('x-access-token');
            return $http.delete(URL, {headers: {"x-access-token": token}})
                .then(function (response) {
                    console.log(response);
                    return response.data.images;
                });
        };

    }]);
;angular.module('embroidery-pattern')

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
