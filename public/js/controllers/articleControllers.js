(function(){

	angular.module('startApp')
	.controller('articleCtrl',[
		'$scope',
		'$http',
		'ArticleFactory',
		'ArticleUserFactory',
		'$localStorage',
		'$state',
		'multipartForm',
		'$stateParams',
		'AuthFactory',
		'commentFactory',
		function($scope,
			$http,
		    ArticleFactory,
		    ArticleUserFactory,
		    $localStorage,
		    $state,
		    multipartForm,
		    $stateParams,
		    AuthFactory,
		    commentFactory){

			/*RESTFUL articles */
			$scope.currentArticles = null;
			$scope.editArticle = null;
			

			$scope.listArticles = function(){
				$scope.articles = ArticleFactory.query(function(){
					//pagination
					PaginationCtrl($scope.articles);
				});
			}

			$scope.createArticle = function(article){
				new ArticleFactory(article).$create()
				.then(function(newArticle) {
					$scope.articles.push(newArticle);
				});
				$scope.currentArticles = '';
				$state.go('app.articles');
			}

			$scope.updateArticle = function(article) {
				article.$save({articleId:article._id})
				.then(function(UpArticle) {
					$scope.articles.splice(
						$scope.articles.indexOf(UpArticle),1,UpArticle);
					$scope.editArticle = null;
				});
				$scope.editArticle = '';
				$state.go('app.articles');
			}

			$scope.deleteArticle = function(article) {
				article.$delete({articleId:article._id})
				.then(function(){
					$scope.articles.splice($scope.articles.indexOf(article),1);
					$state.go('app.articles');
				});
			}

			$scope.cancelArticle = function() {
				$scope.editArticle = null;
				$state.go('app.articles');
			}

			$scope.createArticleByKey = function(article) {
				if(event.which == 13 && $scope.currentArticles != ""){
					new ArticleFactory(article).$create()
						.then(function(newArticle) {
						$scope.articles.push(newArticle);
					});
					$scope.currentArticles = '';

				}
			}

			//toArticle function
			$scope.toArticle = function(articleId) {
				$state.go('app.article',{articleId: articleId});

			}	
			var articleId = $stateParams.articleId;
			showArticle = function() {
				ArticleFactory.get({articleId:articleId}, 
					function(article){
						$scope.articleDetail = article;
				});
			}
			if(articleId){
				showArticle();
			}

			//Article edit
			$scope.editArticlefn = function(articleEidtId) {
				$state.go('app.articleEdit',{articleId: articleEidtId});
				window.location.reload();
			}
			var articleEidtId = $stateParams.articleId;
			editArticle = function() {
				ArticleFactory.get({articleId:articleEidtId}, 
					function(article){
						$scope.editArticle = article;

				});
			}
			if(articleEidtId){
				editArticle();
			}
			/*home article pages*/
			$scope.listHomeArticles = function() {
				$scope.homeArticles = ArticleUserFactory.query();
			}

			/*article User views*/
			$scope.listArticlesUser = function(){
				$scope.articlesUser = ArticleUserFactory.query(function(){
					//pagination
					PaginationCtrl($scope.articlesUser);
				});
			}

			$scope.toArticleUser = function(articleUserId) {
				$state.go('app.articleUser',{articleUserId: articleUserId});

			}	
			var articleUserId = $stateParams.articleUserId;
			showArticle = function() {
				ArticleUserFactory.get({articleUserId:articleUserId}, 
					function(article){
						$scope.articleUserDetail = article;
				});
			}
			if(articleUserId){
				showArticle();
			}

			//article comments
			$scope.mycomment = {
        		comment: ""
    		};

		    $scope.submitComment = function () {
		        commentFactory.save({articleId: $stateParams.articleId}, $scope.mycomment);
		        $state.go($state.current, {}, {reload: true});
		        /*$scope.commentForm.$setPristine();*/
		        $scope.mycomment = {
		            comment: ""
		        };
		    }


			//paginationctrl
			var PaginationCtrl = function(pageArticle) {
				$scope.viewby = 10;
				  	$scope.totalItems = pageArticle.length;
				  	$scope.currentPage = 1;
				  	$scope.itemsPerPage = $scope.viewby;
				  	$scope.maxSize = 5; //Number of pager buttons to show

				  	$scope.setPage = function (pageNo) {
				    	$scope.currentPage = pageNo;
				 	};

				  	$scope.pageChanged = function() {
				    	console.log('Page changed to: ' + $scope.currentPage);
				  	};

					$scope.setItemsPerPage = function(num) {
				  		$scope.itemsPerPage = num;
				  		$scope.currentPage = 1; //reset to first paghe

					};
			}

			//uploadImage
 			$scope.uploadImage = function(pageImage) {
 				$http.post('http://localhost:8080/uploadImage', pageImage)
 				.then(function(r){
 					console.log(r);
 				});
 			}

			/*pageImage*/
			$scope.customer = {}
			$scope.Submit = function() {
				var pageImage = $scope.customer;
				var uploadUrl = '/uploadImage';
				multipartForm.post(uploadUrl, pageImage)
				.success(function(r){
				if($scope.currentArticles){
					$scope.currentArticles.pageImage = r.filename;
				}
				if($scope.editArticle){
					$scope.editArticle.pageImage = r.filename;
				}
			});
			}

			var isAuth = AuthFactory.isAuthenticated();
			if(isAuth){
				$scope.listArticles();
			};

			if(!isAuth){
				/*$scope.artHomeList();*/
				$scope.listArticlesUser();
			};

			$scope.listHomeArticles();
			
	}])
	.filter('trustHtml', function ($sce) {
    	return function (input) {
        	return $sce.trustAsHtml(input);
    	};
    });
})();