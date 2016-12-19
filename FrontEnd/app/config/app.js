"use strict";

const global = {
    table: 'demo',
    main_route: 'http://' + location.hostname + '/code/BackEnd/',
    second_route: 'http://192.168.1.3/code/BackEnd/',
    socket: 'http://192.168.1.3:3000',
};

/**
 * @memberof Module-App
 * @name app
 * @author MARLON ZAYRO ARIAS VARGAS <zayro8905@gmail.com>
 * @copyright 2016 ZAVWEB Ltd. All rights reserved.
 */

var app = angular.module('app', [
    'angular-loading-bar',
    'md.data.table',
    'angular.filter',
    'ngAnimate',
    'ngAria', 'ngRoute',
    'ngMessages',
    'ngAnimate',
    'ngSanitize',
    'ngMaterial',
    'ngStorage',
    'satellizer',
    'ngResource'
]);