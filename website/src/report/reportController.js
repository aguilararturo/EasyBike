(function () {
    'use strict';


    function ReportController(BussinessService) {
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
        }

        function loadBusiness(response) {
            reportCtrl.businesses = response;
        }


        reportCtrl.$onInit = $onInit;
    }
    angular
        .module('EasyBikeApp.Report')
        .controller('ReportController', ReportController);
})();
