solar_app.service('OrderItermService', function ($http) {
    this.findByOrderId = function (orderId) {
        return $http({
            method: 'GET',
            url: API_OrderItem + '/findByOrderId/' + orderId,
        })
    }
});