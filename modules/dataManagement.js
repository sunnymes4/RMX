var dataManagement = angular.module('DM', [])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {

        $stateProvider
            .state('index.dm', {
                url: "/dataManagement",
                templateUrl: "views/dataManagement.html",
                controller: 'DataManagementController',
                resolve: {
                    loadModule: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'DM',
                                files: [
                                    'controllers/dataManagementCtrl.js',
                                    'directives/dataManagementDirectives.js',
                                    'services/dataManagementService.js'
                                ]
                            }
                        ]);
                    }
                }
            })
    }]);
