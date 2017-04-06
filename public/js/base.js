(function(){
	angular.module('startApp',['ui.router','ngResource','ngDialog','ui.bootstrap'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
		//route for the home page we called app.
			.state('app',{
				url:'/',
				views: {
					/*'begin':{
						templateUrl:'views/begin.html',
						controller:'commenCtrl'
					},*/
					'header':{
						templateUrl: 'views/navbar.html',
						controller:'userCtrl'
					},
					'content':{
						templateUrl: 'views/home.html',
						controller: 'articleCtrl'
					},
					'footer':{
						templateUrl: 'views/footer.html'
					}
				}
			})

			//route for the content page
			.state('app.articles', {
				url:'articles',
				views: {
					'content@': {
						abstract:true,
						templateUrl: 'views/blog/articles.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.article', {
				url:'articles/:articleId',
				views: {
					'content@': {
						templateUrl: 'views/blog/article.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articlesUser', {
				url:'articlesUser',
				views: {
					'content@': {
						templateUrl: 'views/blog/articlesUser.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articleUser', {
				url:'articleUser/:articleUserId',
				views: {
					'content@': {
						templateUrl: 'views/blog/articleUser.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articleCreate', {
				url:'articlecreate',
				views: {
					'content@': {
						templateUrl: 'views/blog/articlecreate.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articleEdit', {
				url:'articleedit/:articleId',
				views: {
					'content@': {
						templateUrl: 'views/blog/articleedit.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.carousel', {
				url:'carousel',
				views: {
					'content@': {
						templateUrl: 'views/carousel.html',
						controller: 'carouselCtrl'
					}
				}
			})
			.state('app.users', {
				url:'users',
				views:{
					'content@': {
						templateUrl: 'views/user.html',
						controller: 'userCtrl'
					}
				}
			})
			/*.state('app.checkin', {
				url:'checkin',
				views:{
					'content@': {
						templateUrl: 'views/checkin.html',
						controller:'articleCtrl'
					}
				}
			})*/
			/*.state('app.articlesDetail', {
				url:'checkin/:articleId',
				views: {
					'content@': {
						params:{"message":null},
						templateUrl: 'views/articlesDetail.html',
						controller: 'articleCtrl'
					}
				}
			})*/
			.state('app.users.user', {
				url:'/user',
				views:{
					'': {
						templateUrl:'views/userinfo.html',
						controller:'userCtrl'
					}
				}
			});
		// router for the other page.
		$urlRouterProvider.otherwise('/');
	})
	//ckeditor editorOptions

	.directive('ckeditor', function($timeout) {
    return {
        require : '?ngModel',
        link : function(scope, element, attrs, ngModel) {
            var ckeditor = CKEDITOR.replace(element[0], {
                
            });
            if (!ngModel) {
                return;
            }
            ckeditor.on('instanceReady', function() {
                ckeditor.setData(ngModel.$viewValue);
            });
            function updateModel() {
            	 $timeout(function() {
            		ngModel.$setViewValue(ckeditor.getData());
            	});
            }

            ckeditor.on('change', updateModel);
            ckeditor.on('key', updateModel);
            ckeditor.on('dataReady', updateModel);

            ngModel.$render = function(value) {
                ckeditor.setData(ngModel.$viewValue);
            };
        }
    };
})

.directive('fileModel', ['$parse', function($parse) {
    	return {
    		restrict: 'A',
    		link: function(scope, element, attrs){
    			var model = $parse(attrs.fileModel);
    			var modelSetter = model.assign;

    			element.bind('change', function() {
    				scope.$apply(function(){
    					modelSetter(scope, element[0].files[0]);
    				});
    			});
    		}
    	};
    }]);

})(); 
