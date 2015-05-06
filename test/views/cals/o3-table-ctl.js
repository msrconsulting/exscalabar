(function() {
	angular.module('main')
	.controller('O3Table', ['$scope', 'tableService', function($scope, tableService) {
		
		/* Contains the entries that will go into the canned table. */
		$scope.table_vals = [ {
			"id": "Wait",
			"step" : "Wait",
			"descr" : "Set a wait time in the ozone cal in seconds"
		}, 
		{
			"id": "Filter",
			"step" : "Filter",
			"descr" : "Boolean that sets the filter state (<code>TRUE</code> or<code>FALSE</code>)"
		}, 
		{
			"id": "Speaker",
			"step" : "Speaker",
			"descr" : "Boolean that sets the speaker state (<code>TRUE</code> or<code>FALSE</code>)"
		}, 
		{
			"id": "O2 Valve",
			"step" : "O2 Valve",
			"descr" : "Boolean that sets the O2 valve position (<code>TRUE</code> or<code>FALSE</code>)"
		}, 
		{
			"id": "O3 Valve",
			"step" : "O3 Valve",
			"descr" : "Boolean that sets the O3 valve state (<code>TRUE</code> or<code>FALSE</code>)"
		}, 
		{
			"id": "O3 Generator",
			"step" : "O3 Generator",
			"descr" : "Boolean that sets the O3 generator state (<code>TRUE</code> or<code>FALSE</code>)"
		}, 
		{
			"id": "QO2",
			"step" : "O2 Flow Rate",
			"descr" : "Numeric to set the oxygen flow rate"
		}];
		
		/* Handle row double clicks */
		$scope.clickRow = function(row){
			
			/* tableService will broadcast the the listeners the current ID */
			tableService.setTab(row.id.toString());
			
		};
	}]);
})();
