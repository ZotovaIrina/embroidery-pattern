angular.module('embroidery-pattern')
    .directive('zoomIn', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.zoomIn= function() {
                console.log('Zoom in');
                var startHeight = element[0].clientHeight;
                //var startWidth = element[0].clientWidth;
                var height = parseInt(startHeight*1.2);
                //var width = parseInt(startWidth*1.2);
                console.log(element);
                console.log("startHeight", startHeight);
                console.log("height", height);
                element.attr('style','height: '+ height + 'px;');
            };
        }
    };
});