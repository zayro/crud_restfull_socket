/**
 * @memberof RestFull
 * @ngdoc controller
 * @name DataList
 */

app.controller('DataList', function($scope, $timeout, $q, $state, $stateParams, RestFull) {

    $scope.promise = $timeout(function() {

        var defered = $q.defer();
        var promise = defered.promise;

        RestFull.resource().get({ table: global.table, method: 'search', id: $stateParams.id }, function(response) {
            console.info('DataList', response);
            defered.resolve(response);
            $scope.data = response.result[0];
        });

        return promise;
    }, 2000);



});

/**
 * @memberof RestFull
 * @ngdoc controller
 * @name DataNew
 */


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

/**
 * @memberof RestFull
 * @ngdoc controller
 * @name DataEdit
 */

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