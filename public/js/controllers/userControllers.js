(function(){
	
	angular.module('startApp')
	.controller('userCtrl',[
		'$scope',
		'$http',
		'baseUrl',
		'AuthFactory',
		'$localStorage',
		'$state',
		'ngDialog',
		function(
			$scope,
			$http,
			baseUrl,
			AuthFactory, 
			$localStorage,
			$state,
			ngDialog){

		//user login signup logout function
		$scope.doLogin = function() {
        	AuthFactory.login($scope.user);
        	$state.go('app');
/*        	$scope.autoLogOut();*/
    	};

    	$scope.doSignUp = function() {
    		AuthFactory.register($scope.userSignUp);
    		ngDialog.close();
    		$state.go('app');
    	};

		$scope.logOut = function() {
   			AuthFactory.logout();
    		$scope.loggedIn = false;
    		$scope.user = '';
    		$state.go('app');
    		window.location.reload();
		};
		//user change info
		$scope.doChangeInfo = function() {
			AuthFactory.changeinfo($scope.userinfo);
			$state.go('app.users');

		};

		$scope.openLogin = function() {
			ngDialog.open({ template: 'views/login.html',
			 scope:$scope,
			 className:'ngdialog-theme-default',
			 controller:"userCtrl"})
		}
		$scope.openRegister = function () {
        	ngDialog.open({ template: 'views/signup.html', 
        	scope: $scope, 
        	className: 'ngdialog-theme-default', 
        	controller:"userCtrl" });
    	};
		
    	//automatic logout
		$scope.userexp = AuthFactory.getExpTime();
		if($scope.userexp < Date.now()/1000)
		{
		    $scope.logOut();
		}

		//user get infomation
		$scope.userinfo = AuthFactory.getUserInfo();
    	$scope.isAuthenticated = AuthFactory.isAuthenticated();
    	//autologout
    	
	}])
})();