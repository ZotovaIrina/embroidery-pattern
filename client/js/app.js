
angular.module('embroidery-pattern', ['ui.router', 'ngResource', 'ngAnimate', 'ngFileUpload'])
    .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'template/home.html'
                    }
                }
            })
            .state('app.uploadImage', {
                url: 'uploadImage',
                views: {
                    'content@': {
                        templateUrl: 'template/upload.html',
                        controller: 'UploadController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);


