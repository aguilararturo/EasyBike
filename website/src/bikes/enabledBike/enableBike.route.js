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
        $stateProvider.state('new-enable-bike', {
            url: '/newEnabledBike',
            templateUrl: 'bikes/enabledBike/enableBike.tpl.html',
            controller: 'EnableBikeController',
            controllerAs: 'enableBikeCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Bikes')
        .config(userRegPageConfig);
})();
