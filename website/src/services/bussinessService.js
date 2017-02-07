(function () {
    'use strict';

    function BussinessService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var businessURL = BASE_URL + '/business';

        function getBusinesses() {
            return $http.get(businessURL, {
                cache: true
            })
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('Business'));
        }

        var getWithCatsUrl = businessURL + '/GetWithCategories';

        function getBusinessesWithCategories() {
            return $http.get(getWithCatsUrl, {
                cache: true
            })
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('Business'));
        }

        function saveBusiness(business) {
            return $http.post(businessURL, business)
                .then(requestService.successRequestClearCache(businessURL))
                .then(requestService.successRequestClearCache(getWithCatsUrl));
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
