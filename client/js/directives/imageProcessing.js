angular.module('embroidery-pattern')
    .directive('imageProcessing', [function () {

        return {
            restrict: 'A',
            scope: {
                imageOnLoad: '&'
            },
            link: function (scope, element, attrs) {
                element.bind("load", function (e) {
                    var imageParams = {};
                    console.log("load image");
                    // success, "onload" catched
                    // now we can do specific stuff:
                    imageParams.heightImage = this.naturalHeight;
                    imageParams.widthImage = this.naturalWidth;
                    imageParams.maxWidth = this.naturalWidth;
                    imageParams.maxHeigth = this.naturalHeight;
                    imageParams.proportion = this.naturalHeight / this.naturalWidth;
                    scope.imageOnLoad({result: imageParams});
                });

            }
        };


    }]);
