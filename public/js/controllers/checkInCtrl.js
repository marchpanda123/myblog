(function(){
	angular.module('startApp')
	.controller('checkInCtrl',[
		'$scope',
		'CheckInFactory',
		function($scope,CheckInFactory) {
			/*$scope.listCheckIn = function(){
				$scope.checkins = CheckInFactory.query();
			}

			$scope.doCheckIn = function() {
				Mytime = new Object()
				Mytime.time = Date.now();
				new CheckInFactory(Mytime).$create()
				.then(function(newCheckin) {
					$scope.checkins.push(newCheckin);
				});
			}

			 function setTime() {
				var currentTime = new Date().toLocaleString();
				document.getElementById("currenttime").innerHTML = currentTime;
			}

			setTime();
			setInterval($scope.setTime,1000);

			$scope.listCheckIn();*/
		}]);
})();