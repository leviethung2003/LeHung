solar_app.controller('create_order_controller', function ($scope, $routeParams, $rootScope, OrderService, DiscountService) {

    $scope.formatPriceVNPAY = function (price) {
        let formattedPrice = price / 100;
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(formattedPrice);
    };

    // thông tin của vnpay trả về
    $scope.orderInfo = $routeParams.orderInfo;
    $scope.paymentTime = $routeParams.paymentTime;
    $scope.totalPrice = $routeParams.totalPrice;
    $scope.bankCode = $routeParams.bankCode;
    const transactionId = $scope.transactionId = $routeParams.transactionId;

    $scope.userPaymentTransfer = function () {
        const storedData = localStorage.getItem('sharedData');

        if (storedData) {
            const data = JSON.parse(storedData);

            // Sử dụng toán tử ba ngôi để xác định paymentStatus
            data.paymentStatus = parseInt(transactionId) !== 0 ? 1 : 2;

            // Thêm trường vào đối tượng data
            data.orderId = $scope.orderInfo;
            data.total = ($scope.totalPrice / 100) - data.shippingFee;

            // kiểm tra ma giảm giá
            let discountId = data.discountId;
            let discountCost = data.discountCost;

            if (discountId != null && discountCost !== 0) {
                DiscountService.decreaseQuantity(discountId);
            }

            // Tạo đơn lưu vào db
            $scope.createOrder(data);
        } else {
            console.log('Không có dữ liệu được lưu trong Local Storage');
        }
    };

    // tạo đơn lưu vào db
    $scope.createOrder = function (data) {
        OrderService.createOrder(data);
        localStorage.removeItem('sharedData');
    }

    $scope.userPaymentTransfer();
    $rootScope.quantity_cart = 0;
});