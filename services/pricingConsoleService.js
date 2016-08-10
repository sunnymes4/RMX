/**
 * Created by Santhosh on 14-Jan-16.
 */
pricingConsole.service('PricingConsoleService', ['$http', '$q', 'API_CONFIG', '$cookieStore',
    function ($http, $q, API_CONFIG, $cookieStore) {

        this.getPCInfo= function(){
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'pcinformation/info',
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

        this.savePCInfo= function(data){
            var defer = $q.defer();
            //data.startDate = data.startDate.getTime();
            //data.endDate = data.endDate.getTime();
            $http({
                method: 'POST',
                url: API_CONFIG().POS_SERVICE + 'pcinformation',
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

        this.getOptimizedResultData= function(){
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'pcinformation/results',
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

        this.getOptimizePriceForPlanogram= function(planogramId){
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_CONFIG().POS_SERVICE + 'pcinformation/getOptimsedPrice/'+planogramId,
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
        this.saveCategoryConsInfo = function(data){
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


    }]);