
angular.module('embroidery-pattern', ['ui.router', 'ngResource', 'ngAnimate', 'ngFileUpload', 'ui.bootstrap-slider'])
    .constant("baseURL", "http://localhost:3000")
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
            .state('app.color', {
                url: 'color',
                views: {
                    'content@': {
                        templateUrl: 'template/color.html',
                        controller: 'color'
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


;angular.module('embroidery-pattern')
    .controller('color', ['$scope', function ($scope) {
        'use strict';

        $scope.colors = ["#811024","#bd2e2e","#f9d6dd","#fbe2df","#190f60","#e2dfd3","#124477","#3b6292","#366390","#5a82a2","#b4d3e3","#cae2eb","#6f5422","#806c26","#957b2f","#b19a3f","#bfa43a","#cab751","#573c2a","#684e37","#977e65","#b39f8c","#cdb9a4","#6c6e58","#775820","#8ea7c0","#181f66","#2c4180","#445997","#6e8db5","#c1d3df","#63461f","#437490","#70a8b3","#6c91c0","#91b4ce","#711f2e","#9d3030","#f4c4c1","#e9e9eb","#f3f6d4","#ceddea","#eeaeb0","#8a373b","#ddb3b1","#6d5748","#936626","#ba8225","#b38132","#d19d2f","#161151","#7971a0","#686d8d","#d1c66d","#d9c38f","#e5dab2","#ff7600","#f69726","#ffc33a","#ffda5a","#ffe276","#ffeda9","#f5f0df","#d3e9e7","#efc1aa","#eac0b4","#e29690","#ec6810","#e4752b","#faa463","#fad558","#ffe35f","#feee89","#ecbf3b","#cc993d","#746d2b","#837d2f","#91852a","#a6a036","#fefefe","#e9e9d4","#ffffff","#abafa3","#babfad","#d12627","#eed7a1","#ede0ba","#af8334","#015731","#2e9148","#007a3f","#59a052","#81b85e","#bad765","#e1e1d9","#9f2d6f","#9f3845","#f2bcc5","#cfa296","#debcd9","#4d2e3d","#908bc3","#8b9ac5","#abc2de","#465082","#a7b4cd","#8290ae","#667594","#bddbe6","#569571","#9fcc8d","#dad878","#bfbb20","#9f8447","#b4c3c1","#8b9a94","#9870ac","#b693b6","#c9afdd","#d4c3e4","#884238","#bb817b","#dfb3a6","#ecd9cf","#784e24","#aa6730","#9e3332","#f6e311","#b84351","#000000","#30506f","#386189","#8e5d5c","#bf889c","#697275","#a0a7b0","#35633d","#71a072","#ce1f32","#647e9d","#a92332","#723657","#6c5086","#4c698c","#e56d7f","#0c1225","#9389c1","#a2accd","#bf3e31","#c24731","#e46647","#f78465","#f69d80","#fdbca1","#9a3b2d","#a06757","#4c7047","#91ab84","#ccdcbe","#bbaa55","#a08f4d","#9c8c4a","#934d29","#e8a76d","#c49a87","#535657","#95909d","#d3d4db","#866226","#d0ba79","#775437","#b78237","#c4863a","#c09557","#d9b879","#f5d500","#f0ed85","#978b81","#bbaea6","#e3dcdb","#798738","#98a859","#929937","#dee077","#98232c","#14361e","#496f5c","#799a83","#8ebea9","#d1e2d7","#418253","#166d92","#6b9cb9","#a8c6d8","#4f6035","#93a181","#a5a888","#bec0a8","#504f50","#f0e3d4","#541244","#7b3f6c","#a772a4","#ae99b1","#377557","#599b6d","#87c39e","#9cd0ab","#68772d","#9fa146","#70aeb4","#97ccca","#bf1c48","#d34067","#ca0b51","#ef7ba1","#ec9ab9","#faccdb","#ea592c","#f06e46","#806638","#9e9072","#917d4a","#bcae83","#8c593e","#938962","#bab599","#d6d3c1","#747e65","#97978e","#043810","#ef4949","#f85b64","#fc6a84","#f999a5","#29542f","#502f1b","#ee8593","#d45d28","#6b3b33","#4f6c33","#759a3e","#82ae44","#a9c33e","#00793b","#008c4c","#40a756","#58a96b","#88c78d","#800137","#832a58","#8c3b1a","#9b3b1b","#a74f2a","#c36b29","#d6834d","#42605c","#789899","#c5d2cf","#e5eae9","#435e67","#678997","#8faeb9","#4d4c34","#4b5035","#5d5c2b","#4f5925","#3b2811","#02101c","#009a7b","#e3be8e","#e15729","#f26922","#feebe2","#e7ceb9","#f2e0ce","#abd58b","#b4e8b3","#ff7a90","#f9afb7","#51c0bb","#8fd3d4","#df6877","#f08d9f","#fad0d5","#9cd3cc","#bbd7ae","#fbdbcd","#ff781e","#fc7e0c","#ffb401","#ffe21a","#945c2d","#e6973f","#e59034","#1f561f","#568357","#76996c","#87a462","#176a59","#6cbfa8","#8ec2b3","#0064b0","#57baf5",null,"#635f2f","#9b9648","#999c6c","#3b2e08","#938e6e","#b2ae95","#dcdcd7","#442e10","#ada183","#d7d0c2","#966e6e","#ccc1d0","#b19563","#ccbc7d","#ececd2","#6d6f42","#899770","#bac28b","#cda072","#e3e6dc","#fff3ad","#c6d3e1","#f7b4b7","#c36154","#f38351","#fbbe9d","#486131","#6a823d","#78983b","#e3ee9f","#b95569","#e3a5aa","#2e3d1a","#72885f","#85905c","#2d1705","#b34e8c","#c07ba3","#e9afd3","#7d3248","#c2596d","#e6849a","#e8b9c5","#f65d5b","#ff988e","#fcbbc1","#db7d73","#fcdcda","#fcb1ba","#aa5048","#a45d55","#874c49","#e6bcc3","#c65a6b","#eda6ac","#72535a","#c7bac7","#8572a4","#bcc0d8","#444d58","#bbc8d6","#ccd5da","#9fbbd5","#e8edf3","#4f819d","#b8dae9","#296e87","#7cbec6","#6b8084","#f8eedc","#e8b58f","#b8846c","#d8b39d","#f6e1d0","#c27d45","#892b21","#c4856f","#f2c6b8","#5c4c2d","#d2caba","#605b45","#978266","#2f3b36","#e65952","#6f2e35","#863248","#c33c62","#ce507f","#f19ac2","#073563","#0c464b","#1c869b","#4fa1a9","#c4e7e8","#008679","#b8cebe","#3f8878","#538a6d","#699d85","#a6c5b4","#005d2e","#d2d057","#ddb442","#e2b73a","#f1d863","#fffcdc","#fbccb8","#fdc391","#c38c55","#e8aa5f","#af8846","#a47829","#b97161","#b33034","#d55d63","#e8868c","#642441","#784775","#c1aec2","#7c4087","#62669a","#94a8c9","#c1d4ec","#cbdde7","#12557e","#0095d3","#04acce","#01cbec","#63d3e1","#00604e","#42917f","#6eb2a7","#08926f","#56b69c","#cc972b","#fc9749","#f7b25c","#f7ca84","#ebbc9a","#804133","#8d5745","#b68472","#947974","#9e887f","#845f2e","#a4866c","#c9af93","#faf9f5","#e7e5dd"];

    }]);
;angular.module('embroidery-pattern')
    .controller('UploadController', ['$scope', 'Upload', '$timeout', 'baseURL', function ($scope, Upload, $timeout, baseURL) {
        'use strict';

        $scope.widthImage = 0;
        $scope.heightImage = 0;
        $scope.maxWidth = 0;
        $scope.maxHeigth = 0;
        $scope.formShow = false;


        $scope.widthChange = function(){
            $scope.heightImage = parseInt($scope.proportion * $scope.widthImage);
        };

        $scope.heightChange = function(){
            $scope.widthImage = parseInt($scope.heightImage / $scope.proportion);
        };

        $scope.uploadPic = function (file) {
            console.log(file);
            file.upload = Upload.upload({
                url: baseURL + '/upload',
                data: {
                    widthImage: $scope.widthImage,
                    heightImage: $scope.heightImage,
                    file: file
                }
            });

            file.upload.then(function (response) {
                console.log("response: ", response);
                console.log("path: ", response.data.file.path);
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };


    }]);;angular.module('embroidery-pattern')
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
