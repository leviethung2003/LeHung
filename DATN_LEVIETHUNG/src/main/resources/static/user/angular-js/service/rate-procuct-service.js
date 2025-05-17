/**
 * Các phương thức service trong Rate Product
 */
solar_app.service('RateProductService', function ($http) {

    /**
     * Phương thức tìm tất cả đánh giá thông qua mã sản phẩm
     * @param productId mã sản phẩm
     * @returns {*}
     */
    this.findAllRateByProductId = function (productId) {
        return $http({
            method: 'GET',
            url: API_RateProduct + '/findProductRate/' + productId
        })
    };

    /**
     * Phương thức tìm kiếm đơn hàng của người dùng
     * @param userId
     * @returns {*}
     */
    this.findOrderByUserId = function (userId) {
        return $http({
            method: 'GET',
            url: API_RateProduct + '/findOrderByUserId/' + userId
        })
    };

    /**
     * Phương thức tìm tất cả từ bị cấm
     */
    this.findAllBannerWord = function () {
        return $http({
            method: 'GET',
            url: API_RateProduct + '/listBannerWord'
        })
    }

    /**
     * Phương thức tạo đánh giá của người dùng
     * @param data
     * @returns {*}
     */
    this.createRateProduct = function (data) {
        return $http({
            method: 'POST',
            url: API_RateProduct + '/save',
            data: data
        })
    }
});

/**
 * Phương thức kiểm tra hình ảnh có phải là ảnh nhạy cảm hay không
 */
solar_app.factory('ImageValidationService', ['$q', function ($q) {
    return {
        areImagesSafe: function (files) {
            const fileArray = Array.from(files); // Chuyển đổi sang mảng

            const promises = fileArray.map(function(file) {
                return $q(function (resolve, reject) {
                    const reader = new FileReader();

                    reader.onload = function () {
                        const image = new Image();
                        image.src = reader.result;

                        image.onload = function () {
                            nsfwjs.load().then(model => {
                                model.classify(image).then(predictions => {
                                    const isSensitive = predictions.some(prediction => prediction.className === 'Porn' && prediction.probability > 0.3);
                                    resolve(!isSensitive);
                                });
                            });
                        };
                    };

                    reader.onerror = function (error) {
                        reject(error);
                    };
                    reader.readAsDataURL(file);
                });
            });

            return $q.all(promises);
        }
    };
}]);

/**
 * Phương thức kiểm tra từ có từ cấm hay không
 */
solar_app.factory('SensitiveWordsService', function () {
    var bannerWordList = []; // Danh sách từ cấm

    return {
        initializeBannerWordList: function (bannedWords) {
            if (Array.isArray(bannedWords)) {
                bannerWordList = bannedWords;
            } else if (bannedWords && Array.isArray(bannedWords.data)) {
                bannerWordList = bannedWords.data;
            } else {
                console.error("Dữ liệu từ API không hợp lệ");
            }
        },
        // Kiểm tra xem văn bản có chứa từ cấm hay không
        isSensitive: function (text) {
            if (text !== undefined) {
                var lowercasedText = text.toLowerCase();
                return bannerWordList.some(function (word) {
                    return lowercasedText.includes(word);
                });
            }
            return false;
        }
    };
});