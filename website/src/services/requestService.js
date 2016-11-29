(function () {
    'use strict';

    function requestService($log, $q) {
        /**
        * @function successfullRequest
        * @author Arturo Aguilar
        * @desc wrapper for the request response
        * @param  {response} response response
        * @returns {Object} response data
        */
        function successRequest(response) {
            return response.data;
        }

        function successRequestLog(message) {
            return function successLogRequest(response) {
                $log.warn('Success Request for' + message);
                return response.data;
            };
        }

        /**
        * @function errorLoadingScripts
        * @author Arturo Aguilar
        * @desc log a warning when there are a problem loading the orders analytics
        * @param  {string} message message to log
        * @return {Promise} Rejected promise with error details.
        */
        function errorLoadingScripts(message) {
            return function errorRequest(error) {
                $log.warn('There is a problem getting orders ' + message);
                $log.warn(error);
                return $q.reject(error);
            };
        }

        return {
            successRequest: successRequest,
            errorLoadingScripts: errorLoadingScripts,
            successRequestLog: successRequestLog
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('requestService', requestService);
})();
