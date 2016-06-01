angular.module('embroidery-pattern')

    .service('dialogWindow', ['baseURL', '$mdDialog', '$mdMedia', function (baseURL, $mdDialog, $mdMedia) {

        function logInController($scope, $mdDialog, user) {
            $scope.user = user;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.login = function (user) {
                $mdDialog.hide(user);
            };
        }

        this.dialogShow = function (user, templateUrl) {
            var useFullScreen = $mdMedia('xs');
             return $mdDialog.show({
                controller: logInController,
                controllerAs: 'ctrl',
                templateUrl: templateUrl,
                locals: {
                    user: user
                },
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        };

        this.alertShow = function (status, message) {
            return $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error!')
                    .textContent(status + " " + message)
                    .ariaLabel('Alert error')
                    .ok('OK')
            );
        };


    }]);