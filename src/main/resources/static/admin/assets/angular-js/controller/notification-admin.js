solar_app_admin.controller('NotificationAdmin', function ($scope, $http) {

    $scope.maxVisibleNotifications = 5;
    $scope.visibleNotifications = [];

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', {currency: 'VND'}).format(price);
    };

    $http({
        method: 'GET',
        url: API_Notification + '/findAll'
    }).then(function successCallback(response) {
        $scope.showNotification = false;
        $scope.allNotification = response.data;

        for (let i = 0; i < $scope.allNotification.length; i++) {
            if ($scope.allNotification[i].isSeen === true) {
                $scope.showNotification = true;
                break;
            }
        }

        $scope.updateVisibleNotifications();
    });

    $scope.showMore = function (event) {
        $scope.maxVisibleNotifications += 10;
        $scope.updateVisibleNotifications();
        event.stopPropagation();
    };

    $scope.hideMore = function (event) {
        $scope.maxVisibleNotifications = 5;
        $scope.updateVisibleNotifications();
        event.stopPropagation();
    };

    $scope.updateVisibleNotifications = function () {
        $scope.visibleNotifications = $scope.allNotification.slice(0, $scope.maxVisibleNotifications);
    };

    $scope.seenNotification = function (id, orderId) {
        $http({
            method: 'PUT',
            url: API_Notification + '/updateIsSeen/' + id + '/' + false
        }).then(function successCallback() {
            $scope.loadData();
            $('#modal-info-order-data').modal('show');
            $scope.getInfoOrder(orderId);
        });
    }

    $scope.deleteNotification = function (id) {
        $http({
            method: 'GET',
            url: API_Notification + '/deleteNoted/' + id
        }).then(function successCallback() {
            $scope.loadData();
        });
    }

    $scope.loadData = function () {
        $http({
            method: 'GET',
            url: API_Notification + '/findAll'
        }).then(function successCallback(response) {
            $scope.showNotification = false;
            $scope.allNotification = response.data;

            for (let i = 0; i < $scope.allNotification.length; i++) {
                if ($scope.allNotification[i].isSeen === true) {
                    $scope.showNotification = true;
                    break;
                }
            }

            $scope.updateVisibleNotifications();
        });
    }

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
                    $scope.discountCost = 0;
                }
            }
        });
    };

    // đổi mật khẩu
    $scope.changePasswordAdmin = function () {
        $http({
            method: 'GET',
            url: API_Notification + '/userIsLogin'
        }).then(function successCallback(response) {
            if (response.status === 200) {
                $scope.getUserIsLoginAdmin = response.data;
            }
        });

        $scope.checkPasswordDuplicate = function () {
            let user = {
                password0: $scope.user.password0,
                password1: $scope.user.password1,
                password2: $scope.user.password2
            }

            $scope.passwordMatchError = user.password1 === user.password0;
        }

        $scope.changePassword = function () {
            let password = $scope.user.password0;
            let newPassword = $scope.user.password1;

            Swal.fire({
                title: 'Xác nhận !',
                text: "Bạn có chắc chắn muốn đổi mật khẩu không ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý !',
                cancelButtonText: 'Huỷ !'
            }).then((result) => {
                if (result.isConfirmed) {
                    $http({
                        method: 'PUT',
                        url: API_Notification + '/changePasswordAdmin/' + password + '/' + newPassword
                    }).then(function successCallback(response) {
                        if (response.status === 200) {
                            let responseMessage = response.data.message;
                            let type = responseMessage.substring(0, responseMessage.indexOf(':'));
                            let message = responseMessage.substring(responseMessage.indexOf(':') + 1).trim();

                            if (type === 'success') {
                                $('#modal-change-pass').modal('hide');
                                setTimeout(function () {
                                    window.location.href = 'http://localhost:8080/admin'
                                }, 1000)
                            }
                            toastAlert(type, message);
                        }
                    });
                }
            });
        };
    };
});