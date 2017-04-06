(function(){
	angular.module('startApp')
	.controller('commenCtrl',[
		'$scope',
		function($scope) {
			$scope.$on('$viewContentLoaded', function() {
				setTimeout(function(){
	    			var loader = document.getElementsByClassName("loader")[0];
	    			loader.className="loader fadeout" ;//使用渐隐的方法淡出loading page
	    			setTimeout(function(){loader.style.display="none"},1000)
	    		},1750)//强制显示loading page 1s
			})
		}]);
})();