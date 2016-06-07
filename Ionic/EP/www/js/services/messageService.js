angular.module('embroidery-pattern')

  .service('messageService', ['$ionicModal', '$ionicPopup', function ($ionicModal, $ionicPopup) {

    this.showAlert = function (title, message) {
      return  $ionicPopup.alert({
        title: title,
        template: message
      });
    };


  }]);
