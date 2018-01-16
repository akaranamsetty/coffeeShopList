var app = angular.module('caffeinehit.filters', []);

app.filter("join", function () {
	return function (arr, sep) {
		return arr.join(sep);
	};
});

app.filter("metersToMiles", function(){
  return function (distanceInMeters){
    return parseFloat(distanceInMeters)*0.000621371192;
  }
})

app.filter('dropDigits', function() {
  return function(floatNum) {
    return String(floatNum)
      .split('.')
      .map(function (d, i) { return i ? d.substr(0, 2) : d; })
      .join('.');
  };
});
