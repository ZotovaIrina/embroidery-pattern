angular.module('embroidery-pattern')
    .controller('Navigation', ['$scope', '$mdSidenav', '$mdMedia', '$mdDialog', '$cookies', 'userService', function ($scope, $mdSidenav, $mdMedia, $mdDialog, $cookies, userService) {
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

        //Modal window for register. $scope.showRegistration forms modal window and prefer data, controller for control active inside modal window. then - what happen when modal window will close
        // registerController function control form inside model window. $ watch look at screen size. If xs, then model window on the full screen
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
                            $cookies.put('x-access-token', response.token);
                        })
                        .catch(function (err) {
                            console.log("Error!!!!", err);
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Error!')
                                    .textContent(err.status + " " + err.data.message)
                                    .ariaLabel('Alert error')
                                    .ok('OK')
                            );
                        });

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
                    console.log('You said the information was:', user);
                    userService.logIn(user)
                        .then(function (response) {
                            console.log("get response: ", response);
                            $scope.loginSuccess = response.success;
                            $cookies.put('x-access-token', response.token);
                        }).catch(function (err) {
                            console.log("Error!!!!", err);
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Error!')
                                    .textContent(err.status + " " + err.data.err.message)
                                    .ariaLabel('Alert error')
                                    .ok('OK')
                            );
                        });
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
            $scope.login = function (user) {
                $mdDialog.hide(user);
            };
        }


        $scope.logOut = function (user) {
            userService.logOut(user)
                .then(function (response) {
                    console.log("get response: ", response);
                    $scope.registarationSuccess = !response.success;
                    $scope.loginSuccess = !response.success;
                    $scope.user = {};
                });
        };


    }]);
