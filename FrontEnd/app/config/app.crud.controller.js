/**
 * @memberof crud
 * @ngdoc controller
 * @name AdminTable
 */

app.controller('AdminTable', function($scope, $location, $log, $http, $filter, $timeout, $mdEditDialog, $mdDialog, $q, RestFull) {

    /**
     * @scope list
     * Add an object to the collection of group
     * @memberof AdminTable
     * @return {data} retorna detos de php
     * @example
     * list()
     */

    $scope.list = function() {

        RestFull.resource().get({ table: global.table }, function(response) {
            console.info('Load DataList', response);
            $scope.datos = response.result;
        });

    };

    $scope.list();

    /**
     * @scope all_csv     
     * @memberof AdminTable
     * @return {data} retorna detos de php
     * @example
     * all_csv($event, data)
     */

    $scope.all_csv = function() {

        RestFull.resource().get({ table: global.table, method: 'all_csv', file: 'report' }, function(response) {
            console.info('load all_csv', response);
        });

    };


    /**
     * @scope delete     
     * @memberof AdminTable
     * @return {data} retorna detos de php
     * @example
     * delete($event, DataId)
     */

    $scope.delete = function(e, DataId) {
        RestFull.resource().delete({ table: global.table, id: DataId }, $scope.DataForm, function(resultado) {
                //  console.log(resultado);
            }).$promise
            .then(function(response) {
                console.log('delete callback', response.result);
                if (response.result > 0) {
                    $scope.list();
                    $scope.openToast(response.result, '#' + response.result + ' ELIMINADO');
                    socket.zocalo.emit('EnviarMensaje', response);
                } else {
                    $scope.openToast(0, ' Opps Ocurrio un problema');
                    $scope.list();
                }
            })
            .catch(function(response) {
                console.error(response);
            });
    };


    /**
     * @scope insert     
     * @memberof AdminTable
     * @return {data} retorna detos de php   
     */


    $scope.insert = function(event) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'Admin',
            focusOnOpen: false,
            targetEvent: event,
            templateUrl: 'views/add.html',
            locals: {
                data: ""
            },
        }).then(function(promise) {
            console.log('insert callback', promise);
            if (promise.success == true) {
                $scope.openToast(1, '#' + promise.result + ' AGREGADO');
                $scope.list();
            } else {
                $scope.openToast(0, ' Opps Ocurrio un problema');
                $scope.list();
            }
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };


    /**
     * @scope edit     
     * @memberof AdminTable
     * @return {data} retorna detos de php
     * @example
     * edit($event, data)
     */

    $scope.edit = function(event, information) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'Admin',
            focusOnOpen: true,
            targetEvent: event,
            templateUrl: 'views/edit.html',
            locals: {
                data: information
            },
        }).then(function(promise) {
            console.log('update callback', promise);
            if (promise.result > 0) {
                $scope.list();
                $scope.openToast(promise.result, '#' + promise.result + ' ACTUALIZADO');
            } else {
                $scope.openToast(0, ' Opps Ocurrio un problema');
                $scope.list();
            }
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };

});


/**
 * @ngdoc controller
 * @name Admin
 * @memberof crud
 * @param $scope {service} controller scope
 * @param $mdDialog {service} controller scope 
 * @param {object} data se recibe objecto a mostrar
 * @description Controller General C.R.U.D
 */

app.controller('Admin', function($mdDialog, $scope, RestFull, data) {

    $scope.DataForm = {};
    $scope.DataForm = data;

    $scope.cancelar = function() {
        $mdDialog.cancel();
    }

    this.ocultar = function() {
        $mdDialog.hide();
    }

    /**
     * Add an object to the collection of group
     * @memberof Admin
     * @function insert
     */

    $scope.insert = function() {

        if ($scope.DataForm.$valid) {

            delete $scope.DataForm.$valid;
            delete $scope.DataForm.$dirty;
            delete $scope.DataForm.$invalid;
            delete $scope.DataForm.$name;
            delete $scope.DataForm.$pristine;
            delete $scope.DataForm.$submitted;
            delete $scope.DataForm.$error;

            console.info('data insert', $scope.DataForm);

            RestFull.resource().insert({ table: global.table }, $scope.DataForm, function(resultado) {
                    //console.log('resultado', resultado);
                }).$promise.then(function(response) {

                    console.log(response.success);

                    $scope.promise = function(response) {
                        $mdDialog.hide(response);
                    }

                    $scope.promise(response);


                })
                .catch(function(response) {
                    console.error(response);
                });

        } else {
            console.info('success problem');
        }

    };

    /**
     * Add an object to the collection of group
     * @memberof Admin
     * @function update
     */

    $scope.update = function() {

        RestFull.resource().update({ table: global.table, id: $scope.DataForm.id }, $scope.DataForm, function(resultado) {
                // console.log(resultado);
            }).$promise
            .then(function(response) {

                $scope.promise = function(response) {
                    $mdDialog.hide(response);
                }

                $scope.promise(response);



            }).catch(function(response) { console.error(response); });

    };

    $scope.column = function() {

        RestFull.resource().column({ table: global.table }, function(response) {
            console.info('Load column', response);
            $scope.column = response.result;
        });

    };

});