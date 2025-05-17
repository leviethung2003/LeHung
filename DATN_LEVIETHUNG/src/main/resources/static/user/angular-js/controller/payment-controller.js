solar_app.controller('payment_controller', function ($scope, $rootScope, $filter, OrderService, OrderCodeService, DiscountService) {

    $scope.payment_calculator = function () {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn đặt hàng không ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',

            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý !',
            cancelButtonText: 'Huỷ !'
        }).then((result) => {
            if (result.isConfirmed) {
                $scope.processPayment();
            }
        })
    };

    // Trong AngularJS controller
    $scope.processPayment = function () {
        if ($scope.paymentMethod === 'COD') {

            $scope.userPayment();
            centerAlert('Thành công !', 'Đơn hàng của bạn đã được đặt thành công !', 'success');

            // Chuyển đến trang chủ
            window.location.href = '#!/trang-chu';

            // Xoá local mã giảm giá đi
            localStorage.removeItem('appliedDiscount');

            $rootScope.quantity_cart = 0;

        } else if ($scope.paymentMethod === 'TRANSFER') {
            // chuyển đến trang xác nhận thông tin để thanh toán
            $scope.shareData();
            window.location.href = '#!/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan?tong-tien=' + $scope.total;
        } else {
            console.log('Không có lựa chọn thanh toán nào được chọn');
        }
    };

    // lấy ra các thông tin người đặt hàng, thông tin đơn hàng
    $scope.userPayment = function () {
        let productCartDto = {
            cartsList: [], productsList: []
        };

        let total = 0;
        let dateExpected = $filter('timestampToDateString')($scope.intend_time, 'dd/MM/yyyy HH:mm:ss');

        for (let i = 0; i < $scope.object_cart.length; i++) {
            let cartItem = $scope.object_cart[i][0];
            let product = $scope.object_cart[i][1];

            // Tính giá giảm giá nếu có
            let saleOffIndex = $scope.findIndexByProductId(product.id);
            if (saleOffIndex !== -1) {
                let saleOff = $scope.sale_offs[saleOffIndex];

                if (saleOff != null && saleOff.isActive && $scope.isSaleOffValid(saleOff)) {
                    // Áp dụng giá giảm giá cho sản phẩm
                    product.price = saleOff.saleValue;
                }
            }

            // Tính tổng giá của từng sản phẩm
            let subtotal = cartItem.quantity * product.price;

            total += subtotal;

            // Thêm sản phẩm và giỏ hàng vào productCartDto
            productCartDto.cartsList.push(cartItem);
            productCartDto.productsList.push(product);
        }

        $scope.user_payment = {
            fullname: $scope.user.fullname,
            phoneNumber: $scope.user.phoneNumber,
            provinceName: $scope.user.provinceName.ProvinceName,
            districtName: $scope.user.districtName.DistrictName,
            wardName: $scope.user.wardName.WardName,
            address: $scope.user.address,
        };

        const data = {
            orderId: OrderCodeService.generateOrderCode(),
            email: $scope.user.email,
            user_payment: $scope.user_payment,
            productCartDto: productCartDto,
            discountId: $scope.discountId,
            paymentStatus: 0,
            serviceName: $scope.serviceName.short_name,
            shippingFee: $scope.shippingFee,
            dateExpected: dateExpected,
            total: total,
            noted: $scope.noted,
            paymentMethod: $scope.paymentMethod
        };

        $scope.createOrder(data);
    };

    // Hàm kiểm tra xem giảm giá còn hiệu lực hay không
    $scope.isSaleOffValid = function (saleOff) {
        let currentDate = new Date();
        let saleStartDate = new Date(saleOff.startUse);
        let saleEndDate = new Date(saleOff.endUse);

        return currentDate >= saleStartDate && currentDate <= saleEndDate;
    };

    // Hàm tìm kiếm index của giảm giá dựa trên productId
    $scope.findIndexByProductId = function (productId) {
        let sale_offs = $scope.sale_offs || [];

        for (let i = 0; i < sale_offs.length; i++) {
            if (sale_offs[i].productId === productId) {
                return i;
            }
        }

        return -1; // Không tìm thấy giảm giá cho productId
    };

    // kiểm tra mã giảm giá
    $scope.checkDiscount = function () {
        let discountId = $scope.discount_code;
        let discountCost = $scope.discount;

        if (discountId.trim().length > 0 && discountCost !== 0) {
            DiscountService.decreaseQuantity(discountId);
        }
    }

    // tạo đơn lưu vào db
    $scope.createOrder = function (data) {
        $scope.checkDiscount();
        OrderService.createOrder(data);
    }

    // lấy dữ liệu người dùng đặt hàng qua controller creat-order-controller để thanh toán vnpay
    $scope.shareData = function () {
        let productCartDto = {
            cartsList: [], productsList: []
        };

        let total = 0;
        let dateExpected = $filter('timestampToDateString')($scope.intend_time, 'dd/MM/yyyy HH:mm:ss');

        for (let i = 0; i < $scope.object_cart.length; i++) {
            let cartItem = $scope.object_cart[i][0];
            let product = $scope.object_cart[i][1];

            // Tính giá giảm giá nếu có
            let saleOffIndex = $scope.findIndexByProductId(product.id);
            if (saleOffIndex !== -1) {
                let saleOff = $scope.sale_offs[saleOffIndex];

                if (saleOff != null && saleOff.isActive && $scope.isSaleOffValid(saleOff)) {
                    // Áp dụng giá giảm giá cho sản phẩm
                    product.price = saleOff.saleValue;
                }
            }

            // Tính tổng giá của từng sản phẩm
            let subtotal = cartItem.quantity * product.price;

            total += subtotal;

            // Thêm sản phẩm và giỏ hàng vào productCartDto
            productCartDto.cartsList.push(cartItem);
            productCartDto.productsList.push(product);
        }

        $scope.user_payment = {
            fullname: $scope.user.fullname,
            phoneNumber: $scope.user.phoneNumber,
            provinceName: $scope.user.provinceName.ProvinceName,
            districtName: $scope.user.districtName.DistrictName,
            wardName: $scope.user.wardName.WardName,
            address: $scope.user.address,
        };

        const data = {
            orderId: OrderCodeService.generateOrderCode(),
            email: $scope.user.email,
            user_payment: $scope.user_payment,
            productCartDto: productCartDto,
            discountId: $scope.discountId,
            paymentStatus: 0,
            serviceName: $scope.serviceName.short_name,
            shippingFee: $scope.shippingFee,
            dateExpected: dateExpected,
            total: total,
            noted: $scope.noted,
            paymentMethod: $scope.paymentMethod
        };

        // Lưu dữ liệu vào Local Storage
        localStorage.setItem('sharedData', JSON.stringify(data));
    };
});