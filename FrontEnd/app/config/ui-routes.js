app.config(function($stateProvider) {
    $stateProvider.state('list', { // state for showing all movies
        url: '/list',
        templateUrl: 'views/list.html',
        controller: 'AdminTable'
    }).state('view', { //state for showing single movie
        url: '/list/:id/view',
        templateUrl: 'views/view.html',
        controller: 'DataList'
    }).state('new', { //state for adding a new movie
        url: '/list/new',
        templateUrl: 'views/add.html',
        controller: 'DataNew'
    }).state('edit', { //state for updating a movie
        url: '/list/:id/edit',
        templateUrl: 'views/edit.html',
        controller: 'DataEdit'
    });
}).run(function($state) {
    $state.go('list'); //make a transition to movies state when app starts
});