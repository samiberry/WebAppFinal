var ngDemo = angular.module('ngDemo', ['ngRoute']);

ngDemo.config(function($routeProvider) 
    {
    $routeProvider
        .when('/', 
              {
              templateUrl : 'pages/map.html',
              controller  : 'mainController'
			  })
        .when('/weather', 
              {
              templateUrl : 'pages/weather.html',
              controller  : 'mapController'
			  });
	});

ngDemo.controller('mapController', function($scope) 
    {
    $scope.message = 'See what cool things Angular can do!';
	});


$(document).on('click','.navbar-collapse.in',function(e)
    {
    if( $(e.target).is('a') ) 
        {
        $(this).collapse('hide');
        }
    });