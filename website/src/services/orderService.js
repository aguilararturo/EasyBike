(function () {
    'use strict';

    function OrderService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var orderURL = BASE_URL + '/Order';


        function saveOrder(Product) {
            return $http.post(orderURL, Product);
        }

        function getTodayInTransit() {
            return $http.get(orderURL + '/GetTodayInTransit')
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('GetTodayInTransit'));
        }

        function deliverOrder(order) {
            return $http.post(orderURL + '/DeliverOrder', order);
        }

        return {
            saveOrder: saveOrder,
            getTodayInTransit: getTodayInTransit,
            deliverOrder: deliverOrder
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('OrderService', OrderService);
})();
