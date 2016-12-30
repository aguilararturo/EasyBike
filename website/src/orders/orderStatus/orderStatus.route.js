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
        $stateProvider.state('ordersStatus', {
            url: '/ordersStatus',
            templateUrl: 'orders/orderStatus/orderStatus.tpl.html',
            controller: 'OrdersStatusController',
            controllerAs: 'ordersStatusCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Orders')
        .config(orderPageConfig);
})();
