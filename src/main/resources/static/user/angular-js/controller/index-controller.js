solar_app.controller('index_controller', function ($scope, $http, $timeout, $rootScope, CategoryService, ProductService) {

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // Kiểm tra nếu người dùng đang rời khỏi trang chủ
        if (current.indexOf('#!/trang-chu') !== -1 && next.indexOf('#!/') !== -1) {
            leaveHomePage();
        }
    });

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', {currency: 'VND'}).format(price);
    };

    // lấy ra danh sách sản phẩm
    ProductService.findProductByIdOne()
        .then(function successCallback(response) {
            $scope.products = response.data;
        }, function errorCallback(response) {
            console.log(response.data);
        });

    // lấy ra danh sách top 4 thể loại
    CategoryService.findCategoryTop4()
        .then(function successCallback(response) {
            $scope.categories = response.data;
        }, function errorCallback(response) {
            console.log(response.data);
        });

    // Khởi tạo Swiper trong $timeout để đảm bảo nó được gọi sau khi dữ liệu đã được load
    $timeout(function () {
        const mySwiper = new Swiper('.mySwiper', {
            slidesPerView: 2, grid: {
                rows: 2,
            }, spaceBetween: 30, pagination: {
                el: ".swiper-pagination", clickable: true,
            }, breakpoints: {
                0: {
                    slidesPerView: 1, grid: {
                        rows: 2,
                    },
                }, 600: {
                    slidesPerView: 1, grid: {
                        rows: 2,
                    },
                }, 1000: {
                    slidesPerView: 2, grid: {
                        rows: 2,
                    }, spaceBetween: 30,
                },
            },
        });

        loadSwiperProduct(1);

        $scope.isLoading = false;

        $scope.changes = function (categoryId) {
            $scope.isLoading = true;

            $timeout(function () {
                loadSwiperProduct(categoryId);
            }, 1500);
        }

        function loadSwiperProduct(categoryId) {
            ProductService.findProductByCategoryId(categoryId)
                .then(function successCallback(response) {
                    $scope.object_product = response.data;

                    // Khi dữ liệu đã được load, hãy cập nhật Swiper
                    $timeout(function () {
                        mySwiper.update();
                    });
                    $scope.isLoading = false;
                }, function errorCallback(response) {
                    console.log(response.data);
                });
        }
    });

    var countdownIntervalId;  // Biến toàn cục để lưu trữ interval ID

    ProductService.findProductHasCloserSale()
        .then(function successCallback(response) {
            $scope.flashSale = response.data;
            if ($scope.flashSale && $scope.flashSale.productBrandId) {
                ProductService.showBrandNameByProductBrandId($scope.flashSale.productBrandId)
                    .then(function successCallback(response) {
                        $scope.saleBrandName = response.data.brandName;
                    }, function errorCallback(response) {
                        console.log(response.data);
                    });
            }
            var endTime = new Date($scope.flashSale.productSaleOffById[0].endUse).getTime();

            countdownIntervalId = setInterval(function () {
                var now = new Date().getTime();

                var timeLeft = endTime - now;

                var days = Math.max(Math.floor(timeLeft / (1000 * 60 * 60 * 24)), 0);
                var hours = Math.max(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0);
                var minutes = Math.max(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)), 0);
                var seconds = Math.max(Math.floor((timeLeft % (1000 * 60)) / 1000), 0);

                function addLeadingZero(value) {
                    return value < 10 ? "0" + value : value;
                }

                document.getElementById("cdt-days").innerHTML = addLeadingZero(days);
                document.getElementById("cdt-hours").innerHTML = addLeadingZero(hours);
                document.getElementById("cdt-minutes").innerHTML = addLeadingZero(minutes);
                document.getElementById("cdt-seconds").innerHTML = addLeadingZero(seconds);

                if (timeLeft <= 0) {
                    clearInterval(countdownIntervalId);
                    document.getElementById("countdown").innerHTML = "Ưu đãi cho sản phẩm này đã kết thúc!";
                }
            }, 1000); // Cập nhật mỗi 1 giây.
        }, function errorCallback(response) {
            console.log(response.data);
        });

// Khi chuyển trang
    function leaveHomePage() {
        clearInterval(countdownIntervalId);
    }
});