var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) 
    { 
    $routeProvider
    .when('/',
        {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
    .when('/weather',
        {
            templateUrl: 'pages/weather.html',
            controller: 'weatherController'
        })
    });

myApp.controller('homeController', ['$scope', function ($scope)
    {

    }]);
myApp.controller('weatherController', ['$scope', '$http', function ($scope, $http) 
    {
        $scope.location = "Denver";
        $("#dna").click(function()
            {
            $scope.location = $("#cityIn").val();
            $http.get('http://api.apixu.com/v1/current.json?key=4326f1080d374bd8a6b151825161602&q=' + $scope.location.replace(' ', '+'))
                .success(function(result) {
                    console.log("You are so smart");
                    $scope.name = result.location.name + ", " + result.location.region;
                    $scope.country = result.location.country;
                    $scope.now = result.current.condition.text;
                    $scope.temp = result.current.temp_f + " degrees Fahrenheit";
                })
                .error(function(data, status) {
                    console.log("You failed, but you are still smart.");
                });
            });
    }]);


$(document).on('click','.navbar-collapse.in',function(e)
    {
    if( $(e.target).is('a') ) 
        {
        $(this).collapse('hide');
        }
    });
