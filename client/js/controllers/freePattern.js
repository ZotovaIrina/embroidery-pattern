angular.module('embroidery-pattern')
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









    }]);