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
        $stateProvider.state('bikes', {
            url: '/bike',
            templateUrl: 'bikes/bikes.tpl.html',
            controller: 'BikesController',
            controllerAs: 'bikesCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Bikes')
        .config(bikesPageConfig);
})();
