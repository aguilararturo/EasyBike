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
        $stateProvider.state('business', {
            url: '/business',
            templateUrl: 'business/business.tpl.html',
            controller: 'BusinessController',
            controllerAs: 'busCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Business')
        .config(bikesPageConfig);
})();
