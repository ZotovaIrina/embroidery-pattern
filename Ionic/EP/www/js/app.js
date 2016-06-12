// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in appCtrl.js

angular.module('embroidery-pattern', ['ionic', 'ngCordova', 'ngResource', 'ngAnimate', 'ngFileUpload', 'ngMaterial', 'ngCookies'])

  .constant("baseURL", "https://embroidery-pattern.herokuapp.com")
  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      $timeout(function(){
        $cordovaSplashscreen.hide();
      },8000);
    });

    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading ...'
      });
    });

    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
      console.log('Loading ...');
      $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      console.log('done');
      $rootScope.$broadcast('loading:hide');
    });


  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'mainContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })

      .state('app.uploadImage', {
        url: '/uploadImage',
        views: {
          'mainContent': {
            templateUrl: 'templates/upload.html',
            controller: 'UploadController'
          }
        }
      })

      .state('app.freePattern', {
        url: '/freePattern',
        views: {
          'mainContent': {
            templateUrl: 'templates/freePattern.html',
            controller: 'FreePattern'
          }
        }
      })
      .state('app.myPattern', {
        url: '/myPattern',
        views: {
          'mainContent': {
            templateUrl: 'templates/myPattern.html',
            controller: 'MyPattern'
          }
        }
      })

      .state('app.viewPattern', {
        url: '/myPattern/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/pattern.html',
            controller: 'MyPattern'
          }
        }
      })
      .state('app.patternForFree', {
        url: '/freePattern/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/pattern.html',
            controller: 'FreePattern'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });

