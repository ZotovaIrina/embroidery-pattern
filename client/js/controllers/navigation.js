angular.module('embroidery-pattern')
    .controller('Navigation', ['$scope', '$mdSidenav', '$mdMedia', '$mdDialog', 'userService', function ($scope, $mdSidenav, $mdMedia, $mdDialog, userService) {
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
        $scope.user = {};
        $scope.registarationSuccess = false;
        $scope.loginSuccess = false;


        $scope.customFullscreen = $mdMedia('xs');

        //Modal window for register
        $scope.showRegistration = function (ev) {
            var useFullScreen = $mdMedia('xs');
            $mdDialog.show({
                controller: registerController,
                controllerAs: 'ctrl',
                templateUrl: 'template/register.html',
                locals: {
                    user: $scope.user
                },
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function (user) {
                    console.log('You said the information was: ', user);
                    userService.registration(user)
                        .then(function (response) {
                            console.log("get response: ", response);
                            $scope.registarationSuccess = response.success;
                        });

                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                    console.log('You cancelled the dialog.');
                });


            $scope.$watch(function () {
                return $mdMedia('xs');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        //Modal Window for log In
        $scope.showLogIn = function (ev) {
            var useFullScreen = $mdMedia('xs');
            $mdDialog.show({
                controller: logInController,
                controllerAs: 'ctrl',
                templateUrl: 'template/logIn.html',
                locals: {
                    user: $scope.user
                },
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function (user) {
                    console.log('You said the information was "' + user + '".');
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                    console.log('You cancelled the dialog.');
                });
            $scope.$watch(function () {
                return $mdMedia('xs');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        function registerController($scope, $mdDialog, user) {
            console.log("user", user);
            $scope.user = user;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.registration = function (user) {
                console.log('registration');
                $mdDialog.hide(user);
            };
        }

        function logInController($scope, $mdDialog, user) {
            $scope.user = user;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.save = function (answer) {
                console.log('save');
                $mdDialog.hide(answer);
            };
        }


    }]);
