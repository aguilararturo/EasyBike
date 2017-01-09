(function () {
    'use strict';


    function ReportController(ReportService, $filter) {
        var reportCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            reportCtrl.initDate = new Date();
            reportCtrl.endDate = new Date();
            reportCtrl.REPORT = {
                BIKE_ORDERS: 'bikeOrderCount',
                BIKE_DAY_ORDERS: 'bikeDayOrderCount',
                CLIENT_ORDERS: 'clientOrderCount',
                CLIENT_DAY_ORDERS: 'clientDayOrderCount'
            };
            reportCtrl.selectedReport = {};
            setReports();
        }

        function setReports() {
            reportCtrl.reportsKey = [{
                key: reportCtrl.REPORT.BIKE_ORDERS,
                title: 'Top Pedidos motociclistas'
            },
            {
                key: reportCtrl.REPORT.BIKE_DAY_ORDERS,
                title: 'Pedidos por dia motociclistas'
            },
            {
                key: reportCtrl.REPORT.CLIENT_ORDERS,
                title: 'Top Pedidos Clientes'
            },
            {
                key: reportCtrl.REPORT.CLIENT_DAY_ORDERS,
                title: 'Pedidos por dia Cliente'
            }
            ];
        }

        function goToReport(report) {
            reportCtrl.selectedReport = report;
            reportCtrl.items = {};
        }

        function loadData(response) {
            reportCtrl.items = response;
        }

        function getData() {
            var iDate = $filter('date')(reportCtrl.initDate, 'MM-dd-yyyy');
            var eDate = $filter('date')(reportCtrl.endDate, 'MM-dd-yyyy');
            switch (reportCtrl.selectedReport) {
                case reportCtrl.REPORT.BIKE_ORDERS:
                    ReportService.getTopSellBike(iDate, eDate).then(loadData);
                    break;
                case reportCtrl.REPORT.BIKE_DAY_ORDERS:
                    ReportService.getTopSellBikePerDay(iDate, eDate).then(loadData);
                    break;
                case reportCtrl.REPORT.CLIENT_ORDERS:
                    ReportService.getTopOrderUser(iDate, eDate).then(loadData);
                    break;
                case reportCtrl.REPORT.CLIENT_DAY_ORDERS:
                    ReportService.getTopOrderUserPerDay(iDate, eDate).then(loadData);
                    break;
                default:

            }
        }

        reportCtrl.$onInit = $onInit;
        reportCtrl.goToReport = goToReport;
        reportCtrl.getData = getData;
    }
    angular
        .module('EasyBikeApp.Report')
        .controller('ReportController', ReportController);
})();
