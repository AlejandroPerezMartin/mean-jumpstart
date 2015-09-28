'use strict';

angular.module('testApp', ['ngMaterial', 'ngRoute'])
    .run(function ($rootScope) {
        $rootScope.authenticated = false;
        $rootScope.current_user = "";
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.html',
                controller: 'mainCtrl'
            })
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'authCtrl'
            })
            .when('/signup', {
                templateUrl: 'signup.html',
                controller: 'authCtrl'
            });
    })
    .controller('mainCtrl', function ($scope) {
        $scope.posts = [];
        $scope.newPost = {
            created_by: '',
            text: '',
            created_at: ''
        };

        $scope.post = function () {
            $scope.newPost.created_at = Date.now();
            $scope.posts.push($scope.newPost);
            $scope.newPost = {
                created_by: '',
                text: '',
                created_at: ''
            };
        };
    })
    .controller('authCtrl', function ($scope, $rootScope, $http, $location) {
        $scope.user = {
            username: '',
            password: ''
        };
        $scope.error_message = '';

        $scope.login = function () {
            $http.post('/auth/login', $scope.user)
                .success(function (data) {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = data.user.username;
                    $location.path('/');
                });
        };

        $scope.signup = function () {
            $http.post('/auth/signup', $scope.user)
                .success(function (data) {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = data.user.username;
                    $location.path('/');
                });
        };
    });
