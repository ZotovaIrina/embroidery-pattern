angular.module('embroidery-pattern')
    .directive('fit', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.fit = function () {
                    console.log('fit');
                    var height = element[0].naturalHeight;
                    var width = element[0].naturalWidth;
                    console.log(element);
                    console.log("width", width);
                    element.attr('style', 'max-width: 100%; max-height: -webkit-calc(90vh - 64px); max-height: -moz-calc(90vh - 64px); max-height: calc(90vh - 64px); width: ' + width + 'px; height: ' + height + 'px;');
                };
            }
        };
    });