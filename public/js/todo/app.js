var alxolrTodo = angular.module('alxolrTodo', ['ui.bootstrap.datetimepicker']);

alxolrTodo.controller('TodoMainCtrl', function($scope) {
	$scope.date = new Date();
});

alxolrTodo.controller('TodoListCtrl', function($scope, $http) {
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
		$http.post('/apps/api/todo/priority/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}

	$scope.deleteTodo = function(id) {
		$http.delete('/apps/api/todo/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
});