solar_app.service('ProductService', function ($http) {
    this.findAllProducts = function () {
        return $http({
            method: 'GET',
            url: API_Product
        })
    };

    this.findProductByIdOne = function () {
        return $http({
            method: 'GET',
            url: API_Product + '/' + 1
        })
    };

    this.findProductByProductId = function (productId) {
        return $http({
            method: 'GET',
            url: API_Product + '/find-by-id/' + productId
        })
    };

    this.findProductByCategoryId = function (categoryId) {
        return $http({
            method: 'GET',
            url: API_Product + '/' + categoryId
        })
    }

    this.findAllByProductId = function (productId) {
        return $http({
            method: 'GET',
            url: API_Product + '/findByProductId/' + productId
        })
    };

    this.showProductByCategory = function (categoryId) {
        return $http({
            method: 'GET',
            url: API_Product + 's/' + categoryId
        })
    }

    this.showBrandNameByProductBrandId = function (productId) {
        return $http({
            method: 'GET',
            url: API_Product + '/brandName/' + productId
        })
    }

    this.findProductByProductType = function (productTypeId) {
        return $http({
            method: 'GET',
            url: API_Product + '/find-product-by-product-type/' + productTypeId
        })
    }

    this.findByProductName = function (categoryId, search) {
        return $http({
            method: 'GET',
            url: API_Product + '/find-product-by-category-id-by-key/' + categoryId + '/' + search
        })
    }
    this.findProductByCategoryIdAndProductTypeId = function (categoryId, productTypeId) {
        return $http({
            method: 'GET',
            url: API_Product + '/find-by-category-id-by-product-type-id/' + categoryId + '/' + productTypeId
        })
    }
    this.findProductHasCloserSale = function() {
        return $http({
            method: 'GET',
            url: API_Product + '/sale-off-closer'
        })
    }

    this.findAllProductIsSale = function() {
        return $http({
            method: 'GET',
            url: API_Product + '/all-sale-off-closer'
        })
    }
});
