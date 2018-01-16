var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function ($scope, YelpService) {
	$scope.yelp = YelpService;
	$scope.refresh = function(){
	  if(!$scope.yelp.isLoading){
	    $scope.yelp.refresh().then(function(){
	      $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }
  $scope.loadMore = function(){
	  if(!$scope.yelp.isLoading && $scope.yelp.hasMore) {
      $scope.yelp.next().then(function(){
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  }
  $scope.openInMaps = function(){
    console.log('Opening in Maps');
  }
  $scope.getDirections = function(){
    console.log('Getting Directions');
  }
});
