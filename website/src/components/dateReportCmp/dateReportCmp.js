(function () {
    'use strict';

    /**
     * @function dateReportCmp
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function dateReportCmp() {
        return {
            restrict: 'E',
            templateUrl: 'components/dateReportCmp/dateReportCmp.tpl.html',
            controller: 'DateReportCmpController',
            controllerAs: 'dateRepCmpCtrl',
            bindToController: {
                initDate: '=',
                endDate: '=',
                action: '&?'
            },
            scope: true
        };
    }
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} $element directive element
     * @param  {Object} $scope directive scope
     * @param  {Object} CatalogService catalog service
     * @param  {Object} SearchService search service
     * @param  {Object} BrandingModel Branding Model service
     * @param  {const} UTILS_CONSTANT used to go search state based on selected brand
     * @param  {const} DISPLAY_SIZES display size
     * @param  {Object} URLUtils util to validate the image url
     * @param  {Object} UtilityService Utility Service
     * @param  {Object} _ Lodash lodash
     */
    function DateReportCmpController(_) {
        var dateRepCmpCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            dateRepCmpCtrl.initDateOpen = false;
            dateRepCmpCtrl.endDateOpen = false;
            dateRepCmpCtrl.dateOptions = {
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            dateRepCmpCtrl.displayActionBtn = !_.isUndefined(dateRepCmpCtrl.action);
        }

        function openInitDate() {
            dateRepCmpCtrl.initDateOpen = true;
        }

        function openEndDate() {
            dateRepCmpCtrl.endDateOpen = true;
        }

        function changeInitDate() {
            if (dateRepCmpCtrl.endDate < dateRepCmpCtrl.initDate) {
                dateRepCmpCtrl.endDate = dateRepCmpCtrl.initDate;
            }
            dateRepCmpCtrl.dateOptions.minDate = dateRepCmpCtrl.initDate;
        }

        function launchAction() {
            if (!_.isUndefined(dateRepCmpCtrl.action)) {
                dateRepCmpCtrl.action();
            }
        }

        dateRepCmpCtrl.$onInit = $onInit;
        dateRepCmpCtrl.openInitDate = openInitDate;
        dateRepCmpCtrl.openEndDate = openEndDate;
        dateRepCmpCtrl.changeInitDate = changeInitDate;
        dateRepCmpCtrl.launchAction = launchAction;
    }
    angular
        .module('EasyBikeApp.Bikes')
        .controller('DateReportCmpController', DateReportCmpController)
        .directive('dateReportCmp', dateReportCmp);
})();
