app.config(function($routeProvider) {
    $routeProvider.when('/list', {
        templateUrl: 'views/list.html',
        controller: 'AdminTable'
    }).when('/list/:id/view', {
        templateUrl: 'views/list.html',
        controller: 'DataList'
    }).when('/new', {
        templateUrl: 'views/list.html',
        controller: 'DataNew'
    }).when('list/:id/edit', {
        templateUrl: 'views/list.html',
        controller: 'DataEdit'
    }).otherwise({ redirectTo: '/list' })
});