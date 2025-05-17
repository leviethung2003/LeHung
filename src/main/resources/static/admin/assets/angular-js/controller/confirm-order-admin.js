solar_app_admin.controller('ConfirmOrderAdmin', function ($scope, $http, $timeout) {

    $scope.activeTab = 'confirm';

    $scope.setActiveTab = function (tab) {
        $scope.activeTab = tab;
    };

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', {currency: 'VND'}).format(price);
    };

    $http({
        method: 'GET',
        url: API_findAllOrder
    }).then(function successCallback(response) {
        $scope.history_order = response.data;

        $timeout(function () {
            $('#table-confirm').DataTable({
                "order": [],
                "paging": true,
                "ordering": true,
                "info": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json"
                }
            });
            $('#table-deliver').DataTable({
                "order": [],
                "paging": true,
                "ordering": true,
                "info": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json"
                }
            });
            $('#table-delivered').DataTable({
                "order": [],
                "paging": true,
                "ordering": true,
                "info": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json"
                }
            });
            $('#table-cancelled').DataTable({
                "order": [],
                "paging": true,
                "ordering": true,
                "info": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json"
                }
            });
            $('#table-allOrder').DataTable({
                "order": [],
                "paging": true,
                "ordering": true,
                "info": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json"
                }
            });
        });
    });

    $scope.getInfoOrder = function (orderId) {
        let combinedData = [];
        let totalAmount = 0;
        let shippingFee = 0;
        let subTotal = 0;
        let discountId;

        $http({
            method: 'GET',
            url: API_findByOrderId + '/' + orderId
        }).then(function successCallback(response) {
            discountId = response.data.discountId;
            $scope.order = response.data;

            $scope.getStatusText = function () {
                let paymentStatus = $scope.order.paymentStatus
                switch (paymentStatus) {
                    case 0:
                        return 'Chưa thanh toán';
                    case 1:
                        return 'Đã thanh toán';
                    case 2:
                        return 'Thanh toán thất bại';
                    default:
                        return 'Trạng thái không xác định';
                }
            };

            if (discountId !== null) {
                $http({
                    method: 'GET',
                    url: '/api/discount/' + discountId
                }).then(function successCallback(response) {
                    $scope.discountCost = response.data.discountCost;
                });
            } else {
                $scope.discountCost = 0;
            }

            $http({
                method: 'GET',
                url: API_findOrderItemByOrderId + '/' + $scope.order.id
            }).then(function successCallback(response) {
                let listOrderItemAndProduct = $scope.order_items = response.data;

                for (let i = 0; i < listOrderItemAndProduct.length; i++) {
                    let data = {
                        product: listOrderItemAndProduct[i][1],
                        orderItem: listOrderItemAndProduct[i][0]
                    };
                    combinedData.push(data);

                    // tạm tính
                    subTotal += (data.orderItem.quantity * data.orderItem.price);
                    shippingFee = $scope.order.orderShipCost;
                    // Tính tổng tiền dựa trên số lượng và giá của orderItem
                    totalAmount = subTotal - $scope.discountCost + shippingFee;
                }

                $scope.combinedData = combinedData;
                $scope.subTotal = subTotal;
                $scope.shippingFee = shippingFee;
                $scope.totalAmount = totalAmount;
            });
        });

        // Watch for changes in discountId and update discountCost accordingly
        $scope.$watch('discountId', function (newDiscountId, oldDiscountId) {
            if (newDiscountId !== oldDiscountId) {
                if (newDiscountId !== null) {
                    $http({
                        method: 'GET',
                        url: '/api/discount/' + newDiscountId
                    }).then(function successCallback(response) {
                        $scope.discountCost = response.data.discountCost;
                    });
                } else {
                    // If there's no discount, set discountCost to 0
                    $scope.discountCost = 0;
                }
            }
        });
    };

    $scope.confirmOrderAdmin = function (orderId) {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn xác nhận đơn hàng " + orderId + " không ?",
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
                    url: API_ConfirmOrder + '/' + orderId
                }).then(function successCallback() {
                    centerAlert('Thành công !', 'Đơn hàng ' + orderId + ' đã được xác nhận thành công !', 'success');
                    setTimeout(function () {
                        window.location.replace('/quan-tri/xac-nhan-don-hang');
                    }, 1500);
                });
            }
        })
    }

    $scope.deliveredOrderAdmin = function (orderId) {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn xác nhận đơn hàng " + orderId + " giao thành công không ?",
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
                    url: API_DeliveredOrder + '/' + orderId
                }).then(function successCallback() {
                    centerAlert('Thành công !', 'Đơn hàng ' + orderId + ' đã được xác nhận thành công !', 'success');
                    setTimeout(function () {
                        window.location.replace('/quan-tri/xac-nhan-don-hang');
                    }, 1500);
                });
            }
        })
    }

    $scope.cancelOrderAdmin = function (orderId) {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn huỷ đơn hàng " + orderId + " không ?",
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
                    url: API_CancelOrder + '/' + orderId
                }).then(function successCallback() {
                    centerAlert('Thành công !', 'Đơn hàng ' + orderId + ' đã được huỷ thành công !', 'success');
                    setTimeout(function () {
                        window.location.replace('/quan-tri/xac-nhan-don-hang');
                    }, 1500);
                });
            }
        });
    };

    $scope.cancelOrderAdminByCustomer = function (orderId) {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn huỷ đơn hàng " + orderId + " không ?",
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
                    url: API_CancelOrderByCustomer + '/' + orderId
                }).then(function successCallback() {
                    centerAlert('Thành công !', 'Đơn hàng ' + orderId + ' đã được huỷ thành công !', 'success');
                    setTimeout(function () {
                        window.location.replace('/quan-tri/xac-nhan-don-hang');
                    }, 1500);
                });
            }
        });
    };
});