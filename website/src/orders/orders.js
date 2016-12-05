(function () {
    'use strict';
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
    function OrdersController(CommonService, BikeEnabledService, BussinessService, ProductService) {
        var ordersCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ordersCtrl.userEnable = false;
            ordersCtrl.oderTypeEnable = false;
            ordersCtrl.cartEnable = false;
            ordersCtrl.bikeEnable = false;
            ordersCtrl.user = {
                phones: [],
                addresses: []
            };
            ordersCtrl.businesses = {};
            ordersCtrl.selectedStep = {};
            ordersCtrl.todayBikes = [];
            ordersCtrl.selectedBusiness = {};
            ordersCtrl.businessValidate = false;
            ordersCtrl.userValidate = false;
            ordersCtrl.categoryProducts = [];

            ordersCtrl.steps = [
                {
                    key: 'home',
                    value: 'Orden',
                    selected: true
                },
                {
                    key: 'Usuario',
                    value: 'Usuario',
                    selected: false
                },
                {
                    key: 'order',
                    value: 'Pedido',
                    selected: false
                },
                {
                    key: 'bike',
                    value: 'Moto',
                    selected: false
                }

            ];

            ordersCtrl.userTitle = "Datos Usuario";
            ordersCtrl.number = '';

            ordersCtrl.steps = [
                {
                    title: 'Tipo de orden',
                    content: 'fa fa-home',
                    number: '1',
                    selected: true
                },
                {
                    title: 'Usuario',
                    content: 'fa fa-user',
                    number: '2',
                    selected: false
                },
                {
                    title: 'Pedido',
                    content: 'fa fa-shopping-cart',
                    number: '3',
                    selected: false
                },
                {
                    title: 'Moto',
                    content: 'fa fa-road',
                    number: '4',
                    selected: false
                }
            ];

            ordersCtrl.selectedStep = ordersCtrl.steps[0];
            console.log('init ordersCtrl');
            BussinessService.getBusinessesWithCategories().then(loadBusiness);
            BikeEnabledService.getTodayBikes().then(loadTodayBikes);
        }

        function getSelectedCategory() {
            function searchSelectedCat(cat) {
                return cat.selected === true;
            }
            return _.find(ordersCtrl.selectedBusiness.categories, searchSelectedCat);
        }

        function selectedCategoryChange(category) {
            ordersCtrl.selectedCategory = getSelectedCategory();
            ProductService.getProductsByCategory(ordersCtrl.selectedCategory.id, ordersCtrl.selectedBusiness.id)
                .then(loadProducts);
        }

        function loadProducts(response) {
            ordersCtrl.categoryProducts = response;
        }

        function loadBusiness(response) {

            function mapBusiness(business) {
                business.selected = false;
            }
            _.map(response, mapBusiness);
            ordersCtrl.businesses = response;

            console.log('ordersCtrl.businesses', ordersCtrl.businesses);
        }

        function selectBusiness(business) {
            function iterateBussines(item) {
                item.selected = item.id === business.id;
            }
            _.forEach(ordersCtrl.businesses, iterateBussines);

            ordersCtrl.selectedBusiness = business;
            ordersCtrl.businessValidate = true;
        }

        function loadUser(response) {
            ordersCtrl.user = response;
            ordersCtrl.userValidate = true;
        }

        function searchUser(number) {
            console.log('search User', number);
            if (!_.isEmpty(number.toString())) {
                CommonService.getUserByPhone(number).then(loadUser);
            }
        }

        function loadTodayBikes(response) {
            var bikes = [];

            function filterBikes(regBike) {
                bikes.push(regBike.bike);
            }
            _.forEach(response, filterBikes);
            ordersCtrl.todayBikes = bikes;
        }

        ordersCtrl.$onInit = $onInit;
        ordersCtrl.selectBusiness = selectBusiness;
        ordersCtrl.searchUser = searchUser;
        ordersCtrl.selectedCategoryChange = selectedCategoryChange;
    }
    angular
        .module('EasyBikeApp.orders')
        .controller('OrdersController', OrdersController);
})();
