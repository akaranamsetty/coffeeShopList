var app = angular.module('caffeinehit.services', []);

app.service("YelpService", function ($q, $http, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
    'lat': 37.418061,
    'lon':  -121.979227,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();

			/*ionic.Platform.ready(function(){
			  $cordovaGeolocation.getCurrentPosition({timeout:1000, enableHighAccuracy:false}).then(function(position){
			    self.lat = position.coords.latitude;
			    self.lon = position.coords.longitude;
          var params = {
            page: self.page,
            lat: self.lat,
            lon: self.lon
          };
          $http.get('https://api.codecraft.tv/samples/v1/coffee/', {params: params})
            .success(function (data) {
              self.isLoading = false;
              console.log(data);

              if (data.businesses.length == 0) {
                self.hasMore = false;
              } else {
                angular.forEach(data.businesses, function (business) {
                  self.results.push(business);
                });
              }

              deferred.resolve();
            })
            .error(function (data, status, headers, config) {
              self.isLoading = false;
              deferred.reject(data);
            });
        }, function(error){
			    console.log('Error retrieving position', error);
			    $ionicPopup.alert({
            'title': 'Please switch on geolocation',
            'template': 'Looks like geolocation has been turned off for this app. Please go to "Settings" and turn it on'
          });
        })
      });*/

      var params = {
        page: self.page,
        lat: self.lat,
        lon: self.lon
      };
      $http.get('https://api.codecraft.tv/samples/v1/coffee/', {params: params})
        .success(function (data) {
          self.isLoading = false;
          console.log(data);

          if (data.businesses.length == 0) {
            self.hasMore = false;
          } else {
            angular.forEach(data.businesses, function (business) {
              self.results.push(business);
            });
          }

          deferred.resolve();
        })
        .error(function (data, status, headers, config) {
          self.isLoading = false;
          deferred.reject(data);
        });

			return deferred.promise;
		}
	};

	self.load();

	return self;
});
