
angular.module('rmx-ui-portal', [

    // Core modules
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'ngCookies',
    'ui.bootstrap',
    // 'nvd3ChartDirectives',
    'nvd3',
    'rzModule',
    'uiSwitch',
    'agGrid',

    'ui-notification',

    'ngDropdowns',
    'oc.lazyLoad',

    // App modules
    'common',
    'DM',
    'SC',
    'PC',
    'RS',
    'AN'
])
    .config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise("/index/dataManagement");
        $httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Origin';
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:10000/*';

        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: "views/main-wrapper/content.html"
            });
    }]);
