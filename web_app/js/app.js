'use strict';

// angular.js main app initialization
var app = angular.module('cfiapp', ['ui.materialize','services']).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/', { templateUrl: 'pages/login.html', activetab: 'home',flag:false ,controller: BaseCtrl }).
        when('/privacy', {
          templateUrl: 'pages/privacy.html',
          controller: PrivacyCtrl,
          activetab: 'privacy'
        }).
        when('/register', {
          templateUrl: 'pages/register/register.html',
          controller: RegisterCtrl,
          activetab: 'register'
        }).
        when('/login', {
          templateUrl: 'pages/login.html',
          controller: LoginCtrl,
          activetab: 'login'
        }).
        when('/volunteer/home', {
          templateUrl: 'volunteer/pages/home.html',
          controller: ProfileCtrl,
          activetab: 'profile',
          flag:true
        }).
        when('/register/volunteer', {
          templateUrl: 'pages/register/volunteer.html',
          controller: RegisterCtrl,
          activetab: 'register'
        }).
        when('/register/student', {
          templateUrl: 'pages/register/student.html',
          controller: RegisterCtrl,
          activetab: 'register'
        }).
        when('/register/student/next', {
          templateUrl: 'pages/register/studentnext.html',
          controller: RegisterCtrl,
          activetab: 'register'
        }).
        when('/register/volunteer/next', {
          templateUrl: 'pages/register/volunteernext.html',
          controller: RegisterCtrl,
          activetab: 'register'
        }).
        when('/portfolio', {
          templateUrl: 'pages/portfolio.html',
          controller: PortfolioCtrl,
          activetab: 'portfolio'
        }).
        when('/team', {
          templateUrl: 'pages/team.html',
          controller: TeamCtrl,
          activetab: 'team'
        }).
        when('/about', {
          templateUrl: 'pages/about.html',
          controller: AboutCtrl,
          activetab: 'about'
        }).
        when('/contact', {
          templateUrl: 'pages/contact.html',
          controller: ContactCtrl,
          activetab: 'contact'
        }).
        otherwise({ redirectTo: '/' });
    }]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
          $scope.part = $route.current.activetab;
          $scope.flag = $route.current.flag;
        });

        // onclick event handlers
        $scope.showForm = function () {
          $('.contactRow').slideToggle();
        };
        $scope.closeForm = function () {
          $('.contactRow').slideUp();
        };

        // save the 'Contact Us' form
        $scope.save = function () {
          $scope.loaded = true;
          $scope.process = true;
          $http.post('sendemail.php', $scope.message).success(function () {
              $scope.success = true;
              $scope.process = false;
          });
        };
  }]);



