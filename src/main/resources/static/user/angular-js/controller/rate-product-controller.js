solar_app.controller('rate_controller',
    function ($scope, $http, $window, $timeout, UserService, RateProductService, ImageValidationService, SensitiveWordsService, ProductService, OrderService) {

        // Các biến được khai báo trước
        $scope.errorImageInput1 = null;
        $scope.errorImageInput2 = null;
        $scope.errorImageInput3 = null;
        $scope.errorImageInput4 = null;
        $scope.addClass = false;
        $scope.errorRateComment = null;
        $scope.selectedImage = null;
        $scope.selectedImages = [];
        $scope.isSubmitButtonDisabled = true;
        $scope.imageErrors = []
        $scope.selectedStars = 0;
        $scope.comment = null;
        $scope.getAllProduct = [];
        $scope.getAllOrders = [];
        $scope.selectedProductId = null;
        $scope.selectedOrdertId = null;
        $scope.showSuccessMessage = false;
        $scope.rateProductList = [];
        $scope.stars = [
            {active: false},
            {active: false},
            {active: false},
            {active: false},
            {active: false}
        ];

        const bannerWordList = null;

        /**
         * Phương thức tìm kiếm toàn bộ từ cấm
         */
        RateProductService.findAllBannerWord().then(function successCallback(response) {
            if (response !== null) {
                SensitiveWordsService.initializeBannerWordList(response);
            } else {
                console.log("lỗi vui lòng thử lại")
            }
        }).catch(function errorCallback() {
            console.log("Lỗi khi gọi API");
        });

        /**
         * Phương thức lấy toàn bộ đơn hàng với trạng thái đã thanh toán
         */
        UserService.findUserBySession().then(function successCallback(response) {
            $scope.users = response.data;

            RateProductService.findOrderByUserId($scope.users.id).then(function success(response) {
                if (response.status === 200) {
                    $scope.orderList = response.data.data;

                    for (let i = 0; i < $scope.orderList.length; i++) {
                        $scope.rateProductList = $scope.rateProductList.slice().concat($scope.orderList[i].orderItemsById);
                    }

                    $timeout(function () {
                        $('#table-rate').DataTable({
                            "order": [],
                            "paging": true,
                            "ordering": true,
                            "info": true,
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/vi.json"
                            }
                        });
                    });
                } else if (response.status === 404) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: response.message
                    });
                }
            }).catch(function error(error) {
                console.log(error)
            });
        })


        /**
         * Phương thức gọi API để lấy danh sách toàn bộ sản phẩm
         */
        ProductService.findAllProducts().then(function successCallback(responseProduct) {
            $scope.getAllProduct = responseProduct.data;
        }).catch(function errorCallback(error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        });

        /**
         * Phương thức ánh xạ mã sản phẩm sang tên sản phẩm
         * @param productId
         * @returns {*}
         */
        $scope.getProductName = function (productId) {
            const lengthProduct = $scope.getAllProduct.length;

            // Lặp qua danh sách sản phẩm và tìm sản phẩm tương ứng
            for (let i = 0; i < lengthProduct; i++) {
                if ($scope.getAllProduct[i].id === productId) {
                    // Trả về tên sản phẩm nếu tìm thấy
                    return $scope.getAllProduct[i].productName;
                }
            }
            // Trả về id nếu không tìm thấy tên sản phẩm
            return productId;
        };

        /**
         * Phương thức ánh xạ mã đơn hàng sang ngày giao haàng
         * @param orderId
         * @returns {*}
         */
        $scope.getDateReceive = function (orderId) {
            const lengthOrder = $scope.getAllOrders.length;

            // Lặp qua danh sách sản phẩm và tìm sản phẩm tương ứng
            for (let i = 0; i < lengthOrder; i++) {
                if ($scope.getAllOrders[i].id === orderId) {
                    // Trả về tên sản phẩm nếu tìm thấy
                    return $scope.getAllOrders[i].dateReceive;
                }
            }
            // Trả về id nếu không tìm thấy tên sản phẩm
            return orderId;
        };

        /**
         * Phương thức gọi API để lấy danh sách sản phẩm
         *
         */
        OrderService.findAllOrder().then(function successCallback(responseOrder) {
            $scope.getAllOrders = responseOrder.data.data;
        })


        /**
         * Phương thức chọn sao đánh giá sản phẩm
         * @param index
         */
        $scope.toggleStar = function (index) {
            // Đảo trạng thái active của các sao từ 1 đến index
            for (let i = 0; i <= index; i++) {
                $scope.stars[i].active = true;
                $scope.starError = null;
            }
            for (let j = index + 1; j < $scope.stars.length; j++) {
                $scope.stars[j].active = false;
            }

            // Đặt giá trị số sao đã chọn
            $scope.selectedStars = index + 1;

            if ($scope.selectedStars === 5) {
                $scope.showRateStarMessage = "Rất hài lòng";
            } else if ($scope.selectedStars === 4) {
                $scope.showRateStarMessage = "Hài lòng";
            } else if ($scope.selectedStars === 3) {
                $scope.showRateStarMessage = "Bình thường";
            } else if ($scope.selectedStars === 2) {
                $scope.showRateStarMessage = "Tệ";
            } else if ($scope.selectedStars === 1) {
                $scope.showRateStarMessage = "Rất tệ";
            } else {
                $scope.showRateStarMessage = "";
            }

            $scope.isSubmitButtonDisabled =
                $scope.errorImageInput1 !== null ||
                $scope.errorImageInput2 !== null ||
                $scope.errorImageInput3 !== null ||
                $scope.errorImageInput4 !== null ||
                $scope.starError !== null ||
                $scope.errorRateComment !== null ||
                $scope.selectedStars === 0;

        };

        /**
         * Phương thức hover vào sao thì đổi màu của sao
         * @param index
         */
        $scope.hoverStar = function (index) {
            // Nếu như sao == 0 thì mới được phép hover
            if ($scope.selectedStars === 0) {
                for (let i = 0; i <= index; i++) {
                    $scope.stars[i].active = true;
                }
                for (let j = index + 1; j < $scope.stars.length; j++) {
                    $scope.stars[j].active = false;
                }

                if (index + 1 === 5) {
                    $scope.showRateStarMessage = "Rất hài lòng";
                } else if (index + 1 === 4) {
                    $scope.showRateStarMessage = "Hài lòng";
                } else if (index + 1 === 3) {
                    $scope.showRateStarMessage = "Bình thường";
                } else if (index + 1 === 2) {
                    $scope.showRateStarMessage = "Tệ";
                } else if (index + 1 === 1) {
                    $scope.showRateStarMessage = "Rất tệ";
                } else {
                    $scope.showRateStarMessage = "Không hợp lệ";
                }
            }
        };

        /**
         * Phuương thức reset lại sao khi không hover
         */
        $scope.resetStars = function () {
            // Đặt lại trạng thái của tất cả các ngôi sao khi di chuột ra khỏi ngôi sao
            if ($scope.selectedStars === 0) {
                for (let i = 0; i < $scope.stars.length; i++) {
                    $scope.stars[i].active = false;
                }
                $scope.showRateStarMessage = "";
            }
        };

        /**
         * Phương thức bắt lỗi chọn hình ảnh để đánh giá
         * @param element danh sách các hình ảnh mà người dùng chọn
         */
        $scope.fileChangedRateImg1 = function (element) {
            $scope.addClass = true;

            const file = element.files;

            $scope.selectedImage = file;
            $scope.maxImageCount = 3;
            $scope.supportedImageTypes = ['image/jpeg', 'image/png'];
            $scope.imageUrl = element.files;

            // Kiểm tra nếu như hình ảnh được người dùng chọn hoặc hình ảnh đã được thêm vào
            if (element.files && element.files.length > 0) {
                $scope.selectedImages = []; // Reset lại các hình ảnh cũ rồi mới thêm ảnh mới
                $scope.errorImageInput1 = null; // Reset lại lỗi

                for (let i = 0; i < element.files.length; i++) {
                    const reader = new FileReader();

                    reader.onload = function (e) {

                        // Kiểm tra loại hình ảnh ngay từ khi người dùng vừa chọn
                        if (!$scope.supportedImageTypes.includes(element.files[i].type)) {
                            $scope.$apply(function () {
                                $scope.errorImageInput1 = 'Vui lòng chọn hình ảnh với định dạng JPEG hoặc PNG.';
                            });
                            return;
                        }

                        // Đẩy hình ảnh vào $scope.selectedImages nếu hình ảnh hợp lệ
                        $scope.$apply(function () {
                            $scope.selectedImages.push(e.target.result);
                        });
                    };

                    reader.onerror = function (e) {
                        $scope.$apply(function () {
                            $scope.errorImageInput1 = 'Vui lòng chọn hình ảnh đúng định dạng';
                        });
                    };

                    reader.readAsDataURL(element.files[i]);
                }

                // Nếu có lỗi, không cần kiểm tra ảnh an toàn
                if ($scope.errorImageInput1) {
                    $scope.isSubmitButtonDisabled = true;
                    $scope.addClass = false;
                    return;
                }

                $scope.isSubmitButtonDisabled =
                    $scope.errorImageInput1 !== null ||
                    $scope.starError !== null ||
                    $scope.errorRateComment !== null ||
                    $scope.selectedStars === 0;
            }

            // Kiểm tra xem hình ảnh có lớn hơn $scope.maxImageCount hay không
            if (element.files.length > $scope.maxImageCount) {
                $scope.errorImageInput1 = 'Vui lòng chỉ chọn 3 hình ảnh';

                // Kiểm tra xem ảnh có đúng định dạng hay không
            } else if (file && !$scope.supportedImageTypes.includes(file[0].type)) {
                $scope.errorImageInput1 = 'Vui lòng chọn hình ảnh đúng định dạng';
                element.value = '';
                $scope.selectedImage1 = null;
                $scope.selectedImages = [];
                $scope.addClass = false;
            }

            // Nếu hình ảnh không hợp lệ thì tắt nút đi
            if ($scope.errorImageInput1) {
                $scope.isSubmitButtonDisabled = true;
                $scope.addClass = false;
                return;
            }

            // Nếu tất cả mọi thứ hợp lệ bat đầu kiểm tra xem ảnh có phản cảm không
            ImageValidationService.areImagesSafe(file)
                .then(function (results) {
                    const hasUnsafeImage = results.some(function (isSafe) {
                        return !isSafe;
                    });

                    // Kiểm tra ảnh nhạy cảm
                    if (hasUnsafeImage) {
                        $scope.errorImageInput1 = 'Vui lòng không tải lên hình ảnh nhạy cảm';
                    } else {
                        $scope.errorImageInput1 = null;
                    }

                    $scope.isSubmitButtonDisabled =
                        $scope.errorImageInput1 !== null ||
                        $scope.starError !== null ||
                        $scope.errorRateComment !== null ||
                        $scope.selectedStars === 0;
                })
                // Xử lí nếu có lỗi
                .catch(function (error) {
                    $scope.errorImageInput1 = 'Lỗi khi tải hình ảnh vui lòng thử lại sau.';

                    if (error instanceof TypeError && error.message.includes('Cannot read property \'length\' of null')) {
                        $scope.errorImageInput1 = 'Hình ảnh không hợp lệ.';
                    } else {
                        $scope.errorImageInput1 = 'Lỗi khi tải hình ảnh vui lòng thử lại sau.';
                    }
                })
                // tắt hiệu ứng load trang nếu như hoàn thành
                .finally(function () {
                    $scope.addClass = false;
                });
        };


        /**
         * Phương thức kiểm tra từ cấm khi đánh giá
         * @param inputText
         */
        $scope.checkSensitive = function (inputText) {
            if (SensitiveWordsService.isSensitive(inputText)) {
                $scope.errorRateComment = 'Vui lòng không sử dụng từ cấm trong đánh giá.';
            } else {
                $scope.comment = inputText;
                $scope.errorRateComment = null;
            }
            $scope.isSubmitButtonDisabled =
                $scope.errorImageInput1 !== null ||
                $scope.starError !== null ||
                $scope.errorRateComment !== null ||
                $scope.selectedStars === 0;
        };

        /**
         * Phương thức mở model thì lưu productID
         * @param productId
         * @param orderId
         */
        $scope.openReviewModal = function (productId, orderId) {
            $scope.selectedProductId = productId;
            $scope.selectedOrdertId = orderId;
        };


        /**
         * Submit đẩy dữ liệu lên server
         */
        $scope.submitRating = function () {
            const formData = new FormData();

            const stars = $scope.selectedStars;
            const comment = $scope.comment;
            const productId = $scope.selectedProductId;
            const orderId = $scope.selectedOrdertId;

            formData.append('stars', stars);
            formData.append('comment', comment);
            formData.append('productId', productId);
            formData.append('orderId', orderId);

            if ($scope.imageUrl && angular.isDefined($scope.imageUrl.length) && $scope.imageUrl.length > 0) {
                for (let i = 0; i < $scope.imageUrl.length; i++) {
                    formData.append('images', $scope.imageUrl[i]);
                }
            }
            for (const pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            $.ajax({
                type: 'POST',
                url: API_RateProduct + '/save',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    console.log(response);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Đánh giá thành công!"
                    });

                    setTimeout(function () {
                        location.reload();
                    }, 1500);
                },
                error: function (error) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Lỗi không thể đánh giá vui lòng thử lại sau it phút!"
                    });
                }
            });

        }

        $scope.isSubmitButtonDisabled =
            $scope.errorImageInput1 !== null ||
            $scope.starError !== null ||
            $scope.errorRateComment !== null ||
            $scope.selectedStars === 0;

        $scope.resetSuccessMessage = function () {
            $scope.showSuccessMessage = false;
        };
    })
