alert("Hey there");
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) 
    { 
    $routeProvider
    .when('/forecast/:days', 
        {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
        })   
    });

weatherApp.service('cityService', function() 
    {
    this.city = "Littleton, CO";  
    });

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) 
    {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() 
        {
        cityService.city = $scope.city; 
        }); 
    }]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) 
    {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=79d137b1c916315844dd407dd9e51dea", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    $scope.convertToFahrenheit = function(degK) 
        {
        return Math.round((1.8 * (degK - 273)) + 32);
        }
    
    $scope.convertToDate = function(dt) 
        { 
        return new Date(dt * 1000);
        };
    
}]);