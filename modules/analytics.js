/**
 * Created by Santhosh on 06-Jan-16.
 */

var analytics = angular.module('AN', [])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        $stateProvider
            .state('index.an', {
                url: "/analytics",
                templateUrl: "views/analytics.html",
                controller: 'AnalyticsController',
                resolve: {
                    loadModule: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {   name: 'AN',
                                files: [
                                    'controllers/analyticsCtrl.js'
                                ]
                            }
                        ]);
                    }
                }
            })
    }]);
