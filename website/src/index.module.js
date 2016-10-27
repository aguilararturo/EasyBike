(function() {
    'use strict';

    /**
     * @module HindaApp
     */
    angular
        .module('EasyBikeApp', [
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
            'EasyBikeApp.User']);
    console.log('indexmodule');
})();
