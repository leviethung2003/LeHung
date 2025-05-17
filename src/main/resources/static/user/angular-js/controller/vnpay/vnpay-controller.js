solar_app.controller('vnpay_controller', function ($scope, $location, UserService, OrderCodeService, VnpayService) {

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', {currency: 'VND'}).format(price);
    };

    let params = $location.search();
    $scope.price = params['tong-tien'];

    // tạo mã đơn hàng
    $scope.orderId = OrderCodeService.generateOrderCode();

    UserService.findUserBySession().then(function successCallback(response) {
        $scope.user = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    });

    $scope.submitPayment = function () {
        let orderId = $scope.orderId;
        let price = $scope.price;

        VnpayService.createOrderPayment(price, orderId).then(function successCallback(response) {
            localStorage.removeItem('appliedDiscount');
            window.location.href = response.data.redirectUrl;
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }
});
