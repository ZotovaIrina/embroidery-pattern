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
                    imageParams.heightImage = parseInt(this.naturalHeight*0.9);
                    imageParams.widthImage = parseInt(this.naturalWidth*0.9);
                    imageParams.maxWidth = this.naturalWidth;
                    imageParams.maxHeigth = this.naturalHeight;
                    imageParams.proportion = this.naturalHeight / this.naturalWidth;
                    imageParams.numberOfColor = 20;
                     if(imageParams.maxWidth > 600) {
                         imageParams.maxWidth = 600;
                         imageParams.maxHeigth = imageParams.proportion * imageParams.maxWidth;
                         imageParams.widthImage = imageParams.maxWidth * 0.9;
                         imageParams.heightImage = imageParams.maxHeigth * 0.9;

                     }
                    scope.imageOnLoad({result: imageParams});
                });

            }
        };


    }]);
