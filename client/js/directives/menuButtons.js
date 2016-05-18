angular.module('embroidery-pattern')
    .directive('menuButtons', [function () {
        return {
            templateUrl: 'js/directives/menuButtons.html',
            replace: true
        };


    }]);