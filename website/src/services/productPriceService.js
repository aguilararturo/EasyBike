(function () {
    'use strict';

    function ProductPriceService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var stockUrl = BASE_URL + '/PriceProduct';


        function savePrices(prices) {
            return $http.post(stockUrl + '/addPriceGroup', prices);
        }

        function getStockProductsQuantity() {
            var getByCatUrl = stockUrl + '/getStockProductsQuantity';
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getStockProductsQuantity'));
        }

        return {
            savePrices: savePrices,
            getStockProductsQuantity: getStockProductsQuantity
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('ProductPriceService', ProductPriceService);
})();
