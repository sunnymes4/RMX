/**
 * Created by Santhosh on 11-Jan-16.
 */
angular.module('rmx-ui-portal').
    constant('API_CONFIG', function () {

        // Setting base domain of the API service
        // This will work on local docker instance
        //var BASE_URL = 'http://192.168.99.100:8080/';
        var BASE_URL = 'http://deployment.custologix.co.in:8080/';

        return {
        	// This will work on local docker instance.
            //'POS_SERVICE': BASE_URL + 'rmxmvp-pos-1.0-SNAPSHOT/'
            // This will work on deployment server
            'POS_SERVICE': BASE_URL + 'rmxmvp-service-pos-1.0-SNAPSHOT/'
        }

    });