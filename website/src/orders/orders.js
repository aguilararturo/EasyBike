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
    function OrdersController(CommonService, BikeEnabledService, BussinessService, ProductService, UtilityService, AddressService, _, OrderService, ModalUtility, $q, $scope, $state) {
        var ordersCtrl = this;
        ordersCtrl.KEYS = {
            ORDER: 'Pedido',
            TYPE_ORDER: 'Tipo de orden',
            USER: 'Usuario',
            BIKE: 'Moto',
            DELIVERY: 'Entregar'
        };

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller and brands from featured Brands or catalog brands
         * @author Arturo Aguilar
         */
        function $onInit() {
            ordersCtrl.searchBussinesText = '';
            ordersCtrl.searchText = '';
            ordersCtrl.searchableAddress = [];

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

            ordersCtrl.pickIcon = 'fa-hand-scissors-o';
            ordersCtrl.deliveryIcon = 'fa-handshake-o';

            ordersCtrl.addressButtoms = [
                {
                    click: pickAddressClick,
                    icon: ordersCtrl.pickIcon
                },
                {
                    click: deliveyAddressClick,
                    icon: ordersCtrl.deliveryIcon
                }
            ];

            ordersCtrl.userTitle = 'Datos Usuario';
            ordersCtrl.number = '';
            ordersCtrl.defaultBussines = {
                name: ''
            };

            ordersCtrl.deliveryStep = {
                title: ordersCtrl.KEYS.DELIVERY,
                content: 'fa fa-road',
                number: '3',
                selected: true,
                validated: false
            };

            ordersCtrl.orderStep = {
                title: ordersCtrl.KEYS.ORDER,
                content: 'fa fa-shopping-cart',
                number: '3',
                selected: false,
                validated: false
            };

            ordersCtrl.steps = [
                {
                    title: ordersCtrl.KEYS.USER,
                    content: 'fa fa-user',
                    number: '1',
                    selected: true,
                    validated: false
                },
                {
                    title: ordersCtrl.KEYS.TYPE_ORDER,
                    content: 'fa fa-home',
                    number: '2',
                    selected: false,
                    validated: false
                },
                ordersCtrl.deliveryStep,
                {
                    title: ordersCtrl.KEYS.BIKE,
                    content: 'fa fa-motorcycle',
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
            AddressService.getOrderDeliveryAddress().then(loadSearchableBuss);
        }

        function loadSearchableBuss(response) {
            function getAddress(orderDelivery) {
                return {
                    identifier: orderDelivery.identifier,
                    address: orderDelivery.address
                };
            }

            ordersCtrl.searchableAddress = _.map(response, getAddress);
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
                bike: {},
                orderDelivery: {
                    id: '',
                    identifier: '',
                    address: {
                        id: '',
                        location: '',
                        date: '',
                        direction: '',
                        displayMap: false
                    },
                    note: ''
                }
            };
            ordersCtrl.deliveryAdds = [ordersCtrl.order.deliveryAddress];
            ordersCtrl.pickAdds = [ordersCtrl.order.orderDelivery.address];
            ordersCtrl.clientAddresses = [];
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
                if (business.defaultBussines) {
                    ordersCtrl.defaultBussines = _.clone(business);
                    ordersCtrl.defaultBussines.id = -1;
                    ordersCtrl.defaultBussines.selected = true;
                    selectBusiness(ordersCtrl.defaultBussines);
                }
            }
            _.map(response, mapBusiness);
            if (ordersCtrl.defaultBussines.name !== '') {
                response = _.concat([ordersCtrl.defaultBussines], response);
            }
            ordersCtrl.businesses = response;
        }

        function deliverySelected() {
            if (ordersCtrl.defaultBussines.id === ordersCtrl.selectedBusiness.id) {
                ordersCtrl.steps[2] = ordersCtrl.deliveryStep;
            } else {
                ordersCtrl.steps[2] = ordersCtrl.orderStep;
            }

            validateUser();
        }

        function selectBusiness(business) {
            function iterateBussines(item) {
                item.selected = item.id === business.id;
            }
            _.forEach(ordersCtrl.businesses, iterateBussines);

            ordersCtrl.selectedBusiness = business;
            ordersCtrl.businessValidate = true;
            deliverySelected();
            validateStep(ordersCtrl.KEYS.TYPE_ORDER, true);
        }

        function loadUser(response) {
            if (!_.isEmpty(response)) {
                ordersCtrl.order.client = response.client;
                ordersCtrl.clientAddresses = _.concat(response.lastUsed, response.client.addresses);
            }
        }

        function searchUser(number) {
            console.log('search User', number);
            if (_.isNull(number)) {
                return;
            }

            if (!_.isEmpty(number.toString())) {
                CommonService.GetByPhoneLastAddress(number).then(loadUser);
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
            validateStep(ordersCtrl.KEYS.ORDER, _.size(ordersCtrl.order.orderProducts) > 0);
        }

        function cancelCartProduct() {
            ordersCtrl.showAddProductOrder = false;
        }

        function removeCartProduct(orderProduct) {
            _.pull(ordersCtrl.order.orderProducts, orderProduct);
            validatedOrderDetail();
        }

        function selectAddressChange() {
            ordersCtrl.order.deliveryAddress = _.clone(UtilityService.getSelected(ordersCtrl.order.client.addresses));
            ordersCtrl.deliveryAdds = [ordersCtrl.order.deliveryAddress];
            if (!_.isUndefined(ordersCtrl.order.deliveryAddress)) {
                if (!_.isEmpty(ordersCtrl.order.deliveryAddress.location)) {
                    validateStep(ordersCtrl.KEYS.USER, true);
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
                if (step.title !== ordersCtrl.KEYS.BIKE) {
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

            function reload() {
                $state.reload();
            }

            deferred.promise.then(reload);

            return deferred.promise;
        }

        function selectionBikeChange() {
            function findSelectedBike(bike) {
                return bike.selected;
            }
            var bike = _.find(ordersCtrl.todayBikes, findSelectedBike);
            ordersCtrl.order.bike = bike;
            validateStep(ordersCtrl.KEYS.BIKE, !_.isUndefined(bike));
        }

        function searchBusinessChange() {
            console.log('text', ordersCtrl.searchBussinesText);
        }

        function pickAddressClick(data) {
            console.log('pickAddressClick', data);
            ordersCtrl.order.orderDelivery.address = _.clone(data);
            ordersCtrl.pickAdds = [ordersCtrl.order.orderDelivery.address];
            validateDeliveryAddress();

        }

        function deliveyAddressClick(data) {
            console.log('deliveyAddressClick', data);
            ordersCtrl.order.deliveryAddress = _.clone(data);
            ordersCtrl.deliveryAdds = [ordersCtrl.order.deliveryAddress];
            validateDeliveryAddress();
        }

        function getItemText(item) {
            if (_.isNil(item)) {
                return '';
            } else if (_.has(item, 'identifier')) {
                if (_.isEmpty(item.identifier)) {
                    return item.address.direction;
                }
                return item.identifier + ' ; ' + item.address.direction;
            } else {
                return item;
            }
        }

        function onEnterAction(text) {
            ordersCtrl.order.orderDelivery.address = {
                id: '',
                location: '',
                date: '',
                direction: text,
                displayMap: false
            };
            validateDeliveryAddress();
            $scope.$apply();
        }

        function onDirectionChange(direction, searchData) {
            var itemsToFilter = [direction.identifier, direction.address.direction];
            var filterRes = $filter('filter')(itemsToFilter, searchData);

            if (_.size(filterRes) == 1) {
                if (_.isEqual(filterRes[0], direction.identifier)) {
                    ordersCtrl.order.orderDelivery.identifier = direction.identifier;
                } else {
                    ordersCtrl.order.orderDelivery.identifier = '';
                }
            }

            ordersCtrl.order.orderDelivery.address = _.clone(direction.address);

            console.log('direction change', ordersCtrl.order.orderDelivery);
            validateDeliveryAddress();
        }

        function validateDeliveryAddress() {
            if (_.isNil(ordersCtrl.order.orderDelivery) || _.isNil(ordersCtrl.order.deliveryAddress)) {
                validateStep(ordersCtrl.KEYS.DELIVERY, false);
                return;
            }
            var valid = !_.isEmpty(ordersCtrl.order.orderDelivery.address.direction) && !_.isEmpty(ordersCtrl.order.deliveryAddress.direction);
            validateStep(ordersCtrl.KEYS.DELIVERY, valid);
        }

        function deliveryAddressesChange(item) {
            item.id = '';
            validateDeliveryAddress();
        }

        function validateUser() {
            var userIsValid = true;
            if (_.isEmpty(ordersCtrl.order.client.name) || !_.isNumber(ordersCtrl.order.client.nit) || !_.isNumber(ordersCtrl.order.client.phones[0].number)) {
                userIsValid = false;

            }
            validateStep(ordersCtrl.KEYS.USER, userIsValid);
        }

        function stepChange() {
            if (ordersCtrl.selectedStep.title === ordersCtrl.KEYS.DELIVERY) {
                validateUser();
            }
        }

        ordersCtrl.$onInit = $onInit;
        ordersCtrl.getItemText = getItemText;
        ordersCtrl.onEnterAction = onEnterAction;
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
        ordersCtrl.onDirectionChange = onDirectionChange;
        ordersCtrl.validateDeliveryAddress = validateDeliveryAddress;
        ordersCtrl.deliveryAddressesChange = deliveryAddressesChange;
        ordersCtrl.stepChange = stepChange;
    }
    angular
        .module('EasyBikeApp.Orders')
        .controller('OrdersController', OrdersController);
})();
