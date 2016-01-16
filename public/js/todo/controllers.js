var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('MainCtrl', function($scope) {
    $scope.date = new Date();
});

todoControllers.controller('ListCtrl', function($scope, $http) {
    $scope.formData = {};

    $http.get('/apps/api/todo')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data)
        });

    $scope.createTodo = function() {
        $http.post('/apps/api/todo', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.incPriority = function(id) {
        $http.post('/apps/api/todo/priority/up/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.decPriority = function(id) {
        $http.post('/apps/api/todo/priority/down/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }


    $scope.markDone = function(id) {
        $http.delete('/apps/api/todo/' + id + '/done')
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.delete = function(id) {
        $http.delete('/apps/api/todo/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});