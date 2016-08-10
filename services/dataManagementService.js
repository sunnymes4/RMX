/**
 * Created by Santhosh on 11-Jan-16.
 */
dataManagement.service('DataManagementService', ['$http', '$q', 'API_CONFIG', '$cookieStore',
    function ($http, $q, API_CONFIG, $cookieStore) {

        this.getDMInfo = function () {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'dminformation/info'/**,
                headers: {
                    'X-Auth-Token': $cookieStore.get('SESSION')
                }
                */
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(err){
                    console.log(err);
                    defer.reject(err);
                });
            return defer.promise;
        }

        this.saveDMInfo = function(data){
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: API_CONFIG().POS_SERVICE + '/DMData/update',
                data: angular.toJson(data)/**,
                headers: {
                    'X-Auth-Token': $cookieStore.get('SESSION')
                }
                */
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(err){
                    console.log(err);
                    defer.reject(err);
                });
            return defer.promise;
        }

        this.getGeneralLookupList = function(categoryId){
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'generallookup/list/'+categoryId/**,
                headers: {
                    'X-Auth-Token': $cookieStore.get('SESSION')
                }
                */
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

        this.getWorkflowStatus= function(typeId, categoryId){
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'workflow/status/'+typeId+'/'+categoryId/**,
                headers: {
                    'X-Auth-Token': $cookieStore.get('SESSION')
                }
                */
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(err){
                    defer.reject(err);
                });
            return defer.promise;
        }

    }]);