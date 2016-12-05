(function () {
    'use strict';

    function ProductService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var productURL = BASE_URL + '/Product';


        function saveProduct(Product) {
            return $http.post(productURL, Product);
        }

        function getProducts() {
            return $http.get(productURL)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('Products'));
        }

        function getProductsByCategory(categoryId, businessId) {
            var getByCatUrl = productURL + '/GetByCategory?businessId=' + businessId + '&categoryId=' + categoryId;
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getProductsByCategory'));
        }

        return {
            saveProduct: saveProduct,
            getProducts: getProducts,
            getProductsByCategory: getProductsByCategory
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('ProductService', ProductService);
})();
