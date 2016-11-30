(function () {
    'use strict';

    function ProductCategoryService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var productCatalogURL = BASE_URL + '/productCategory';

        function getDefaultProductCategory() {
            return $http.get(productCatalogURL + '/GetDefaultCategories')
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('Default Category'));
        }

        function saveProductCategory(productCatgory) {
            return $http.post(productCatalogURL, productCatgory);
        }

        return {
            getDefaultProductCategory: getDefaultProductCategory,
            saveProductCategory: saveProductCategory
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('ProductCategoryService', ProductCategoryService);
})();
