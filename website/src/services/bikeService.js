(function () {
    'use strict';

    function BikeService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var BikeURL = BASE_URL + '/Bike';

        function validateCode(code) {
            return $http.get(BASE_URL + '/ValidateCode/' + code)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('ValidateCode bikes'));
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
            getBikes: getBikes,
            validateCode: validateCode
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('BikeService', BikeService);
})();
