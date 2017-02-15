(function () {
    'use strict';

    function AddressService($log, $http, $q, BASE_URL, BIKE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        function getSearchable() {
            return $http.get(BASE_URL + '/Addresses/getSearchable', {
                cache: true
            })
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getSearchable'));
        }

        return {
            getSearchable: getSearchable
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('AddressService', AddressService);
})();
