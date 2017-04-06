(function(){
	angular.module('startApp')
	.constant("baseUrl","http://localhost:8080/")
	.factory('$localStorage', ['$window', function ($window) {
	    return {
	        store: function (key, value) {
	            $window.localStorage[key] = value;
	        },
	        get: function (key, defaultValue) {
	            return $window.localStorage[key] || defaultValue;
	        },
	        remove: function (key) {
	            $window.localStorage.removeItem(key);
	        },
	        storeObject: function (key, value) {
	            $window.localStorage[key] = JSON.stringify(value);
	        },
	        getObject: function (key, defaultValue) {
	            return JSON.parse($window.localStorage[key] || defaultValue);
	        }
	    }
	}])
	.factory('AuthFactory', 
		['$resource', 
		 '$http', 
		 '$localStorage',
		 '$rootScope',
		 'baseUrl',
		 '$window',
		  function($resource, 
		  	$http,
		  	$localStorage,
		  	$rootScope,
		  	baseUrl,
		  	$window){

	    var authFac = {};
	    var TOKEN_KEY = 'Token';
	    var USER_KEY = 'UserInfo';
	    var EXP = 'Exp';
	    var isAuthenticated = false;
	    var username = '';
	    var userid = '';
	    var userage = '';
	    var usergender = '';
	    var userInfo = '';
	    var exp = '';
	    var isAdmin = false;
	    var authToken = undefined;
	    

	  	function loadUserCredentials() {
		    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
		    var credentialsInfo = $localStorage.getObject(USER_KEY,'{}');

		    if (credentials.username != undefined) {
		      useCredentials(credentials);
		      useInfoCredentials(credentialsInfo);
		    }
	  	}
	 
	  	function storeUserCredentials(credentials) {
		    $localStorage.storeObject(TOKEN_KEY, credentials);
		    useCredentials(credentials);
	  	}
	 
		 function useCredentials(credentials) {
		    isAuthenticated = true;
		    userage = credentials.userage;
		    username = credentials.username;
		    usergender = credentials.usergender;
		    authToken = credentials.token;
		 	userid = credentials.userid;
		 	isAdmin = credentials.isAdmin;
		    // Set the token as header for your requests!
		    $http.defaults.headers.common['x-access-token'] = authToken;
		 }
	 
	 	  function destroyUserCredentials() {
		    authToken = undefined;
		    username = '';
		    userage = '';
		    usergender = '';
		    exp = '';
		    isAuthenticated = false;
		    $http.defaults.headers.common['x-access-token'] = authToken;
		    $localStorage.remove(TOKEN_KEY);
		    $localStorage.remove(USER_KEY);
		    $localStorage.remove(EXP);
		  }
	    //login
	    authFac.login = function(loginData) {
			$http.post(baseUrl + 'users/login', loginData)
			.then(function(r)
			{
				
				storeUserCredentials({
					username:loginData.username, token: r.data.token,
					userid:r.data.id, userage:r.data.info.age,
					useragender:r.data.info.gender, isAdmin:r.data.info.admin});
				authFac.changeinfo({age:r.data.info.age,gender:r.data.info.gender});
				authFac.getExp();
				window.location.reload();
			}, function(e)
			{
				console.log(e);
	
			})

	    };
	    //autologout
	    authFac.getExp = function() {
	    	$http.get(baseUrl + 'users/exp')
	    	.then(function(r){
	    		var data = {
	    			exp : r.data
	    		}
	    		$localStorage.storeObject(EXP, data);
	    	})
	    }
	    var expdata = $localStorage.getObject(EXP,'{}');
	    exp = expdata.exp;
		
	    //register
	    authFac.register = function(registerData) {
        
	        $http.post(baseUrl + 'users/register', registerData)
		        .then(function(response) 
		        {
		            authFac.login({username:registerData.username, password:registerData.password});
		        },function(e)
		        {
		           	console.log(e);
		        }
		        
		    );
	    };

	    //update info
	    function storeUserUpdateCredentials(credentials) {
	    	$localStorage.storeObject(USER_KEY, credentials);
		    useInfoCredentials(credentials);
	    }

	    function useInfoCredentials(credentials) {
		    userage = credentials.userage;
		    usergender = credentials.usergender;
		 }

	    authFac.changeinfo = function(newInfo) {
	    	$http.put(baseUrl + 'users/user/' + userid, newInfo)
		    	.then(function(r)
		    	{
		    		storeUserUpdateCredentials({
		    			userage:r.data.age,
		    			usergender:r.data.gender
		    		});
		    		window.location.reload();

		    	}
		    	,function(e)
		    	{
		    		console.log(e);
		    	}
		    );
	    }

	    authFac.logout = function() {
        	$http.get(baseUrl+ 'users/logout');
        	destroyUserCredentials();
    	};

    	authFac.isAuthenticated = function() {
        	return isAuthenticated;
    	};

    	authFac.getExpTime = function() {
    		return exp;
    	};
    	//get info
    	authFac.getUserInfo = function() {
    		userInfo = {name:username, age:userage, gender:usergender, admin:isAdmin};
    		return userInfo;
    	}

    	loadUserCredentials();

	    return authFac;
    
	}]);
})();