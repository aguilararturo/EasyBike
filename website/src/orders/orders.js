(function () {
    'use strict';
    /**
     * @function FeaturedBrandsController
     * @desc Controller to load the brands from Catalog service or search service
     * @param  {Object} CatalogService catalog service
     * @param  {Object} SearchService search service
     * @param  {Object} BrandingModel Branding Model service
     * @param  {const} UTILS_CONSTANT used to go search state based on selected brand
     * @param  {const} DISPLAY_SIZES display size
     * @param  {Object} URLUtils util to validate the image url
     * @param  {Object} UtilityService Utility Service
     * @param  {Object} _ Lodash lodash
     */
    function OrdersController(CommonService, BikeEnabledService, BussinessService, ProductService, UtilityService, _, OrderService, ModalUtility, $q, $scope) {
        var ordersCtrl = this;
        var KEYS = {
            ORDER: 'Pedido',
            TYPE_ORDER: 'Tipo de orden',
            USER: 'Usuario',
            BIKE: 'Moto'
        };

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ordersCtrl.searchBussinesText = '';

            ordersCtrl.userEnable = false;
            ordersCtrl.oderTypeEnable = false;
            ordersCtrl.cartEnable = false;
            ordersCtrl.bikeEnable = false;
            ordersCtrl.businesses = [];
            ordersCtrl.selectedStep = {};
            ordersCtrl.todayBikes = [];
            ordersCtrl.selectedBusiness = {};
            ordersCtrl.businessValidate = false;
            ordersCtrl.categoryProducts = [];

            ordersCtrl.showAddProductOrder = false;

            ordersCtrl.userTitle = 'Datos Usuario';
            ordersCtrl.number = '';

            ordersCtrl.steps = [
                {
                    title: KEYS.TYPE_ORDER,
                    content: 'fa fa-home',
                    number: '1',
                    selected: true,
                    validated: false
                },
                {
                    title: KEYS.USER,
                    content: 'fa fa-user',
                    number: '2',
                    selected: false,
                    validated: false
                },
                {
                    title: KEYS.ORDER,
                    content: 'fa fa-shopping-cart',
                    number: '3',
                    selected: false,
                    validated: false
                },
                {
                    title: KEYS.BIKE,
                    content: 'fa fa-road',
                    number: '4',
                    selected: false,
                    validated: false
                }
            ];

            initializeNewOrder();

            ordersCtrl.selectedStep = ordersCtrl.steps[0];
            BussinessService.getBusinessesWithCategories().then(loadBusiness);
            BikeEnabledService.getTodayAvaliableWithouOrder().then(loadTodayBikes);
            initializeNewOrderProduct();
        }

        function initializeNewOrder() {
            ordersCtrl.order = {
                id: '',
                client: {
                    id: 0,
                    phones: [],
                    name: '',
                    nit: '',
                    lastName: '',
                    imageUrl: '',
                    addresses: []
                },
                orderProducts: [],
                deliveryAddress: {},
                bike: {}
            };
        }

        function initializeNewOrderProduct() {
            ordersCtrl.newOrderProduct = {
                id: '',
                quantity: 1,
                product: {}
            };
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
        }

        function selectBusiness(business) {
            function iterateBussines(item) {
                item.selected = item.id === business.id;
            }
            _.forEach(ordersCtrl.businesses, iterateBussines);

            ordersCtrl.selectedBusiness = business;
            ordersCtrl.businessValidate = true;

            validateStep(KEYS.TYPE_ORDER, true);
        }

        function loadUser(response) {
            ordersCtrl.order.client = response;
        }

        function searchUser(number) {
            console.log('search User', number);
            if (_.isNull(number)) {
                return;
            }

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

        function selectProduct(product) {
            ordersCtrl.showAddProductOrder = true;
            ordersCtrl.newOrderProduct.product = product;
        }

        function addCartProduct(orderProduct) {
            orderProduct.product.business = ordersCtrl.selectedBusiness;
            function searchProd(prod) {
                return prod.product.id === orderProduct.product.id;
            }

            var product = _.find(ordersCtrl.order.orderProducts, searchProd);
            if (_.isUndefined(product)) {
                ordersCtrl.order.orderProducts.push(orderProduct);
            } else {
                product.quantity += orderProduct.quantity;
            }
            ordersCtrl.showAddProductOrder = false;
            initializeNewOrderProduct();

            validatedOrderDetail();
        }

        function validatedOrderDetail() {
            validateStep(KEYS.ORDER, _.size(ordersCtrl.order.orderProducts) > 0);
        }

        function cancelCartProduct() {
            ordersCtrl.showAddProductOrder = false;
        }

        function removeCartProduct(orderProduct) {
            _.pull(ordersCtrl.order.orderProducts, orderProduct);
            validatedOrderDetail();
        }

        function selectAddressChange() {
            ordersCtrl.order.deliveryAddress = UtilityService.getSelected(ordersCtrl.order.client.addresses);
            if (!_.isUndefined(ordersCtrl.order.deliveryAddress)) {
                if (!_.isEmpty(ordersCtrl.order.deliveryAddress.location)) {
                    validateStep(KEYS.USER, true);
                }
            }
        }

        function validateStep(key, selected) {
            function findStep(item) {
                return item.title === key;
            }
            var step = _.find(ordersCtrl.steps, findStep);
            step.validated = selected;
        }

        function isStepsValidated() {
            var validated = true;
            function verifyStep(step) {
                validated = step.validated;
                return validated;
            }
            _.forEach(ordersCtrl.steps, verifyStep);

            return validated;
        }

        function onlyBikeIsNotValidated() {
            var validated = true;
            function verifyStepIgnoringBike(step) {
                if (step.title !== KEYS.BIKE) {
                    validated = step.validated;
                }
                return validated;
            }
            _.forEach(ordersCtrl.steps, verifyStepIgnoringBike);

            return validated;
        }

        function saveOrder() {
            var deferred = $q.defer();
            function closemod(option) {
                if (option === okeyKey) {
                    deferred.resolve(OrderService.saveOrder(ordersCtrl.order));
                }
            }
            if (isStepsValidated()) {
                deferred.resolve(OrderService.saveOrder(ordersCtrl.order));
            } else if (onlyBikeIsNotValidated()) {
                var okeyKey = 'Guardar Orden sin moto';
                var modResult = ModalUtility.openAskOrderWithoutBikeModal(okeyKey);
                modResult.result.then(closemod);
            } else {
                ModalUtility.openVerifyOrdenData();
                deferred.reject();
            }

            return deferred.promise;
        }

        function selectionBikeChange() {
            function findSelectedBike(bike) {
                return bike.selected;
            }
            var bike = _.find(ordersCtrl.todayBikes, findSelectedBike);
            ordersCtrl.order.bike = bike;
            validateStep(KEYS.BIKE, !_.isUndefined(bike));
        }

        function searchBusinessChange() {
            console.log('text', ordersCtrl.searchBussinesText);
        }

        ordersCtrl.$onInit = $onInit;
        ordersCtrl.selectBusiness = selectBusiness;
        ordersCtrl.searchUser = searchUser;
        ordersCtrl.selectedCategoryChange = selectedCategoryChange;
        ordersCtrl.selectProduct = selectProduct;
        ordersCtrl.addCartProduct = addCartProduct;
        ordersCtrl.cancelCartProduct = cancelCartProduct;
        ordersCtrl.removeCartProduct = removeCartProduct;
        ordersCtrl.selectAddressChange = selectAddressChange;
        ordersCtrl.saveOrder = saveOrder;
        ordersCtrl.selectionBikeChange = selectionBikeChange;
        ordersCtrl.searchBusinessChange = searchBusinessChange;
    }
    angular
        .module('EasyBikeApp.Orders')
        .controller('OrdersController', OrdersController);
})();
