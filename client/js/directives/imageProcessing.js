angular.module('embroidery-pattern')
    .directive('imageProcessing', [function () {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                element.bind("load", function (e) {
                    console.log("load image");
                    // success, "onload" catched
                    // now we can do specific stuff:
                    scope.heightImage = this.naturalHeight;
                    scope.widthImage = this.naturalWidth;
                    scope.maxWidth = this.naturalWidth;
                    scope.maxHeigth = this.naturalHeight;
                    scope.proportion = this.naturalHeight / this.naturalWidth;
                    scope.formShow = true;
                    scope.$apply();
                });

            }
        };


    }]);
