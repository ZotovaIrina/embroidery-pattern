angular.module('embroidery-pattern')
  .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', 'saveImageService', '$ionicModal', 'messageService', '$ionicPlatform', '$cordovaCamera',
    function ($scope, Upload, $timeout, baseURL, saveImageService, $ionicModal, messageService, $ionicPlatform, $cordovaCamera) {
      'use strict';

      $scope.baseURL = baseURL;
      $scope.numberOfColor = 20;
      $scope.formShow = false;
      $scope.doNotLike = false;
      $scope.imageResult = false;

      $scope.imageLoaded = function (result) {
        $scope.formShow = true;
        $scope.doNotLike = false;
        $scope.imageParams = result;
        $scope.$apply();
      };

      $scope.widthChange = function (newWidth) {
        $scope.imageParams.heightImage = parseInt($scope.imageParams.proportion * newWidth);
      };

      $scope.notLike = function () {
        $scope.imageResult = false;
        $scope.doNotLike = true;
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
          $scope.listOfColors = response.data.color;
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

      $scope.save = function () {
        console.log("save", $scope.imageResultUrl);
        saveImageService.saveImage($scope.imageResultUrl)
          .then(function () {
            messageService.showAlert("Save", "Pattern saved");
          })
          .catch(function (err) {
            var message = err.status + " log in, please",
              title = "Error!";
            console.log(title, message);
            messageService.showAlert(title, message);
          });


      };

      $ionicModal.fromTemplateUrl('templates/colorList.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modalColor = modal;
      });
      //Modal Window with list of color
      $scope.showConfirm = function () {
        console.log("color ", $scope.listOfColors);
        $scope.modalColor.show();
      };

      $scope.closeColor = function () {
        $scope.modalColor.hide();
      };


      $ionicPlatform.ready(function() {
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };
        $scope.takePicture = function() {
          $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.cameraImageSrc = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            console.log(err);
          });

        };
      });







    }])

  ;
