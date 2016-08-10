/**
 * Created by Santhosh on 06-Jan-16.
 */

var pricingConsole= angular.module('PC', [])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        $stateProvider
            .state('index.pc', {
                url: "/pricingConsole",
                templateUrl: "views/pricingConsole.html",
                controller: 'PricingConsoleController',
                resolve: {
                    loadModule: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {   name: 'PC',
                                files: [
                                    'controllers/pricingConsoleCtrl.js',
                                    'services/pricingConsoleService.js'
                                ]
                            }
                        ]);
                    }
                }
            })
    }]);
