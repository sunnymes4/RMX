/**
 * Created by Santhosh on 06-Jan-16.
 */
dataManagement
    .directive('agGridResize', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            scope: {
                modelToWatch: '=watch',
                gridAPI: '=gridapi'
            },
            link: function (scope) {
                scope.$watch('modelToWatch', function () {
                    $timeout(function () {
                        scope.gridAPI && scope.gridAPI.api && scope.gridAPI.api.sizeColumnsToFit();
                    }, 1000);
                })
            }
        };
    }]);