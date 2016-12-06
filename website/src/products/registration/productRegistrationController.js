(function () {
    'use strict';
    function ProductRegistrationController(ProductService, ModalUtility, BussinessService, _) {
        var prodRegCtrl = this;

        /**
         * @function $onInit
         * @memberOf FeaturedBrandsController
         * @desc Initializes controller for Product
         * @author Arturo Aguilar
         */
        function $onInit() {
            prodRegCtrl.product = {
                id: 0,
                codSubfix: '',
                name: '',
                pictureUrl: '',
                brand: '',
                barCode: '',
                category: {

                },
                business: {
                    categories: []
                },
                phones: [

                ],
                imageUrl: ''
            };
            prodRegCtrl.categoryValidate = false;
            prodRegCtrl.businessValidate = false;
            prodRegCtrl.displayProductSelection = false;
            prodRegCtrl.textTitle = 'Registro de producto';
        }

        function selectCategory(category) {
            prodRegCtrl.product.category =
                _.find(prodRegCtrl.product.business.categories, function (o) {
                    return o.selected;
                });
            prodRegCtrl.categoryValidate = true;
        }

        function saveProduct() {
            function saveSussess(response) {
                ModalUtility.openSaveCompleteModal();
            }
            return ProductService.saveProduct(prodRegCtrl.product)
                .then(saveSussess);
        }

        function searchBusiness() {
            if (_.isEmpty(prodRegCtrl.businesses)) {
                BussinessService.getBusinessesWithCategories().then(loadBusiness);
            }
            prodRegCtrl.displayProductSelection = true;
        }

        function selectBusiness(business) {
            function iterateBussines(item) {
                item.selected = item.id === business.id;
            }
            _.forEach(prodRegCtrl.businesses, iterateBussines);

            prodRegCtrl.product.business = business;
            prodRegCtrl.displayProductSelection = false;
            prodRegCtrl.businessValidate = true;
            prodRegCtrl.categoryValidate = false;
        }

        function loadBusiness(response) {
            function mapBusiness(business) {
                business.selected = false;
            }
            _.map(response, mapBusiness);
            prodRegCtrl.businesses = response;
        }


        prodRegCtrl.$onInit = $onInit;
        prodRegCtrl.saveProduct = saveProduct;
        prodRegCtrl.selectCategory = selectCategory;
        prodRegCtrl.searchBusiness = searchBusiness;
        prodRegCtrl.selectBusiness = selectBusiness;
    }
    angular
        .module('EasyBikeApp.Product')
        .controller('ProductRegistrationController', ProductRegistrationController);
})();
