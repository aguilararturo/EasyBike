(function () {
    'use strict';

    function requestService($log, $q, $cacheFactory, BIKE_URL, _) {
        /**
        * @function successfullRequest
        * @author Arturo Aguilar
        * @desc wrapper for the request response
        * @param  {response} response response
        * @returns {Object} response data
        */
        function successRequest(response) {
            if (_.isUndefined(response.data)) {
                return response;
            }
            return response.data;
        }

        function successRequestLog(message, key) {
            if (!_.isUndefined(key)) {
                var $httpDefaultCache = $cacheFactory.get('$http');
                $httpDefaultCache.remove(key);
            }
            return function successLogRequest(response) {
                $log.warn('Success Request for' + message);
                return response.data;
            };
        }

        function successRequestClearCache(key) {
            if (!_.isUndefined(key)) {
                var $httpDefaultCache = $cacheFactory.get('$http');
                $httpDefaultCache.remove(key);
            }
            return function successLogRequest(response) {
                return response;
            };
        }

        function successRequestClearBikeCache(response) {
            var $httpDefaultCache = $cacheFactory.get('$http');
            function removeKey(key) {
                $httpDefaultCache.remove(key);
            }
            _.each(BIKE_URL, removeKey);

            return response;
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
            successRequestLog: successRequestLog,
            successRequestClearCache: successRequestClearCache,
            successRequestClearBikeCache: successRequestClearBikeCache
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('requestService', requestService);
})();
