angular.module('embroidery-pattern')
    .controller('FreePattern', ['$scope','freePatternService', function ($scope, freePatternService) {
        'use strict';

        $scope.listOfPatterns="";

        freePatternService.getFreePattern()
            .then(function (response) {
                $scope.listOfPatterns = response;
                console.log($scope.listOfPatterns);
            });


    }]);