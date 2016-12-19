/**
 * @ngdoc controller
 * @name main
 * @memberof app
 * @param $scope {service} controller scope
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

    /**
     * @scope tiempo     
     * @memberof main
     * @description obtiene el tiempo actual  
     */

    $scope.tiempo = Date.now();

    $scope.closeleft = function() {
        $mdSidenav('left').close()
            .then(function() {
                $log.debug("close LEFT is done");
            });
    };

    /**
     * @scope link     
     * @memberof main
     * @param {string} url open route
     * @description obtiene el tiempo actual
     */

    $scope.link = function(url) {
        $location.path(url);
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

    /**
     * Add an object to the collection of group
     * @memberof main
     * @function openToast
     * @param {number} type the name of collection that object belongs to
     * @param {string} msg  an object to add into a collection, i.e. marker, shape
     * @param {function} action  an object to add into a collection, i.e. marker, shape
     * @return {show} muestra mensaje $mdToast.show
     * @example
     * openToast(0, 'ocurrio error', alert('salir');
     */

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

    /**
     * Add an object to the collection of group
     * @memberof main
     * @function openDialogConect
     * @param url the name of collection that object belongs to
     * @param value  an object to add into a collection, i.e. marker, shape
     * @param ev  an object to add into a collection, i.e. marker, shape
     * @return {show} muestra mensaje $mdDialog.show
     * @example
     * openDialogConect('views/demo.html', 'data', $even)
     */

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

    /**
     * es una funcion que permite salir del sistema
     * @memberof main
     * @function salir
     * @param {string} identificacion the name of collection that object belongs to     
     * @example
     * salir('00001')
     * @desc permite cerrar sesion del sistema de informacion
     */

    $scope.salir = function(identificacion) {

        sessionStorage.clear();
        localStorage.clear();

        //$localStorage.$reset();
        $sessionStorage.$reset();

        console.log('eliminar enlinea', identificacion);

        console.log('se recibio el ajax para eliminar');
        sessionStorage.clear();
        localStorage.clear();
        $location.path('/login');
        $route.reload();
        $auth.logout();
        console.log('se ejecuto eliminar enlinea');


    };

});

/**
 * @ngdoc controller
 * @name Messenger
 * @memberof app
 * @param $scope {service} controller scope
 * @param $mdDialog {service} controller scope
 * @param $mdToast {service} controller mdToast
 * @param {object} data se recibe objecto a mostrar
 */

app.controller('Messenger', function($scope, $mdToast, $mdDialog, data) {

    console.log('data messenger', data);

    $scope.data = data;

    /**
     * @scope HideToast     
     * @memberof Messenger     
     * @description oculta el cuadro de mensajes
     */

    $scope.HideToast = function() {
        $mdToast.hide();
    };

    /**
     * @scope HideDialog     
     * @memberof Messenger     
     * @description oculta el cuadro de dialogo
     */

    $scope.HideDialog = function() {
        $mdDialog.hide();
    };

    /**
     * @scope CancelDialog     
     * @memberof Messenger     
     * @description cancela el cuadro de dialogo
     */

    $scope.CancelDialog = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };


});

/**
 * @ngdoc controller
 * @memberof app
 * @name DialogOnline
 * @param $scope {service} controller scope
 * @param $mdDialog {service} controller scope
 * @param {object} data se recibe objecto a mostrar
 */

app.controller('DialogOnline', function($scope, $mdDialog, data) {

    $scope.data = data;

    /**
     * @scope HideDialog     
     * @memberof Messenger     
     * @description oculta el cuadro de dialogo
     */

    $scope.HideDialog = function() {
        $mdDialog.hide();
    };

    /**
     * @scope CancelDialog     
     * @memberof Messenger     
     * @description cancela el cuadro de dialogo
     */

    $scope.CancelDialog = function() {
        $mdDialog.cancel();
    };

});