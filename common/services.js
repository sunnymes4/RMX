/**
 * Created by Santhosh on 11-Jan-16.
 */

commonModule.service('commonService', ['$http', '$q', 'API_CONFIG', '$cookieStore', function ($http, $q, API_CONFIG, $cookieStore) {

    var menuList = [];

    this.getMenuList = function () {

        var defer = $q.defer();

        //Checking the local list
        if (menuList.length) {
            defer.resolve(menuList);
        } else {

            // Getting from remote
            $http({
                url: API_CONFIG().POS_SERVICE + 'menu_service/',
                method: 'GET',
                headers: {'X-Auth-Token': $cookieStore.get('SESSION')}
            })
                .success(function (data) {
                    menuList = data;
                    defer.resolve(menuList);
                })
                .error(function (err) {
                    defer.reject(err);
                })
        }
        return defer.promise;
    }

    this.getGeneralLookupList = function(categoryId){
        var defer = $q.defer();

        $http({
            method: 'GET',
            url: API_CONFIG().POS_SERVICE + 'generallookup/list/'+categoryId,
            headers: {
                'X-Auth-Token': $cookieStore.get('SESSION')
            }
        })
            .success(function(data){
                defer.resolve(data);
            })
            .error(function(err){
                defer.reject(err);
            });
        return defer.promise;
    }

    this.getGeneralLookupListByCategory = function(typeId, categoryId){
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: API_CONFIG().POS_SERVICE + 'generallookup/list_with_all/'+typeId+'/'+categoryId,
            headers: {
                'X-Auth-Token': $cookieStore.get('SESSION')
            }
        })
            .success(function(data){
                defer.resolve(data);
            })
            .error(function(err){
                defer.reject(err);
            });
        return defer.promise;
    }

    this.getProductRelationship = function(typeId, depId, catId, subCatId, planogramId){
        var defer = $q.defer();

        $http({
            method: 'GET',
            url: API_CONFIG().POS_SERVICE + 'product_relationship/'+typeId+'/'+depId+'/'+catId+'/'+subCatId+'/'+planogramId,
             headers: {
                    'X-Auth-Token': $cookieStore.get('SESSION')
                }
        })
            .success(function(data){
                defer.resolve(data);
            })
            .error(function(err){
                defer.reject(err);
            });

        return defer.promise;
    }

    // Generating Random color
    this.getRandomColor  = function(){
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}]);