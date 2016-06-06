angular.module('embroidery-pattern')
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
