angular.module('embroidery-pattern')
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
