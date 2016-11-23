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
        $stateProvider.state('new-business', {
            url: '/newBusiness',
            templateUrl: 'business/registration/businessRegistration.tpl.html',
            controller: 'BusinessRegistrationController',
            controllerAs: 'busRegCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Business')
        .config(userRegPageConfig);
})();
