app.controller('crud', function($scope, $location, $log, $http, $filter, $timeout, $mdEditDialog, $mdDialog, $q, RestFull, socket) {

    try {

        socket.zocalo.on('connect', function() {});
        socket.zocalo.emit('agregar', 'username');
        socket.zocalo.emit('CambiarSala', 'admin');
        socket.zocalo.on('sala', function(rooms, current_room) {
            console.debug('salta', rooms + ' acual: ' + current_room);
        });
        socket.zocalo.on('actualizar', function(username, data) {
            console.log('actualizar', data);
            $scope.list();

        });
    } catch (err) {
        console.error('zocalo desconectado', err);
    }

    $scope.list = function() {

        RestFull.resource().get({ table: global.table }, function(response) {
            console.info('Load DataList', response);
            $scope.datos = response.result;
        });

    };

    $scope.view = function(e, data) {
        $scope.openDialogConect('./views/view.html', data, e);

    };


    $scope.all_csv = function() {

        RestFull.resource().get({ table: global.table, method: 'all_csv', file: 'report' }, function(response) {
            console.info('load all_csv', response);
        });

    };

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


app.controller('Admin', function($mdDialog, $scope, RestFull, $state, $stateParams, data) {

    $scope.DataForm = {};
    $scope.DataForm = data;

    $scope.column = function() {

        RestFull.resource().column({ table: global.table }, function(response) {
            console.info('Load column', response);
            $scope.column = response.result;
        });

    };

    $scope.cancelar = function() {
        $mdDialog.cancel();
    }

    this.ocultar = function() {
        $mdDialog.hide();
    }

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

                    $state.go('list');
                })
                .catch(function(response) {
                    console.error(response);
                });

        } else {
            console.info('success problem');
        }

    };

    $scope.update = function() {

        RestFull.resource().update({ table: global.table, id: $scope.DataForm.id }, $scope.DataForm, function(resultado) {
                // console.log(resultado);
            }).$promise
            .then(function(response) {

                $scope.promise = function(response) {
                    $mdDialog.hide(response);
                }

                $scope.promise(response);
                $state.go('list');


            }).catch(function(response) { console.error(response); });

    };

});


app.controller('DataList', function($scope, $timeout, $q, RestFull) {

    $scope.promise = $timeout(function() {

        var defered = $q.defer();
        var promise = defered.promise;

        RestFull.resource().get({ table: global.table }, function(response) {
            console.info('DataList', response);
            defered.resolve(response);
            $scope.datos = response.result;
        });

        return promise;
    }, 2000);



});

app.controller('DataNew', function($scope, $state, RestFull) {

    $scope.DataForm = {};

    $scope.insert = function() {

        console.log($scope.DataForm);

        RestFull.resource().insert({ table: global.table }, $scope.DataForm, function(resultado) {
                console.log(resultado);
            }).$promise
            .then(function(response) {
                console.log(response);
                $state.go('list');
            })
            .catch(function(response) { console.log(response); });

    };
});

app.controller('DataEdit', function($scope, $state, $stateParams, RestFull) {

    $scope.DataForm = {};

    $scope.update = function() {

        RestFull.resource().update({ table: global.table, id: $stateParams.id }, $scope.DataForm, function(resultado) {
                console.log(resultado);
            }).$promise
            .then(function(response) {
                console.log(response);
                $state.go('list');
            })
            .catch(function(response) { console.log(response); });
    };

    $scope.load = function() {

        RestFull.resource().select({ id: $stateParams.id, table: global.table }).$promise
            .then(function(response) {
                console.log(response.result[0]);
                $scope.DataForm = response.result[0];
            })
            .catch(function(response) { console.log(response); });
    };

    $scope.load(); // Load a movie which can be edited on UI
});