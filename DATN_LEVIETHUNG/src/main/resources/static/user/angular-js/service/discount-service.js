solar_app.service('DiscountService', function ($http) {
    this.findDiscount = function () {
        return $http({
            method: 'GET',
            url: API_Discount
        })
    };

    this.findDiscountByDiscountId = function (discount_code) {
        return $http({
            method: 'GET',
            url: API_Discount + '/' + discount_code
        })
    };

    this.decreaseQuantity = function (discountId) {
        return $http({
            method: 'POST',
            url: API_Discount + '/decrease_quantity/' + discountId
        })
    }

    this.checkDiscountByUserIdAndDiscountId = function (userId, discountId) {
        return $http({
            method: 'GET',
            url: API_Discount + '/user-discount/' + userId + '/' + discountId
        })
    };
});
