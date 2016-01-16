todoDirectives = angular.module('todoDirectives', []);

todoDirectives.directive('todo', ['$compile', function($compile) {
	return {
		restrict: "E",
		templateUrl: '/js/todo/template/todo.html'
	}
}]);