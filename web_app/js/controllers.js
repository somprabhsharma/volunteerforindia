'use strict';

// optional controllers
function HomeCtrl($scope, $http, $routeParams) {
	$scope.email = $routeParams.email;
	alert($routeParams);
	$scope.autoload = function(email){
		$http.post('https://codefinal-nivesh2.c9.io', {contentType:"application/json; charset=utf-8"}).
		success(function(data, status, headers, config) {
			
		}).
		error(function(data, status, headers, config) {
		});
	};
	$scope.autoload();
}

function PrivacyCtrl($scope, $http, $timeout) {
}

function BaseCtrl($scope, $http, $timeout) {
	
}

function AboutCtrl($scope, $http, $timeout) {
}

function ContactCtrl($scope, $http, $timeout) {
}

function PortfolioCtrl($scope, $http, $timeout) {
}

function TeamCtrl($scope, $http, $timeout) {
}

function ProfileCtrl($scope, $http, $timeout,loginService) {
	$scope.projects = angular.copy(loginService.getVolunteer());
	console.log($scope.projects);
}

function LoginCtrl($scope, $http, $location,loginService) {
	$scope.login = function(logindata){
		$http.post('https://codefinal-nivesh2.c9.io/login', {data: logindata,contentType:"application/json; charset=utf-8"}).
		success(function(data, status, headers, config) {;
			loginService.addVolunteer(data.project);
			$location.path('/volunteer/home');

		}).
		error(function(data, status, headers, config) {
		});
	};
}

function RegisterCtrl ($scope,$http,$timeout,$location,registerService) {
	var newVolunteer={};
	console.log("i am here");
	$scope.addVolunteer = function(newVolunteer){
		console.log("i am here");
		console.log(newVolunteer);
		
		$http.post('https://codefinal-nivesh2.c9.io/signup', {data: newVolunteer,contentType:"application/json; charset=utf-8"}).
		success(function(data, status, headers, config) {
			$location.path('/');
		}).
		error(function(data, status, headers, config) {
		});
	};
	var newNGO={};
	$scope.addNGO = function(newNGO){
		console.log(newNGO);
		$http.post('http://localhost:4300/api/ngo/add', {data: newNGO, contentType:"application/json; charset=utf-8"}).
		success(function(data, status, headers, config) {
			$location.path('/');
		}).
		error(function(data, status, headers, config) {
		});
	};
}

function RegisterCtrlNext ($scope,$http,$timeout,$location,registerService) {
	var nextVolunteer={};
	$scope.newVolunteer = registerService.getVolunteer();
	$scope.addVolunteerNext = function(nextVolunteer){
		console.log(nextVolunteer);
		$location.path('/');
		/*$http.post('#/api/v1/addvolunteer', {data: nextVolunteer}).
		success(function(data, status, headers, config) {

		}).
		error(function(data, status, headers, config) {
			$scope.addAlert('danger', 'Failed to add a new volunteer !!!');
		});*/
	};
	var nextStudent={};
	$scope.newNGO = registerService.getStudent();
	console.log($scope.newNGO)
	$scope.addStudentNext = function(nextStudent){
		console.log(nextStudent);
		$location.path('/');
		/*$http.post('#/api/v1/addstudent', {data: nextStudent}).
		success(function(data, status, headers, config) {

		}).
		error(function(data, status, headers, config) {
			$scope.addAlert('danger', 'Failed to add a new student !!!');
		});*/
	};
}


