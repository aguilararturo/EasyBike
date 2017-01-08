(function() {
    'use strict';
    /**
     * Create routes for info pages
     * @author Arturo Aguilar
     * @param  {$stateProvider} $stateProvider state provider service
     * @param  {constant} INFO_PAGES contant with info pages
     * @param {_} _ lodash
     */
    function bikesPageConfig($stateProvider) {
        $stateProvider.state('report', {
            url: '/report',
            templateUrl: 'report/report.tpl.html',
            controller: 'ReportController',
            controllerAs: 'reportCtrl',
            authenticate: null
        });
    }

    angular.module('EasyBikeApp.Report')
        .config(bikesPageConfig);
})();