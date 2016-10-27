(function() {
    'use strict';

    /**
     * @function setup
     * @author Reynaldo Rivera
     * @desc Loads HindaApp on body element once the document is ready and the configuration is
     * available creating a new constant with the configuration info in HindaApp.Configuration
     * module.
     */
    function setup() {
        /**
         * @function loadAppAndConfiguration
         * @author Reynaldo Rivera
         * @desc Adds a constant to HindaApp.Configuraiton module with config data retrieved from
         * the API.
         * @param  {Object} config information for the site
         */
        function loadAppAndConfiguration(config) {
            angular.module('EasyBikeApp.Configuration')
                .constant('BASE_URL', window.EASYBIKE_BASE_URL)
                .constant('USE_RECAPTCHA_MOCK', window.EASYBIKE_USE_RECAPTCHA_MOCK);

            document.title = 'easyBike';
            angular.bootstrap(document.body, ['EasyBikeApp']);
        }

        loadAppAndConfiguration();
    }

    angular.element(document)
        .ready(setup);
})();
