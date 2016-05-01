angular.module('embroidery-pattern')
    .directive('thumbnail', ['$window', function ($window) {
        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {
                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }
                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({width: width, height: height});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
                var params = scope.$eval(attributes.thumbnail);
                var canvas = element.find('canvas');
            }
        };
    }]);