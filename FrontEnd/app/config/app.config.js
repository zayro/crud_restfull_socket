/**
 * @ngdoc config
 * @name cors
 * @memberof app
 * @param $httpProvider {service} http Provider
 * @description PERMITE EJECUCION CORS
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

/**
 * @ngdoc directive
 * @name stringToNumber
 * @memberof app
 * @param $httpProvider {service} http Provider
 * @description PERMITE EJECUCION CORS
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


/**
 * @ngdoc config
 * @name allowGlobals
 * @memberof app
 * @param $controllerProvider {service} controller Provider
 * @description PERMITE EJECUCION COMO ANGULAR 1.*
 */


app.config(['$controllerProvider', function($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);



/**
 * @ngdoc config
 * @name satellize
 * @memberof app
 * @param $controllerProvider {service} controller Provider
 * @description CONFIGURACION satellize
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