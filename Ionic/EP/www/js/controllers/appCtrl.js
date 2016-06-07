angular.module('embroidery-pattern')


  .controller('AppCtrl', ['$scope', '$ionicModal', 'userService', 'messageService',
    function ($scope, $ionicModal, userService, messageService) {

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
          messageService.showAlert(title, message);
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
          messageService.showAlert(title, message);
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
