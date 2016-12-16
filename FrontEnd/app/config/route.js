app.config(function($routeProvider) {

    $routeProvider.when('/list', {
        templateUrl: 'views/list.html',
        controller: 'DataList'
    }).when('/list/:id/view', {
        templateUrl: '',
        controller: 'valida_usuario'
    }).when('/parqueadero/modulo', {
        templateUrl: 'proyect/parqueadero/view/parqueadero.html',
        controller: 'valida_usuario'
    }).otherwise({ redirectTo: '/list' })

});