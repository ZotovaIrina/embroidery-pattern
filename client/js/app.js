
angular.module('embroidery-pattern', ['ui.router', 'ngResource', 'ngAnimate', 'ngFileUpload', 'ui.bootstrap-slider', 'ngMaterial'])
    .constant("baseURL", "http://localhost:3000")
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
    function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('deep-purple', {
                'default': '400', // by default use shade 400
                'hue-1': '100', // light
                'hue-2': '50', // very light
                'hue-3': '900' // very dark
            })
            .accentPalette('green', {
                'default': 'A200', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // light
                'hue-2': '50', // very light
                'hue-3': '900' // very dark
            });
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'navigation': {
                        templateUrl: 'template/navigation.html',
                        controller: 'Navigation'
                    },
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
            })
            .state('app.freePattern', {
                url: 'freePattern',
                views: {
                    'content@': {
                        templateUrl: 'template/freePattern.html'
                    }
                }
            })
            .state('app.learn', {
                url: 'learn',
                views: {
                    'content@': {
                        templateUrl: 'template/learn.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);


