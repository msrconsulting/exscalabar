(function() {
	angular.module('main').directive('navi', navi);

	function navi() {
		return {
			restrict : 'E',
			scope : {name:"=?"},
			templateUrl : 'nav/navi.html'
		};
	}

})(); 