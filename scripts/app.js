'use strict';

/**
 * @ngdoc overview
 * @name monitorApp
 * @description
 * # monitorApp
 *
 * Main module of the application.
 */
var app = angular.module('monitorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
]);

app.service('service', ['Restangular', function(Restangular) {
    var factory = {};
    factory.req = Restangular.allUrl('monitors', 'http://25.0.0.144:8080/');
    return factory;
}]);
