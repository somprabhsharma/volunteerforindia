var services = angular.module('services', []);
services.service('registerService', function() {
  var newVolunteer = [];
  var newStudent = [];

  var addVolunteer = function(newObj) {
      newVolunteer.push(newObj);
  };

  var getVolunteer = function(){
      return newVolunteer;
  };

  var addStudent = function(newObj) {
      newStudent.push(newObj);
  };

  var getStudent = function(){
      return newStudent;
  };

  return {
    addVolunteer: addVolunteer,
    getVolunteer: getVolunteer,
    addStudent: addStudent,
    getStudent: getStudent
  };

});

services.service('loginService', function() {
  var newVolunteer = [];
  var newNGO = [];
  var addVolunteer = function(newObj) {
      newVolunteer.push(newObj);
  };

  var getVolunteer = function(){
      return newVolunteer;
  };

  var addNGO = function(newObj) {
      newNGO.push(newObj);
  };

  var getNGO = function(){
      return newNGO;
  };

  return {
    addVolunteer: addVolunteer,
    getVolunteer: getVolunteer,
    addNGO: addNGO,
    getNGO: getNGO
  };

});