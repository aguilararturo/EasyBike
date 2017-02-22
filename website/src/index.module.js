(function () {
    'use strict';

    /**
     * @module HindaApp
     */
    angular
        .module('EasyBikeApp', [
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'ngMap',
            'angularMoment',
            'EasyBikeApp.Templates',
            'vcRecaptcha',
            'EasyBikeApp.Libraries',
            'EasyBikeApp.Services',
            'EasyBikeApp.Configuration',
            'EasyBikeApp.Menu',
            'EasyBikeApp.Orders',
            'EasyBikeApp.Bikes',
            'EasyBikeApp.User',
            'EasyBikeApp.Components',
            'EasyBikeApp.Modals',
            'EasyBikeApp.Product',
            'EasyBikeApp.Business',
            'EasyBikeApp.Utils',
            'EasyBikeApp.Stock',
            'EasyBikeApp.ProductPrice',
            'EasyBikeApp.Report'
        ]);

    angular.module('EasyBikeApp').config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
})();
