solar_app.service('ProductTypeService', function ($http) {
    this.findProductTypeByCategoryId = function (categoryId) {
        return $http({
            method: 'GET',
            url: API_ProductType + '/' + categoryId
        })
    };

    this.findProductByCategoryId = function (categoryId) {
        return $http({
            method: 'GET',
            url: API_Product + '/' + categoryId
        })
    }
});
