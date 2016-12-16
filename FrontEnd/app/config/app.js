/*
 ###############################################
 INICIA APP
 ###############################################
 */

"use strict";

const global = {
    table: 'demo',
    main_route: 'http://' + location.hostname + '/code/BackEnd/',
    second_route: 'http://192.168.1.3/code/BackEnd/',
    socket: 'http://192.168.1.3:3000',
};

var app = angular.module('app', ['angular-loading-bar', 'md.data.table', 'angular.filter', 'ngAnimate', 'ngAria', 'ui.router', 'ngMessages', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngStorage', 'satellizer', 'ngResource']);

/*
 ###############################################
 PERMITE EJECUCION CORS
 ###############################################
 */

app.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
    }
]);

app.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

/*
 ###############################################
 PERMITE EJECUCION CORS
 ###############################################
 */

app.run(function($rootScope) {
    $rootScope.typeOf = function(value) {
        return typeof value;
    };
})

app.directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value);
            });
        }
    };
});
/*
 ###############################################
 PERMITE EJECUCION COMO ANGULAR 1.2
 ###############################################
 */

app.config(['$controllerProvider', function($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);

/*
 ###############################################
 INICIA CONFIGURACION satellizer
 ###############################################
 */

app.config(function($authProvider) {

    $authProvider.loginUrl = global.main_route + "app/main/usuario/controller/controller_usuario.php";
    $authProvider.signupUrl = global.main_route + "app/main/usuario/controller/controller_usuario.php?registro=true";
    $authProvider.unlinkUrl = global.main_route + "app/main/usuario/controller/controller_usuario.php?salir=true";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "";
    $authProvider.authHeader = 'Authorization';
    $authProvider.storageType = 'localStorage';
    $authProvider.authToken = '';

});

/*
 ###############################################
 INICIA EL CONTROLADOR APLICACIONES
 ###############################################
 */


app.controller('main', function($scope, $window, $location, $log, $http, $filter, $timeout, $mdSidenav, $mdToast, $mdDialog, $sessionStorage) {

    'use strict';

    $scope.autor = "MARLON ZAYRO ARIAS VARGAS";
    $scope.title = "ADMINISTRAR";
    $scope.subtitle = "(LECTURA, ESCRITURA, ELIMINACION, AGREGACION)";

    $scope.global = global;

    $scope.query = {
        order: '',
        limit: 5,
        page: 1
    };


    $scope.toggleLeft = buildToggler('left');

    $scope.toggleRight = buildToggler('right');

    $scope.tiempo = Date.now();

    $scope.closeleft = function() {
        $mdSidenav('left').close()
            .then(function() {
                $log.debug("close LEFT is done");
            });
    };

    $scope.link = function(valor) {
        $location.path(valor);
        $scope.closeleft();
    };

    $scope.closeright = function() {
        $mdSidenav('right').close()
            .then(function() {
                $log.debug("close RIGHT is done");
            });
    };

    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    };

    $scope.openToast = function(type, msg, action) {

        var css, notify;

        if (action == undefined) {
            action = 'HideToast()';
        };

        switch (type) {
            case 0:
                css = "error";
                notify = "ERROR";
                break;
            case 1:
                css = "success";
                notify = "EXITOSO";
                break;
            case 2:
                css = "warning";
                notify = "ADVERTENCIA";
                break;
            case 3:
                css = "info";
                notify = "INFORMACION";
                break;
            default:
                css = "";
                notify = "";
        };

        $mdToast.show({
            template: '<md-toast>  <md-button  ng-click="' + action + '">   <span  flex>' + msg + '</span>   </md-button>  <md-button> <span class="' + css + '" >' + notify + '  </span>  </md-button>  </md-toast>',
            parent: angular.element(document.body),
            controller: 'Messenger',
            locals: {
                data: notify
            },
            hideDelay: 9000,
            position: 'bottom right'
        });

    };


    $scope.openDialogConect = function(url, value, ev) {

        $mdDialog.show({
                controller: 'DialogOnline',
                scope: $scope,
                preserveScope: true,
                templateUrl: url,
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    data: value
                },
                clickOutsideToClose: true,
                fullscreen: 'useFullScreen'

            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    $scope.$on('DatosUsuario', function(event, msg) {
        console.log('DatosUsuario', msg.datos);
        $scope.DatosUsuario = msg.datos;
        console.log('MenuUsuario', msg.menu);
        $scope.MenuUsuario = msg.menu;
    });


    angular.element(document).ready(function() {


        console.info("cargo controlador principal");

        $scope.pagina = 'principal';

        $scope.$on('$locationChangeStart', function(event) {
            console.warn("se recargo el navegador");
            //console.clear();
            /*var answer = confirm("Desea salir del sistema?");
             if (!answer) {
             event.preventDefault();
             }
             */

        });

    });

    $scope.tiempo = Date.now();

    $scope.salir = function(identificacion) {
        sessionStorage.clear();
        localStorage.clear();

        //$localStorage.$reset();
        $sessionStorage.$reset();

        console.log('eliminar enlinea', identificacion);

        var resultado = RestUsuario.recursos().delete({ id: identificacion }, function() {

            console.log('se recibio el ajax para eliminar');
            sessionStorage.clear();
            localStorage.clear();
            $location.path('/login');
            $route.reload();
            $auth.logout();
            console.log('se ejecuto eliminar enlinea');

        });
    };

});

/*
 ##################################################
 INICIA EL CONTROLADOR MENSAJES
 ###################################################
 */

app.controller('Messenger', function($scope, $mdToast, $mdDialog, $http, data) {

    console.log('data messenger', data);

    $scope.data = data;

    $scope.HideToast = function() {
        $mdToast.hide();
    };

    $scope.HideDialog = function() {
        $mdDialog.hide();
    };

    $scope.CancelDialog = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };


});

app.controller('DialogOnline', function($scope, $mdDialog, data) {

    $scope.data = data;

    $scope.HideDialog = function() {
        $mdDialog.hide();
    };

    $scope.CancelDialog = function() {
        $mdDialog.cancel();
    };

});