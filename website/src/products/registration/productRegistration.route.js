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
        $stateProvider.state('new-product', {
            url: '/newProduct',
            templateUrl: 'products/registration/productRegistration.tpl.html',
            controller: 'ProductRegistrationController',
            controllerAs: 'prodRegCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Product')
        .config(userRegPageConfig);
})();
