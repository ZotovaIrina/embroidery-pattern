angular.module('embroidery-pattern')
    .directive('listOfColor', [function () {
        return {
            templateUrl: 'js/directives/listOfColor.html',
            replace: true
        };


    }]);