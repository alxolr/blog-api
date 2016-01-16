todoDirectives = angular.module('todoDirectives', []);

todoDirectives.directive('todo', function() {
	return {
		restrict: "E",
		templateUrl: '/js/todo/template/todo.html'
	}
});

todoDirectives.directive('todoform', function() {
	return {
		restrict: "E",
		templateUrl: '/js/todo/template/form.html'
	}
});

todoDirectives.directive('todoicon', function() {
	return {
		restrict: "E",
		templateUrl: '/js/todo/template/todoicon.html'
	}
});