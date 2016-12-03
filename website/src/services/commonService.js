(function () {
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



        function getUserByPhone(phoneNumber) {
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
                $log.warn('There is a problem getting User by phone.');
                $log.warn(error);
                return $q.reject(error);
            }
            var getByPhoneURL = BASE_URL + '/client/GetByPhone/';

            console.log('url', getByPhoneURL);

            return $http.get(getByPhoneURL + phoneNumber)
                .then(successfullRequest)
                .catch(errorLoadingScripts);
        }

        function getProductCategories() {
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
                $log.warn('There is a problem getting product Categories.');
                $log.warn(error);
                return $q.reject(error);
            }
            var getByPhoneURL = BASE_URL + '/ProductCategory';

            console.log('url', getByPhoneURL);

            return $http.get(getByPhoneURL)
                .then(successfullRequest)
                .catch(errorLoadingScripts);
        }

        function getProducts() {
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
                $log.warn('There is a problem getting products.');
                $log.warn(error);
                return $q.reject(error);
            }
            var getByPhoneURL = BASE_URL + '/Product';

            console.log('url', getByPhoneURL);

            return $http.get(getByPhoneURL)
                .then(successfullRequest)
                .catch(errorLoadingScripts);
        }

        return {
            getUserByPhone: getUserByPhone,
            getProductCategories: getProductCategories,
            getMenu: getMenu,
            getUser: getUser,
            saveUser: saveUser,        
            getProducts: getProducts,
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('CommonService', CommonService);
})();
