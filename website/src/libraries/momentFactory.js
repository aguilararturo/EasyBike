(function () {
    'use strict';

    /**
     * @function momentFactory
     * @author Reynaldo Rivera
     * @desc Used to have moment JS library available as an injectable item.
     * @return {Object}  moment JS library to be included as a dependency.
     */
    function momentFactory() {
        return window.moment;
    }

    angular
        .module('EasyBikeApp.Libraries')
        .factory('moment', momentFactory);
})();
