solar_app.run(function ($rootScope, $http, $location, CartService, authenticateToken) {
    // lấy ra tổng số lượng giỏ hàng
    CartService.sumQuantityCart().then(function successCallback(response) {
        $rootScope.quantity_cart = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    });

    // dữ liệu session
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        authenticateToken.otherMethod().then(function (data) {
            const currentPath = $location.path();

            if (data.apiUserData !== true) {
                if (currentPath === '/gio-hang') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/lich-su-mua-hang') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/thong-tin') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/doi-mat-khau') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/thong-tin/sua-thong-tin') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan/thanh-cong') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan/that-bai') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                } else if (currentPath === '/danh-gia-san-pham') {
                    $location.path('/dang-nhap');
                    event.preventDefault();
                }
                // Thêm các trường hợp kiểm tra khác nếu cần thiết
            } else {
                if (currentPath === '/dang-nhap') {
                    $location.path('/trang-chu');
                    event.preventDefault();
                } else if (currentPath === '/dang-ky') {
                    $location.path('/trang-chu');
                    event.preventDefault();
                } else if (currentPath === '/quen-mat-khau') {
                    $location.path('/trang-chu');
                    event.preventDefault();
                } else if (currentPath === '/xac-nhan-otp') {
                    $location.path('/trang-chu');
                    event.preventDefault();
                } else if (currentPath === '/mat-khau-moi') {
                    $location.path('/trang-chu');
                    event.preventDefault();
                }
            }
        }).catch(function (error) {
            console.error('Lỗi khi lấy dữ liệu từ session:', error);
        });
    });

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        authenticateToken.otherMethod().then(function (data) {
            const currentPath = $location.path();

            if (data.apiCartData !== true) {
                if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang') {
                    $location.path('/gio-hang');
                    event.preventDefault();
                } else if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan') {
                    $location.path('/gio-hang');
                    event.preventDefault();
                } else if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan/thanh-cong') {
                    $location.path('/gio-hang');
                    event.preventDefault();
                } else if (currentPath === '/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan/that-bai') {
                    $location.path('/gio-hang');
                    event.preventDefault();
                }
            }
        }).catch(function (error) {
            console.error('Lỗi khi lấy dữ liệu từ session:', error);
        });
    });
});

solar_app.factory('authenticateToken', function ($q, $injector) {

    let authenticateTokenFactory = {};

    authenticateTokenFactory.otherMethod = function () {
        const $http = $injector.get('$http');

        // Gửi các yêu cầu API cùng một lúc
        const request1 = $http({
            method: 'GET',
            url: API_User + '/authentication'
        });

        const request2 = $http({
            method: 'GET',
            url: API_Cart + '/cart-interceptor'
        });

        return $q.all([request1, request2]).then(
            function successCallback(responses) {
                const responseData1 = responses[0].data;
                const responseData2 = responses[1].data;

                // Trả về một đối tượng chứa kết quả từ cả hai API
                return {
                    apiUserData: responseData1,
                    apiCartData: responseData2
                };
            },
            function errorCallback(response) {
                console.log(response.data);
                return $q.reject(response);
            }
        );
    }

    return authenticateTokenFactory;
});