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
        $stateProvider.state('new-user', {
            url: '/newUser',
            templateUrl: 'user/registration/userRegistration.tpl.html',
            controller: 'UserRegistrationController',
            controllerAs: 'userRegCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.User')
        .config(userRegPageConfig);
})();
