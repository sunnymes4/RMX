/**
 * Created by Santhosh on 11-Jan-16.
 */
commonModule.controller('NavigationController', ['$scope', 'commonService', '$rootScope', function ($scope, commonService, $rootScope) {

    // Get the menu list from service
    var getMenuList = function () {
        commonService.getMenuList().then(function (data) {
            $scope.menuList = data;
            console.log(data);
        }, function (err) {
            alert('Error while getting Menu List');
        })
    }

    getMenuList();

    $scope.loadData = function (thirdLevel, secondLevel, firstLevel, item) {
        var objToSend = {};
        if (secondLevel && secondLevel.menuId) {
            objToSend['3'] = secondLevel.menuId;
            objToSend['3name'] = secondLevel.name;
        }
        if (firstLevel && firstLevel.menuId) {
            objToSend['2'] = firstLevel.menuId;
            objToSend['2name'] = firstLevel.name;
        }
        if (item && item.menuId) {
            objToSend['1'] = item.menuId;
            objToSend['1name'] = item.name;
        }
        if (thirdLevel && thirdLevel.menuId) {
            objToSend['4'] = thirdLevel.menuId;
            objToSend['4name'] = thirdLevel.name;
            $rootScope.$broadcast('$OnLevelSelect', {itemSelected: objToSend})
        }
    }
}]);