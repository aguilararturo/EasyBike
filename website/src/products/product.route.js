(function() {
    'use strict';
    /**
     * Create routes for info pages
     * @author Arturo Aguilar
     * @param  {$stateProvider} $stateProvider state provider service
     * @param  {constant} INFO_PAGES contant with info pages
     * @param {_} _ lodash
     */
    function bikesPageConfig($stateProvider) {
        $stateProvider.state('product', {
            url: '/product',
            templateUrl: 'products/product.tpl.html',
            controller: 'ProductController',
            controllerAs: 'prodCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Product')
        .config(bikesPageConfig);
})();
