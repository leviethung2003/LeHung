solar_app.service('VnpayService', function ($http) {
    this.createOrderPayment = function (price, orderInfo) {
        return $http({
            method: 'POST',
            url: API_VNPAY + '/submit-payment',
            params: {
                price: price,
                orderInfo: orderInfo
            }
        })
    };
});