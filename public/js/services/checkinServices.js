(function(){

	angular.module('startApp')
	.factory('CheckInFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl){
			//get articles
		return $resource(baseUrl + 
			"timecheck/:timecheckId", {timecheckId: "@id"},
			{ create: {method:"POST"}, save: {method:"PUT"}});
	}]);
})();