(function () {
    'use strict';
    /**
     * Create routes for info pages
     * @author Arturo Aguilar
     * @param  {$stateProvider} $stateProvider state provider service
     * @param  {constant} INFO_PAGES contant with info pages
     * @param {_} _ lodash
     */
    function orderPageConfig($stateProvider) {
        $stateProvider.state('orders', {
            url: '/orders',
            templateUrl: 'orders/orders.tpl.html',
            controller: 'OrdersController',
            controllerAs: 'ordersCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.orders')
        .config(orderPageConfig);
})();
