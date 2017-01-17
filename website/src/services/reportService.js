(function () {
    'use strict';

    function ReportService($log, $http, $q, BASE_URL, requestService) {
        $http.defaults.headers.common.Accept = 'text/plain';
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        var stockUrl = BASE_URL + '/Report';

        function getTopSellBike(initDate, endDate) {
            var getByCatUrl = stockUrl + '/GetTopSellBike/' + initDate + '/' + endDate;
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('GetTopSellBike'));
        }

        function getTopSellBikePerDay(initDate, endDate) {
            var getByCatUrl = stockUrl + '/getTopSellBikePerDay/' + initDate + '/' + endDate;
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getTopSellBikePerDay'));
        }

        function getTopOrderUserPerDay(initDate, endDate) {
            var getByCatUrl = stockUrl + '/getTopOrderUserPerDay/' + initDate + '/' + endDate;
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getTopOrderUserPerDay'));
        }

        function getTopOrderUser(initDate, endDate) {
            var getByCatUrl = stockUrl + '/getTopOrderUser/' + initDate + '/' + endDate;
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getTopOrderUser'));
        }

        function getEnabledBikePerDay(initDate, endDate) {
            var getByCatUrl = stockUrl + '/getEnabledBikePerDay/' + initDate + '/' + endDate;
            return $http.get(getByCatUrl)
                .then(requestService.successRequest)
                .catch(requestService.errorLoadingScripts('getEnabledBikePerDay'));
        }

        return {
            getTopSellBike: getTopSellBike,
            getTopSellBikePerDay: getTopSellBikePerDay,
            getTopOrderUserPerDay: getTopOrderUserPerDay,
            getTopOrderUser: getTopOrderUser,
            getEnabledBikePerDay: getEnabledBikePerDay
        };
    }

    angular
        .module('EasyBikeApp.Services')
        .service('ReportService', ReportService);
})();
