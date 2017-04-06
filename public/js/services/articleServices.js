(function(){

	angular.module('startApp')
	.factory('ArticleFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl){
			//get articles
		return $resource(baseUrl + 
			"articles/:articleId", {articleId: "@id"},
			{ create: {method:"POST"}, save: {method:"PUT"}});
	}])
	.factory('ArticleUserFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl){
			//get articles
		return $resource(baseUrl + 
			"articlesUser/:articleUserId", {articleUserId: "@id"},
			{ create: {method:"POST"}, save: {method:"PUT"}});
	}])
	.factory('commentFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {

        return $resource(baseUrl + "article/:articleId/comments/:commentId", {articleId:"@Id", commentId: "@CommentId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])
	.service('multipartForm', ['$http', function($http) {
		this.post = function(uploadUrl, data) {
			var fd = new FormData();
			for(var key in data)
				fd.append(key, data[key]);
			return $http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})
			
		}
	}]);
})();