(function() {
    'use strict';

    /**
     * @module HindaApp
     */
    angular
        .module('EasyBikeApp', [
            'ngMap',
            'ui.router',
            'ui.bootstrap',
            'EasyBikeApp.Templates',
            'vcRecaptcha',
            'EasyBikeApp.Libraries',
            'EasyBikeApp.Services',
            'EasyBikeApp.Configuration',
            'EasyBikeApp.Menu',
            'EasyBikeApp.orders',
            'EasyBikeApp.Bikes',
            'EasyBikeApp.User',
            'EasyBikeApp.components',
            'EasyBikeApp.Modals',
            'EasyBikeApp.Product'
        ]);
    console.log('indexmodule');
})();
