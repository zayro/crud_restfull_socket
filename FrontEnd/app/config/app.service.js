/**
 * ngdoc service
 * @name LoadServices
 * @memberof crud
 * @description This is an service.
 */

app.service('LoadServices', function($http) {

    this.http_rest = function(valor_url, valor_metodo, valor_formulario) {

        console.debug('url: ' + valor_url + ' data: ' + valor_formulario);

        return $http({
            method: valor_metodo,
            url: valor_url,
            data: valor_formulario,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8' }
        });

    };

});

/**
 * ngdoc service
 * @name RestFull
 * @memberof crud
 * @description This is an service.
 */

app.service('RestFull', function($resource) {

    this.resource = function() {

        return $resource(global.second_route + 'app/controller/general.php/:id', { id: '@id' }, {
            column: { method: 'GET', isArray: false, params: { method: 'column' } },
            insert: { method: 'POST', isArray: false, params: { method: 'add' } },
            select: { method: 'GET', isArray: false, params: { method: 'search' } },
            update: { method: 'PUT', isArray: false, params: { method: 'change' } },
            delete: { method: 'DELETE', isArray: false, params: { method: 'remove' } }
        }, { stripTrailingSlashes: true });

    };

});


/**
 * ngdoc service
 * @name socket
 * @memberof crud
 * @description This is an service.
 */

app.service('socket', function() {


    try {

        //var socket = io.connect('http://' + myip + ':3000');

        var socket = io.connect(global.socket, {
            upgrade: false,
            transports: ['polling', 'xhr-polling']
        });

        this.zocalo = socket;

    } catch (mensaje) {

        console.error('ocurrion un problemna: ' + mensaje);

    }

});