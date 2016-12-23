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
        $stateProvider.state('stock', {
            url: '/stock',
            templateUrl: 'stockPage/stockPage.tpl.html',
            controller: 'StockPageController',
            controllerAs: 'stockPageCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Stock')
        .config(orderPageConfig);
})();
