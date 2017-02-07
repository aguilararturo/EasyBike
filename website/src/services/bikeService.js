(function () {
    'use strict';

    function BikeService($log, $http, $q, BASE_URL, BIKE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';


        function validateCode(code) {
            return $http.get(BASE_URL + '/ValidateCode/' + code)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('ValidateCode bikes'));
        }

        function saveBike(bike) {
            return $http.post(BIKE_URL.BIKE, bike)
                .then(requestService.successRequestClearBikeCache);
        }

        function getBikes() {
            return $http.get(BIKE_URL.BIKE)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts(' bikes'));
        }

        return {
            saveBike: saveBike,
            getBikes: getBikes,
            validateCode: validateCode
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('BikeService', BikeService);
})();
