solar_app.service('OrderService', function ($http) {
    this.createOrder = function (data) {
        return $http({
            method: 'POST',
            url: API_Order + '/create-order',
            headers: {
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
            },
            data: data
        })
    }

    this.findByOrderId = function (orderId) {
        return $http({
            method: 'GET',
            url: API_Order + '/findById/' + orderId,
        })
    }

    this.findByUserId = function (userId) {
        return $http({
            method: 'GET',
            url: API_Order + '/history-payment/' + userId,
        })
    }

    this.cancelOrderById = function (data) {
        return $http({
            method: 'POST',
            url: API_Order + '/cancel-order',
            headers: {
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
            },
            data: data
        })
    }

    this.findAllOrder = function() {
        return $http({
            method: 'GET',
            url: API_RateProduct + '/listOrderByOrderId'
        })
    }
});