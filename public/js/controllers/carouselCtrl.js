(function(){
	angular.module('startApp')
	.controller('carouselCtrl',[
		'$scope',
		'CarouselFactory',
		'multipartForm',
		function($scope,CarouselFactory,multipartForm) {

			$scope.currentCarousels = {};

			$scope.listCarousel = function() {
				$scope.carousels = CarouselFactory.query();
			}

			$scope.submitCarousel = function(carousel) {
				new CarouselFactory(carousel).$create()
				.then(function(newCarousel) {
					$scope.carousels.push(newCarousel);
				});
				$scope.currentCarousels = '';
			}
			$scope.deleteCarousel = function(carousel) {
				carousel.$delete({carouselId:carousel._id})
				.then(function(){
					$scope.carousels.splice($scope.carousels.indexOf(carousel),1);
				});
			}

			/*pageImage*/
			$scope.carouselsPic = {}
			$scope.SubmitUploadCarousel = function() {
				var pageImage = $scope.carouselsPic;
				var uploadUrl = '/uploadImage';
				multipartForm.post(uploadUrl, pageImage)
				.success(function(r){
					$scope.currentCarousels.carouselImage = r.filename;
			});
			}


			$scope.listCarousel();
		}]);
})();