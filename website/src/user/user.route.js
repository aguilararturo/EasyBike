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
        $stateProvider.state('user', {
            url: '/user',
            templateUrl: 'user/user.tpl.html',
            controller: 'UserController',
            controllerAs: 'userCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.User')
        .config(bikesPageConfig);
})();
