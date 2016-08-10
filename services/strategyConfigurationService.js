/**
 * Created by Santhosh on 13-Jan-16.
 */
strategyConfiguration.service('StrategyConfigService', ['$http', '$q', 'API_CONFIG', '$cookieStore',
    function ($http, $q, API_CONFIG, $cookieStore) {

        this.getSCInfo= function(){
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'scinformation/info',
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

        this.changeBarChartValueType= function(typeId, lookupId, valueType){
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + '/scinformation/charts/'+typeId+'/'+lookupId+'/'+valueType,
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

        this.saveSCInfo = function(data){
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: API_CONFIG().POS_SERVICE + 'scinformation/update',
                data: angular.toJson(data),
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

        this.getRoleClassificationData = function(typeId, depId, catId, subCatId, planogramId){
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'scinformation/matrix/'+typeId+'/'+depId+'/'+catId+'/'+subCatId+'/'+planogramId,
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


    }]);