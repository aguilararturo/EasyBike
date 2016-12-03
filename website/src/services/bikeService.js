(function () {
    'use strict';

    function BikeService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var BikeURL = BASE_URL + '/Bike';

        function getTodayBikes() {
            return $http.get(BikeRegisterURL + '/GetTodayAvaliable')
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('GetTodayAvaliable bikes'));
        }

        function saveBike(bike) {
            return $http.post(BikeURL, bike);
        }

        function getBikes() {
            return $http.get(BikeURL)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts(' bikes'));
        }

        return {
            saveBike: saveBike,
            getBikes: getBikes
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('BikeService', BikeService);
})();
