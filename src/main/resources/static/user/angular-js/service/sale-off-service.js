solar_app.service('SaleOffService', function ($http) {

    this.findAll = function () {
        return $http({
            method: 'GET',
            url: API_SaleOff,
        })
    }

    this.findByProductId = function (productId) {
        return $http({
            method: 'GET',
            url: API_SaleOff + '/' + productId,
        })
    }
});