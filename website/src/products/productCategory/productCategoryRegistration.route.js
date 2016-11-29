(function() {
    'use strict';
    /**
     * Create routes for info pages
     * @author Arturo Aguilar
     * @param  {$stateProvider} $stateProvider state provider service
     * @param  {constant} INFO_PAGES contant with info pages
     * @param {_} _ lodash
     */
    function userRegPageConfig($stateProvider) {
        $stateProvider.state('new-productCategory', {
            url: '/newProductCategory',
            templateUrl: 'products/productCategory/productCategoryRegistration.tpl.html',
            controller: 'ProductCategoryRegistrationController',
            controllerAs: 'prodCatRegCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Product')
        .config(userRegPageConfig);
})();
