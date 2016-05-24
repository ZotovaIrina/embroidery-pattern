angular.module('embroidery-pattern')
    .controller('Navigation', ['$scope','$mdSidenav', '$mdMedia', function ($scope, $mdSidenav, $mdMedia) {
        'use strict';

        $scope.showMobileMainHeader = true;
        $scope.openSideNavPanel = function() {
            $mdSidenav('right').open();
        };
        $scope.closeSideNavPanel = function() {
            $mdSidenav('right').close();
        };
        $scope.$mdMedia = $mdMedia;


    }]);
