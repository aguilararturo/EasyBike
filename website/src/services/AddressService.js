(function () {
    'use strict';

    function AddressService($log, $http, $q, BASE_URL, BIKE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var getOrderDeliveryAddresUrl = BASE_URL + '/Addresses/getOrderDeliveryAddress';

        function getSearchable() {
            return $http.get(BASE_URL + '/Addresses/getSearchable', {
                cache: true
            })
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getSearchable'));
        }

        function getOrderDeliveryAddress() {

            return $http.get(getOrderDeliveryAddresUrl, {
                cache: true
            })
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getOrderDeliveryAddress'));
        }

        function cleanGetOrderDeliveryAddress() {
            requestService.successRequestClearCache(getOrderDeliveryAddresUrl);
        }

        return {
            getSearchable: getSearchable,
            getOrderDeliveryAddress: getOrderDeliveryAddress,
            cleanGetOrderDeliveryAddress: cleanGetOrderDeliveryAddress
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('AddressService', AddressService);
})();
