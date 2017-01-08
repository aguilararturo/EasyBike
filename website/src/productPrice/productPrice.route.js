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
        $stateProvider.state('productPrice', {
            url: '/productPrice',
            templateUrl: 'productPrice/productPrice.tpl.html',
            controller: 'ProductPriceController',
            controllerAs: 'productPriceCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.ProductPrice')
        .config(orderPageConfig);
})();
