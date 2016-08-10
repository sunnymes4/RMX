/**
 * Created by Santhosh on 06-Jan-16.
 */

var strategyConfiguration = angular.module('SC', [])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        $stateProvider
            .state('index.sc', {
                url: "/strategyConfiguration",
                templateUrl: "views/strategyConfiguration.html",
                controller: 'StrategyConfigurationController',
                resolve: {
                    loadModule: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {   name: 'SC',
                                files: [
                                    'controllers/strategyConfigurationCtrl.js',
                                    'services/strategyConfigurationService.js'
                                ]
                            }
                        ]);
                    }
                }
            })
    }]);
