angular.module('embroidery-pattern.controllers')
    .controller('FreePattern', ['$scope', 'patternService', '$stateParams', 'baseURL',
        function ($scope, patternService, $stateParams, baseURL) {
        'use strict';

        $scope.id = $stateParams.id;
          console.log("$scope.id", $scope.id);
        $scope.showColor = false;
        //this part contron app.freePattern page. For aa.freePattern/id we shouldn't get list of pattern we do else
        if ($scope.id === undefined) {
            $scope.listOfPatterns = "";
            patternService.getFreePattern()
                .then(function (response) {
                    $scope.listOfPatterns = response;
                console.log("listOfPatterns", $scope.listOfPatterns);
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
