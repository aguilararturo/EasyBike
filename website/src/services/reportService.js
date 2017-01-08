(function () {
    'use strict';

    function ReportService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var stockUrl = BASE_URL + '/Report';

        function GetTopSellBike() {
            var getByCatUrl = stockUrl + '/GetTopSellBike';
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('GetTopSellBike'));
        }

        return {
            GetTopSellBike: GetTopSellBike
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('ReportService', ReportService);
})();
