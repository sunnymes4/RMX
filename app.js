
angular.module('testApp', [

    // Core modules
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/login");


        $stateProvider
            .state('sign-in', {
                url: "/",
                templateUrl: "sign-in.html",
                controller: "loginCtrl"

            })
            .state('main', {
                url: '/',
                templateUrl:'main.html'
            });
       $locationProvider.html5Mode(true);
    }])

.controller('loginCtrl', ["$scope","$state", function ($scope, $state) {
    $scope.user = {};
    $scope.login = function () {
        if ($scope.user.userName == 'sunny@gmail.com' && $scope.user.password == 123) {
            alert($scope.user.userName);
            $state.go('main');
        } else {
            alert($scope.user.password);
        }
    }
}])
