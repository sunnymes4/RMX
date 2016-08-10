/**
 * Created by Santhosh on 06-Jan-16.
 */

var reports = angular.module('RS', [])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        $stateProvider
            .state('index.rs', {
                url: "/reports",
                templateUrl: "views/reports.html",
                controller: 'ReportsController',
                resolve: {
                    loadModule: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {   name: 'RS',
                                files: [
                                    'controllers/reportsCtrl.js'
                                ]
                            }
                        ]);
                    }
                }
            })
    }])
    
    .directive('bars', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart"></div>',
         link: function (scope, element, attrs) {
           var data = attrs.data.split(','),
           chart = d3.select('#chart')
             .append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
         }
      };
   });;
