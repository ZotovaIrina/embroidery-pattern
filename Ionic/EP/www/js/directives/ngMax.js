angular.module('embroidery-pattern')
  .directive('inputNgMax', function() {
  return {
    restrict : 'A',
    require : ['ngModel'],
    compile: function($element, $attr) {
      return function linkDateTimeSelect(scope, element, attrs, controllers) {
        var ngModelController = controllers[0];
        scope.$watch($attr.ngMax, function watchNgMax(value) {
          element.attr('max', value);
          ngModelController.$render();
        });
      };
    }
  };
});
