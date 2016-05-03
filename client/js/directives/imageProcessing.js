angular.module('embroidery-pattern')
    .directive('imageProcessing', [function () {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                element.bind("load", function (e) {
                    console.log("load image");
                    // success, "onload" catched
                    // now we can do specific stuff:
                    console.log(this.naturalHeight);
                    scope.heightImage = this.naturalHeight;
                    scope.widthImage = this.naturalWidth;
                    scope.maxWidth = this.naturalWidth;
                    scope.maxHeigth = this.naturalHeight;
                    scope.proportion = this.naturalHeight / this.naturalWidth;
                    console.log(scope.proportion);
                    scope.$apply();
                });

            }
        };


    }]);


//var image;
//element.on("load", function () {
//    angular.element(this).attr("src", baseResourceURL + "/404error.jpg");
//    angular.element(this).attr("style", "left: 0;");
//    //modelObject is a scope property of the parent/current scope
//    image.error = true;
//    scope.$apply();
//    console.log(image);
//});
//scope.$watch(attrs.errorSrc, function(value){
//    image = value;
//});