(function () {
    'use strict';

    function OrderService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var orderURL = BASE_URL + '/Order';


        function saveOrder(Product) {
            return $http.post(orderURL, Product);
        }

        return {
            saveOrder: saveOrder
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('OrderService', OrderService);
})();
