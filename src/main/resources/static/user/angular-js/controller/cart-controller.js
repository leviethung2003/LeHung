solar_app.controller('cart_controller', function ($scope, $http, $rootScope, $timeout, $location, CartService, ProductService, SaleOffService) {

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', {currency: 'VND'}).format(price);
    };

    // lấy ra tất cả sản phẩm giảm giá
    SaleOffService.findAll().then(function successCallback(response) {
        $scope.sale_offs = response.data;
    });

    // lấy ra object giỏ hàng sp, thương hiệu, img'
    CartService.findAllCart().then(function successCallback(response) {
        $scope.object_cart = response.data;
        $scope.calculate_total();
        $scope.calculatorSaleOffProductPrice();
    }, function errorCallback(response) {
        console.log(response.data);
    });

    // Hàm tính giảm giá
    $scope.calculatorSaleOffProductPrice = function () {
        let cart = $scope.object_cart;

        for (let i = 0; i < cart.length; i++) {
            let productId = cart[i][1].id;
            let saleOffIndex = $scope.findIndexByProductId(productId);

            CartService.findAllPriceByUserId().then(function successCallback(response) {
                $scope.currentPriceProduct = response.data[i];
            });

            if (saleOffIndex !== -1) {
                let saleOff = $scope.sale_offs[saleOffIndex];

                if (saleOff != null && saleOff.isActive && $scope.isSaleOffValid(saleOff)) {
                    // Áp dụng giá giảm giá cho sản phẩm
                    cart[i][1].price = saleOff.saleValue;
                }
            }
        }
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


    // trừ số lượng
    $scope.decrease_quantity = function (index, cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            updateCartItemInDB(cartItem);
            $scope.calculate_total();
        } else {
            $scope.delete_cart(index, cartItem.id);
        }
    }

    // kiểm tra số lượng trong input
    $scope.checkQuantity = function (quantity, cartItem) {
        let quantityInDb;
        let productId = cartItem.productId;

        ProductService.findProductByProductId(productId).then(function successCallback(response) {
            quantityInDb = response.data.quantity;

            if (quantity <= quantityInDb) {
                updateCartItemInDB(cartItem);
                $scope.calculate_total();
            } else {
                cartItem.quantity = quantityInDb;
                updateCartItemInDB(cartItem);
                $scope.calculate_total();
                centerAlert('Cảnh Báo !', 'Ôi hỏng rồi !!!, Bạn đã nhập quá số lượng giới hạn.', 'warning');
            }
        }, function errorCallback(response) {
            console.log(response.data);
        });
    };

    // cộng số lượng
    $scope.increase_quantity = function (cartItem, index) {
        let product = $scope.object_cart[index];

        if (cartItem.quantity < product[1].quantity) {
            cartItem.quantity++;
            updateCartItemInDB(cartItem);
            $scope.calculate_total();
        }
    }

    // tính tổng tiền giỏ hàng
    $scope.calculate_total = function () {
        let subtotal = 0;

        for (let i = 0; i < $scope.object_cart.length; i++) {
            let product = $scope.object_cart[i][1];
            let quantity = $scope.object_cart[i][0].quantity;

            // Tính giá giảm giá nếu có
            let saleOffIndex = $scope.findIndexByProductId(product.id);
            if (saleOffIndex !== -1) {
                let saleOff = $scope.sale_offs[saleOffIndex];

                if (saleOff != null && saleOff.isActive && $scope.isSaleOffValid(saleOff)) {
                    // Áp dụng giá giảm giá cho sản phẩm
                    product.price = saleOff.saleValue;
                }
            }

            // Tính tổng giá của sản phẩm
            subtotal += quantity * product.price;
        }

        let discount = 0; // Giảm giá (nếu có)
        let shippingFee = 0; // Phí vận chuyển (nếu có)

        let total = subtotal - discount + shippingFee;

        $scope.subtotal = subtotal;
        $scope.discount = discount;
        $scope.shippingFee = shippingFee;
        $scope.total = total;
    }

    // cập nhật số giỏ hàng lượng trong db
    function updateCartItemInDB(cartItem) {
        CartService.updateQuantityCart(cartItem);
    }

    // tổng số lượng sp trong giỏ hàng
    $rootScope.sum_quantity_cart = function () {
        CartService.sumQuantityCart().then(function successCallback(response) {
            $rootScope.quantity_cart = response.data;
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }

    // chuyển hướng tới checkdetails
    $scope.proceedToCheckout = function () {
        $location.path('/gio-hang/xac-nhan-thong-tin-don-hang');
    };

    // xoá sản phẩm trong giỏ hàng
    $scope.delete_cart = function (index, cartId) {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn xoá sản phẩm ra khỏi giỏ hàng không ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý !',
            cancelButtonText: 'Huỷ !'
        }).then((result) => {
            if (result.isConfirmed) {
                $http({
                    method: 'GET',
                    url: API_Cart + '/xoa-gio-hang/' + cartId
                }).then(function successCallback() {
                    $scope.object_cart.splice(index, 1);

                    $rootScope.sum_quantity_cart();
                    $scope.calculate_total();
                    $scope.sum_quantity_cart();

                    // Hiển thị thông báo thành công
                    $timeout(function () {
                        centerAlert('Thành công !', 'Xoá sản phẩm ra khỏi giỏ hàng thành công !', 'success');
                    });
                }, function errorCallback(response) {
                    console.log(response.data);
                });
            }
        })
    }
});