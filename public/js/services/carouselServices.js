(function(){

	angular.module('startApp')
	.factory('CarouselFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl){
			//get articles
		return $resource(baseUrl + 
			"carousel/:carouselId", {carouselId: "@id"},
			{ create: {method:"POST"}, save: {method:"PUT"}});
	}]);
})();