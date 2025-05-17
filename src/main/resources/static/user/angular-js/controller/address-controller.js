solar_app.controller('address_controller', function ($scope, $http, $timeout, $window, ShippingService, AddressService) {

    $scope.address = {
        provinceName: null, districtName: null, wardName: null,
    };

    // add modal
    $scope.addAddressModal = function () {
        $('#model-add-address').modal('show');
        $('#model-address').modal('hide');
    }

    // default modal
    $scope.showDefaultModal1 = function () {
        $('#model-address').modal('show');
        $('#model-info-address').modal('hide');
    }

    // default modal
    $scope.showDefaultModal2 = function () {
        $('#model-address').modal('show');
        $('#model-add-address').modal('hide');
    }

    // Lấy danh sách tỉnh thành
    ShippingService.getProvince().then(function (response) {
        $scope.ship_province = response.data.data;
    }, function (error) {
        console.log(error);
    });

    // Hàm này được gọi khi người dùng chọn một tỉnh thành cụ thể
    $scope.getDistrictsAddress = function (provinceName) {
        const province_id = provinceName.ProvinceID;

        ShippingService.getDistrictsByProvinceId(province_id).then(function (response) {
            $scope.ship_districts = response.data.data;
        }, function (error) {
            console.log(error);
        });
    };

    // Hàm này được gọi khi người dùng chọn một quận huyện cụ thể
    $scope.getWardAddress = function (districtName) {
        if (districtName) {
            const district_id = districtName.DistrictID;

            ShippingService.getWardByDistrictId(district_id).then(function (response) {
                $scope.ship_ward = response.data.data;
            }, function (error) {
                console.log(error);
            });
        }
    };

    // lấy ra tất cả địa chỉ đã lưu của user id đang đăng nhập
    AddressService.findAllAddress().then(function successCallback(response) {
        $scope.allAdress = response.data;
    });

    // submit thêm địa chỉ
    $scope.submitAddAddressForm = function () {
        let data = {
            toName: $scope.address.fullName,
            toPhone: $scope.address.phoneNumber,
            toProvince: $scope.address.provinceName.ProvinceName,
            toDistrict: $scope.address.districtName.DistrictName,
            toWard: $scope.address.wardName.WardName,
            toAddress: $scope.address.address,
        }

        AddressService.submitAddress(data).then(function successCallback() {
            AddressService.findAllAddress().then(function successCallback(response) {
                $scope.allAdress = response.data;

                toastAlert('success', 'Thêm địa chỉ mới thành công !');
                $('#model-add-address').modal('hide');
                $('#model-address').modal('show');
                $scope.address = {};
            });
        });
    }

    // show thông tin cập nhật modal
    $scope.updateAddressModal = function (addressId) {
        $('#model-address').modal('hide');
        $('#model-info-address').modal('show');

        AddressService.findByAddressId(addressId).then(function successCallback(response) {
            let dataAddress = response.data;

            $scope.address = {
                id: dataAddress.id,
                fullName: dataAddress.toName,
                phoneNumber: dataAddress.toPhone,
                provinceName: dataAddress.toProvince,
                districtName: dataAddress.toDistrict,
                wardName: dataAddress.toWard,
                toAddress: dataAddress.toAddress,
                isActive: dataAddress.isActive,
            };

            const matchedProvince = $scope.ship_province.find(function (province) {
                return province.ProvinceName === $scope.address.provinceName;
            });

            if (matchedProvince) {
                $scope.address.provinceName = matchedProvince;
            }

            // Lấy danh sách quận/huyện của tỉnh đã chọn
            ShippingService.getDistrictsByProvinceId(matchedProvince.ProvinceID).then(function (response) {
                $scope.ship_districts = response.data.data;

                // Kiểm tra nếu user đã có quận/huyện được chọn
                if ($scope.address.districtName && $scope.ship_districts.length > 0) {
                    const matchedDistrict = $scope.ship_districts.find(function (district) {
                        return district.DistrictName === $scope.address.districtName;
                    });

                    if (matchedDistrict) {
                        $scope.address.districtName = matchedDistrict;
                    }

                    // Lấy danh sách xã/phường của quận/huyện đã chọn
                    ShippingService.getWardByDistrictId(matchedDistrict.DistrictID).then(function (response) {
                        $scope.ship_ward = response.data.data;

                        // Kiểm tra nếu user đã có xã/phường được chọn
                        if ($scope.address.wardName && $scope.ship_ward.length > 0) {
                            const matchedWard = $scope.ship_ward.find(function (ward) {
                                return ward.WardName === $scope.address.wardName;
                            });

                            if (matchedWard) {
                                $scope.address.wardName = matchedWard;
                            }
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
            }, function (error) {
                console.log(error);
            });
        });
    };

    // cập nhật địa chỉ
    $scope.updateAddAddressForm = function () {
        $scope.address = {
            id: $scope.address.id,
            toName: $scope.address.fullName,
            toPhone: $scope.address.phoneNumber,
            toProvince: $scope.address.provinceName.ProvinceName,
            toDistrict: $scope.address.districtName.DistrictName,
            toWard: $scope.address.wardName.WardName,
            toAddress: $scope.address.toAddress,
            isActive: $scope.address.isActive,
        };

        AddressService.updateAddress($scope.address).then(function successCallback() {
            AddressService.findAllAddress().then(function successCallback(response) {
                $scope.allAdress = response.data;

                toastAlert('success', 'Cập nhật địa chỉ thành công !');
                $('#model-info-address').modal('hide');
                $('#model-address').modal('show');
                $scope.address = {};
            });
        });
    }

    // thay đổi địa chỉ trên form
    $scope.updateSelectedAddress = function (addressId) {
        $scope.selectedAddressId = addressId;
    };

    $scope.confirmSelection = function () {
        let addressId = $scope.selectedAddressId;

        if (addressId) {
            AddressService.findByAddressId(addressId).then(function successCallback(response) {
                let selectedAddress = response.data;

                $scope.user.fullname = selectedAddress.toName;
                $scope.user.phoneNumber = selectedAddress.toPhone;
                $scope.user.provinceName = selectedAddress.toProvince;
                $scope.user.districtName = selectedAddress.toDistrict;
                $scope.user.wardName = selectedAddress.toWard;
                $scope.user.address = selectedAddress.toAddress;

                $scope.changeAddress();

                $('#model-address').modal('hide');
            });
        }
    };

    $scope.changeAddress = function () {
        const matchedProvince = $scope.ship_province.find(function (province) {
            return province.ProvinceName === $scope.user.provinceName;
        });

        if (matchedProvince) {
            $scope.user.provinceName = matchedProvince;
        }

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
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        }, function (error) {
            console.log(error);
        });
    }
});