(function() {
    'use strict';

    function CommonService($log, $http, $q, BASE_URL) {
        var reqHeaders = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        console.log('CommonService');
        function getMenu() {
            /**
            * @function successfullRequest
            * @author Arturo Aguilar
            * @desc log a warning when there are a problem loading the orders analytics
            * @param  {response} response response
            * @returns {Object} response data
            */
            function successfullRequest(response) {
                console.log('response', response);
                return response.data;
            }
            /**
            * @function errorLoadingScripts
            * @author Arturo Aguilar
            * @desc log a warning when there are a problem loading the orders analytics
            * @param  {Object} error details
            * @return {Promise} Rejected promise with error details.
            */
            function errorLoadingScripts(error) {
                $log.warn('There is a problem getting orders analytics.');
                $log.warn(error);
                return $q.reject(error);
            }
            var ordersURL = BASE_URL + '/menu';

            console.log('url', ordersURL);

            return $http.get(ordersURL)
                .then(successfullRequest)
                .catch(errorLoadingScripts);
        }

        function saveUser(client) {
            var ordersURL = BASE_URL + '/client';
            return $http.post(ordersURL, client);
        }

        function saveBike(bike) {
            var ordersURL = BASE_URL + '/bike';
            return $http.post(ordersURL, bike);
        }

        function getUser() {
            /**
            * @function successfullRequest
            * @author Arturo Aguilar
            * @desc log a warning when there are a problem loading the orders analytics
            * @param  {response} response response
            * @returns {Object} response data
            */
            function successfullRequest(response) {
                console.log('response', response);
                return response.data;
            }
            /**
            * @function errorLoadingScripts
            * @author Arturo Aguilar
            * @desc log a warning when there are a problem loading the orders analytics
            * @param  {Object} error details
            * @return {Promise} Rejected promise with error details.
            */
            function errorLoadingScripts(error) {
                $log.warn('There is a problem getting Users.');
                $log.warn(error);
                return $q.reject(error);
            }
            var ordersURL = BASE_URL + '/client';

            console.log('url', ordersURL);

            return $http.get(ordersURL)
                .then(successfullRequest)
                .catch(errorLoadingScripts);
        }

        return {
            getMenu: getMenu,
            getUser: getUser,
            saveUser: saveUser,
            saveBike: saveBike
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('CommonService', CommonService);
})();
