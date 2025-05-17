solar_app.controller('product_type', function ($scope, $http, $timeout, $location, ProductService, ProductTypeService, CategoryService) {

    // Lấy tham số từ URL
    const params = $location.search();
    $scope.categoryId = params['danh-muc'];

    // Hàm callback chung cho việc xử lý lỗi
    function errorCallback(response) {
        console.log(response.data);
    }

    // Hàm callback chung cho việc cập nhật dữ liệu sản phẩm
    function updateProducts(categoryId) {
        ProductService.findProductByCategoryId(categoryId).then(function successCallback(response) {
            $scope.products = response.data;
            $scope.isLoading = false;
        }, errorCallback);
    }

    // Lấy danh sách danh mục
    CategoryService.findAllCategory().then(function successCallback(response) {
        $scope.categories = response.data;
    }, errorCallback);

    // Lấy danh sách sản phẩm theo category id
    ProductService.findProductByCategoryId($scope.categoryId).then(function successCallback(response) {
        $scope.products = response.data;
    }, errorCallback);

    // Lấy ra product type đầu tiên khi vào product type
    ProductTypeService.findProductTypeByCategoryId($scope.categoryId).then(function successCallback(response) {
        $scope.product_type = response.data;
    }, errorCallback);

    $scope.isLoading = false;

    // Xử lý sự kiện khi thay đổi danh mục
    $scope.changes = function (categoryId) {
        $scope.isLoading = true;
        $scope.categoryId = categoryId;

        // Lấy danh sách product type theo category id
        ProductTypeService.findProductTypeByCategoryId(categoryId).then(function successCallback(response) {
            $scope.product_type = response.data;
        }, errorCallback);

        // Thiết lập timeout trước khi cập nhật sản phẩm
        $timeout(function () {
            updateProducts(categoryId);
        }, 1500);
    }

    // Xử lý sự kiện khi thay đổi loại sản phẩm
    $scope.onChangeSelectProductType = function (categoryId, productTypeId) {
        $scope.isLoading = true;
        if (!categoryId === null || !categoryId === undefined) {
            $scope.categoryId = categoryId;
        }

        // Kiểm tra nếu productTypeId không được chọn
        if (!productTypeId) {
            $timeout(function () {
                updateProducts(categoryId);
            }, 1500);
        } else {
            $timeout(function () {
                // Lấy danh sách sản phẩm theo category id và product type id
                ProductService.findProductByCategoryIdAndProductTypeId(categoryId, productTypeId).then(function successCallback(response) {
                    $scope.products = response.data;
                    $scope.isLoading = false;
                }, errorCallback);
            }, 1500);
        }
    }
});
