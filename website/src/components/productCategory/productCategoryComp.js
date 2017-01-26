(function () {
    'use strict';

    /**
     * @function featuredBrands
     * @desc Directive that create a section with catalog brands or featured Brands with dynamic
     * number of brands based on the screen size
     * @author Arturo Aguilar
     * @return {Object} directive
     */
    function productCategoryComponent() {
        return {
            restrict: 'E',
            templateUrl: 'components/productCategory/productCategoryComp.tpl.html',
            controller: 'ProductCategoryComponetController',
            controllerAs: 'prodCatCompCtrl',
            bindToController: {
                textTitle: '=',
                clickAction: '&?',
                multipleSelection: '@',
                enableAddNew: '@',
                selectionChange: '&?',
                selectedCategories: '=',
                customCategories: '=',
                displaySelectionError: '@',
                addCategoryClick: '&?'
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
    function ProductCategoryComponetController(_, ProductCategoryService, $state, $scope) {
        var prodCatCompCtrl = this;
        /**
        * @function $onInit
        * @memberOf FeaturedBrandsController
        * @desc Initializes controller and brands from featured Brands or catalog brands
        * @author Arturo Aguilar
        */
        function $onInit() {
            prodCatCompCtrl.hasAction = !_.isUndefined(prodCatCompCtrl.clickAction);
            if (_.isUndefined(prodCatCompCtrl.customCategories)) {
                ProductCategoryService.getDefaultProductCategory().then(loadCategories);
            } else {
                prodCatCompCtrl.categories = prodCatCompCtrl.customCategories;
            }
            prodCatCompCtrl.multipleSelection = !_.isUndefined(prodCatCompCtrl.multipleSelection);
            prodCatCompCtrl.enableAddNew = !_.isUndefined(prodCatCompCtrl.enableAddNew);
            function getCustomCategories() { return prodCatCompCtrl.customCategories; }
            function setCustomCategories() {
                prodCatCompCtrl.categories = prodCatCompCtrl.customCategories;
            }
            $scope.$watch(getCustomCategories, setCustomCategories);

            validateCategories();
        }


        function loadCategories(response) {
            prodCatCompCtrl.categories = response;
            setSelectCategories(false);
        }

        function setSelectCategories(selected) {
            prodCatCompCtrl.categories = _.mapValues(prodCatCompCtrl.categories,
                function (category) {
                    category.selected = selected;
                    return category;
                });
        }

        function validateCategories() {
            if (prodCatCompCtrl.displaySelectionError) {
                prodCatCompCtrl.displayError = _.isEmpty(_.find(prodCatCompCtrl.categories, function (o) { return o.selected; }));
            }
        }

        function clickProduct() {
            if (prodCatCompCtrl.hasAction) {
                prodCatCompCtrl.clickAction(prodCatCompCtrl.product);
            }
        }
        function selectTab(category) {
            if (!prodCatCompCtrl.multipleSelection) {
                setSelectCategories(false);
                category.selected = true;
            } else {
                category.selected = !category.selected;
            }
            if (!_.isUndefined(prodCatCompCtrl.selectedCategories)) {
                prodCatCompCtrl.selectedCategories = _.filter(prodCatCompCtrl.categories, function (cat) {
                    return cat.selected;
                });
            }
            if (!_.isUndefined(prodCatCompCtrl.selectionChange)) {
                if (prodCatCompCtrl.multipleSelection) {
                    prodCatCompCtrl.selectionChange(prodCatCompCtrl.selectedCategories);
                } else {
                    prodCatCompCtrl.selectionChange(category);
                }
            }

            validateCategories();
        }

        function addNewCategory() {
            if (_.isUndefined(prodCatCompCtrl.addCategoryClick)) {
                $state.go('new-productCategory');
            } else {
                prodCatCompCtrl.addCategoryClick();
            }
        }

        prodCatCompCtrl.clickProduct = clickProduct;
        prodCatCompCtrl.$onInit = $onInit;
        prodCatCompCtrl.selectTab = selectTab;
        prodCatCompCtrl.addNewCategory = addNewCategory;
    }
    angular
        .module('EasyBikeApp.Components')
        .controller('ProductCategoryComponetController', ProductCategoryComponetController)
        .directive('productCategoryComponent', productCategoryComponent);
})();
