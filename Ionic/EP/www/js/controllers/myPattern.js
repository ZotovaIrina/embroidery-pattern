angular.module('embroidery-pattern')
  .controller('MyPattern', ['$scope', 'saveImageService', '$stateParams', '$state', 'baseURL', 'patternService', 'messageService',
    function ($scope, saveImageService, $stateParams, $state, baseURL, patternService, messageService) {
      'use strict';

      $scope.id = $stateParams.id;
      $scope.address = baseURL + "/public/images/temp_convert/";
      $scope.srcImage = $scope.address + $scope.id;
      $scope.images = {};
      //this part contron app.freePattern page. For aa.freePattern/id we shouldn't get list of pattern we do else
      if ($scope.id === undefined) {
        saveImageService.getImage()
          .then(function (response) {
            console.log("get images");
            $scope.images = response;
            angular.forEach($scope.images, function (image, index) {
              if (image === null) {
                $scope.images.splice(index, 1);
              }
            });
          })
          .catch(function () {
            messageService.showAlert("Error!", "You must log in");
            $state.go('app.home');
          });
      } else {
        $scope.extension = "";
        var URL = $scope.address + $scope.id + '.json';
        patternService.getListOfColor(URL)
          .then(function (response) {
            $scope.listOfColors = response;
          });

      }


      $scope.colorToggle = function () {
        $scope.showColor = !$scope.showColor;
      };

      $scope.deleteImage = function (image) {
        console.log("delete image: ", image);
        saveImageService.deleteImage(image)
          .then(function (response) {
            console.log("delete");
            $scope.images = response;
            angular.forEach($scope.images, function (image, index) {
              if (image === null) {
                $scope.images.splice(index, 1);
              }
            });
          });


      };


    }]);
