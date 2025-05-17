solar_app.controller('check_details_controller', function ($scope, $http, $timeout, $window, CartService, UserService, DiscountService, SaleOffService, ShippingService) {

    // Kiểm tra xem đã có thông tin mã giảm giá trong local storage chưa
    $scope.discountApplied = localStorage.getItem('appliedDiscount') !== null;
    $scope.appliedDiscount = JSON.parse(localStorage.getItem('appliedDiscount')) || null;

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', {currency: 'VND'}).format(price);
    };

    let shippingService;
    let totalShippingFee;
    let defaultProvinceID, defaultDistrictID, defaultWardId;

    $scope.user = {
        provinceName: null, districtName: null, wardName: null
    };

    $scope.showDiscountHTML = true;
    $scope.discount_code = "";

    // lấy ra object giỏ hàng sp, thương hiệu, img
    CartService.findAllCart().then(function successCallback(response) {
        let object_cart = $scope.object_cart = response.data;
        // cho nó giá trị tiền ship sẳn
        totalShippingFee = 0
        $scope.calculate_total(object_cart, $scope.appliedDiscount);
    }, function errorCallback(response) {
        console.log(response.data);
    });

    // lấy ra session user đang đăng nhập
    UserService.findUserBySession().then(function successCallback(response) {
        $scope.user = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    });

    // lấy ra danh sách mã giảm giá
    DiscountService.findDiscount().then(function successCallback(response) {
        $scope.discounts_modal = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    });

    // Lấy danh sách tỉnh thành
    ShippingService.getProvince().then(function (response) {
        $scope.ship_province = response.data.data;

        // Kiểm tra nếu user đã có tỉnh thành được chọn
        if ($scope.user.provinceName && $scope.ship_province.length > 0) {
            const matchedProvince = $scope.ship_province.find(function (province) {
                return province.ProvinceName === $scope.user.provinceName;
            });

            if (matchedProvince) {
                $scope.user.provinceName = matchedProvince;
            }

            defaultProvinceID = matchedProvince.ProvinceID;

            // Lấy danh sách quận/huyện của tỉnh đã chọn
            ShippingService.getDistrictsByProvinceId(matchedProvince.ProvinceID).then(function (response) {
                $scope.ship_districts = response.data.data;

                // Kiểm tra nếu user đã có quận/huyện được chọn
                if ($scope.user.districtName && $scope.ship_districts.length > 0) {
                    const matchedDistrict = $scope.ship_districts.find(function (district) {
                        return district.DistrictName === $scope.user.districtName;
                    });

                    if (matchedDistrict) {
                        $scope.user.districtName = matchedDistrict;
                    }

                    // lấy giá giá trị mặc định của huyện trong db
                    defaultDistrictID = matchedDistrict.DistrictID;

                    // Lấy danh sách xã/phường của quận/huyện đã chọn
                    ShippingService.getWardByDistrictId(matchedDistrict.DistrictID).then(function (response) {
                        $scope.ship_ward = response.data.data;

                        // Kiểm tra nếu user đã có xã/phường được chọn
                        if ($scope.user.wardName && $scope.ship_ward.length > 0) {
                            const matchedWard = $scope.ship_ward.find(function (ward) {
                                return ward.WardName === $scope.user.wardName;
                            });

                            if (matchedWard) {
                                $scope.user.wardName = matchedWard;
                            }
                            defaultWardId = matchedWard.WardCode;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
            }, function (error) {
                console.log(error);
            });
        }
    }, function (error) {
        console.log(error);
    });

    // Hàm này được gọi khi người dùng chọn một tỉnh thành cụ thể
    $scope.getDistricts = function (provinceName) {
        const province_id = provinceName.ProvinceID;

        // Cập nhật giá trị mặc định của tỉnh thành (nếu người dùng chọn)
        defaultProvinceID = province_id;

        ShippingService.getDistrictsByProvinceId(province_id).then(function (response) {
            $scope.ship_districts = response.data.data;

            if ($scope.user.districtName && $scope.ship_districts.length > 0) {
                const matchedDistricts = $scope.ship_districts.find(function (districts) {
                    return $scope.user.districtName === districts.DistrictName;
                });

                if (matchedDistricts) {
                    $scope.user.districtName = matchedDistricts;
                }
            }
        }, function (error) {
            console.log(error);
        });
    };

    // Hàm này được gọi khi người dùng chọn một quận huyện cụ thể
    $scope.getWards = function (districtName) {
        if (districtName) { // Kiểm tra xem districtName đã được chọn chưa
            const district_id = districtName.DistrictID;

            defaultDistrictID = district_id;

            ShippingService.getWardByDistrictId(district_id).then(function (response) {
                $scope.ship_ward = response.data.data;

                if ($scope.user.wardName && $scope.ship_ward.length > 0) {
                    const matchedWard = $scope.ship_ward.find(function (ward) {
                        return ward.WardName === $scope.user.wardName;
                    });

                    if (matchedWard) {
                        $scope.user.wardName = matchedWard;
                    }

                    // Cập nhật giá trị mặc định của xã/phường (nếu người dùng chọn)
                    defaultWardId = matchedWard.WardCode;
                }
            }, function (error) {
                console.log(error);
            });
        }
    };

    // lấy ra xã đã được chọn
    $scope.onWardChange = function (selectedWard) {
        if (selectedWard) {
            defaultWardId = selectedWard.WardCode;

            $scope.calculateFee($scope.serviceName);
        }
    }

    // lấy dịch vụ chuyển phát của giao hàng nhanh
    ShippingService.getAvailableServices().then(function (response) {
        shippingService = $scope.ship_services = response.data.data;

        // Chọn hình thức vận chuyển đầu tiên
        $scope.serviceName = $scope.ship_services[0];

        // chạy hàm này để lấy ra được huyện và xã
        $scope.$watch('user.districtName', function (newDistrict, oldDistrict) {
            if (newDistrict !== oldDistrict) {
                $scope.calculateFee($scope.serviceName);
            }
        });
    }, function (error) {
        console.log(error);
    });

    // tính toán phí dịch vụ
    $scope.calculateFee = function (selectedService) {
        let items = [];

        for (let i = 0; i < $scope.object_cart.length; i++) {
            let product = $scope.object_cart[i];
            items.push({
                "name": product[1].productName,
                "quantity": product[1].quantity,
                "height": 10,
                "weight": 10,
                "length": 100,
                "width": 100
            });
        }

        if (selectedService) {
            const requestData = {
                "service_type_id": selectedService.service_type_id,
                "from_district_id": 1572, // ninh kiều, cần thơ
                "to_district_id": defaultDistrictID,
                "to_ward_code": defaultWardId,
                "height": 1,
                "length": 1,
                "weight": 1,
                "width": 1,
                "insurance_value": 0,
                "coupon": null,
                "items": items
            };

            ShippingService.calculateShippingFee(requestData).then(function (response) {
                totalShippingFee = $scope.shippingFee = response.data.data;

                // tính toán tiền và tính thời gian dự kiến
                $scope.calculate_total($scope.object_cart, $scope.appliedDiscount);
                $scope.intend_time_ship(defaultDistrictID, defaultWardId, selectedService.service_id);
            }, function (error) {
                console.log(error);
            });
        }
    };

    //tính toán thời gian dự kiến vận chuyển
    $scope.intend_time_ship = function (districtId, wardId, service_id) {
        const requestData = {
            from_district_id: 1572,
            from_ward_code: "550105",
            to_district_id: districtId,
            to_ward_code: [wardId.toString()],
            service_id: service_id
        };

        if (requestData) {
            ShippingService.getEstimatedDeliveryTime(requestData).then(function (response) {
                $scope.intend_time = response.data.data.leadtime;
            }, function (error) {
                console.log(error);
            });
        }
    }

    // tính toán và áp dụng discount
    $scope.load_discount = function () {
        let userId = $scope.user.id;
        let date_time = new Date();
        let subtotal = 0;

        let object_cart = $scope.object_cart;
        let discounts_modal = $scope.discounts_modal;
        let discount_code_input = $scope.discount_code.trim();

        for (let i = 0; i < object_cart.length; i++) {
            subtotal += object_cart[i][0].quantity * object_cart[i][1].price;
        }

        if (!discount_code_input || discount_code_input.trim().length === 0) {
            toastAlert('warning', 'Vui lòng nhập mã giảm giá !');
            return;
        }

        let validDiscount = discounts_modal.find(discount => discount.id === discount_code_input);

        if (!validDiscount) {
            toastAlert('warning', 'Mã giảm giá không tồn tại !');
            return;
        }

        let discountEndDate = new Date(validDiscount.endUse);

        if (validDiscount.discountCost > subtotal) {
            toastAlert('warning', 'Không đủ điều kiện dùng mã !');
            return;
        }

        if (validDiscount.quantity === 0) {
            toastAlert('warning', 'Mã giảm giá đã hết !');
            return;
        }

        if (discountEndDate < date_time || !validDiscount.isActive) {
            toastAlert('warning', 'Mã giảm giá đã hết hạn !');
            return;
        }

        DiscountService.checkDiscountByUserIdAndDiscountId(userId, discount_code_input).then(function (response) {
            let userUseDiscount = response.data;

            if (userUseDiscount === true) {
                centerAlert('Thất Bại !', 'Mã giảm giá ' + discount_code_input + ' này bạn đã sử dụng rồi !', 'warning');
            } else {
                $scope.apply_discount(validDiscount);
            }
        });
    };

    // áp dụng discount
    $scope.apply_discount = function (discount_code_db) {
        DiscountService.findDiscountByDiscountId(discount_code_db.id).then(function successCallback(response) {
            let discounts = $scope.discount = response.data;

            // Lưu thông tin mã giảm giá vào local storage
            localStorage.setItem('appliedDiscount', JSON.stringify(discounts));

            // lưu local storage vào trong $scope.appliedDiscount
            $scope.appliedDiscount = JSON.parse(localStorage.getItem('appliedDiscount'))

            // Đặt lại biến để hiện component
            $scope.discountApplied = true;

            centerAlert('Thành công !', 'Sử dụng mã giảm giá thành công và được giảm giá ' + $scope.formatPrice(discounts.discountCost) + ' ₫ !', 'success')

            // tính lại tiền
            $scope.calculate_total($scope.object_cart, discounts);
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }

    // Xoá discount khỏi localsoted nếu người dùng muốn
    $scope.deleteDiscount = function () {
        let discountId = $scope.appliedDiscount.id;

        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn xoá mã giảm giá " + discountId + " này không ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý !',
            cancelButtonText: 'Huỷ !'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('appliedDiscount');

                // Gọi hàm tính lại tiền
                $scope.calculate_total($scope.object_cart, null);

                // Đặt lại biến để ẩn component
                $scope.discountApplied = false;
                $scope.appliedDiscount = null;

                // Cập nhật giao diện người dùng
                $scope.$apply();
            }
        });
    };

    // lấy ra tất cả sản phẩm giảm giá
    SaleOffService.findAll().then(function successCallback(response) {
        $scope.sale_offs = response.data;
    });

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

    // tính tổng giá tiền và tạm tính
    $scope.calculate_total = function (object_cart, discounts) {
        let shippingFee = totalShippingFee.total ? totalShippingFee.total : totalShippingFee;
        let subtotal = 0;
        let discount = discounts ? discounts.discountCost : 0;
        let total;

        for (let i = 0; i < object_cart.length; i++) {
            let product = object_cart[i][1];
            let quantity = object_cart[i][0].quantity;

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

        total = subtotal - discount + shippingFee;

        $scope.subtotal = subtotal;
        $scope.discount = discount;
        $scope.shippingFee = shippingFee;
        $scope.total = total;

        //lấy mã giãm giá
        if (discounts !== null) {
            $scope.discountId = discounts.id;
        }
    }
});
