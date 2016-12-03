(function () {
    'use strict';

    function BussinessService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var businessURL = BASE_URL + '/business';

        function getBusinesses() {
            return $http.get(businessURL)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('Business'));
        }

        function getBusinessesWithCategories() {
            return $http.get(businessURL + '/GetWithCategories')
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('Business'));
        }

        function saveBusiness(business) {
            return $http.post(businessURL, business);
        }

        return {
            getBusinesses: getBusinesses,
            saveBusiness: saveBusiness,
            getBusinessesWithCategories: getBusinessesWithCategories
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('BussinessService', BussinessService);
})();
