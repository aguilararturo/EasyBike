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
        $stateProvider.state('new-bike', {
            url: '/newBike',
            templateUrl: 'bikes/registration/bikeRegistration.tpl.html',
            controller: 'BikeRegistrationController',
            controllerAs: 'bikeRegCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Bikes')
        .config(userRegPageConfig);
})();
