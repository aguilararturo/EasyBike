(function () {
    'use strict';

    function BikeEnabledService($log, $http, $q, BASE_URL, BIKE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        function getTodayBikes() {
            return $http.get(BIKE_URL.TODAY_AVALIABLE, {
                cache: true
            })
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('GetTodayAvaliable bikes'));
        }

        function saveBikeRegister(bike) {
            return $http.post(BIKE_URL.BIKE_REGISTER, bike)
                .then(requestService.successRequestClearBikeCache);
        }

        function disableBikeRegister(bike) {
            return $http.put(BIKE_URL.DISABLE_BIKE, bike)
                .then(requestService.successRequestClearBikeCache);
        }

        function getTodayAvaliableWithouOrder() {
            return $http.get(BIKE_URL.TODAY_AVALIABLE_WITHOU_ORDER, {
                cache: true
            })
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('GetTodayAvaliableWithouOrder'));
        }

        return {
            disableBikeRegister: disableBikeRegister,
            getTodayBikes: getTodayBikes,
            saveBikeRegister: saveBikeRegister,
            getTodayAvaliableWithouOrder: getTodayAvaliableWithouOrder
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('BikeEnabledService', BikeEnabledService);
})();
