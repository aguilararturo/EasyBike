(function () {
    'use strict';

    /**
     * @function lodashFactory
     * @author Reynaldo Rivera
     * @desc Used to have lodash library available as an injectable item.
     * @return {Object}  lodash library to be included as a dependency
     */
    function lodashFactory() {
        return window._;
    }

    angular
        .module('EasyBikeApp.Libraries')
        .factory('_', lodashFactory);
})();
