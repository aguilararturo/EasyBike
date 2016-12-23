(function () {
    'use strict';

    function StockService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var stockUrl = BASE_URL + '/Stock';


        function saveStocks(stocks) {
            return $http.post(stockUrl + '/AddStocks', stocks);
        }

        function getStockProductsQuantity() {
            var getByCatUrl = stockUrl + '/getStockProductsQuantity';
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getStockProductsQuantity'));
        }

        return {
            saveStocks: saveStocks,
            getStockProductsQuantity: getStockProductsQuantity
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('StockService', StockService);
})();
