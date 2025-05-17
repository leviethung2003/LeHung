function filterProducts() {
    $(document).ready(function () {
        var categoryId = getDanhMucFromURL();
        var productType = $("#meta_style").val();
        var filteredProducts = $("#filtered-products");
        filteredProducts.empty(); // Xóa nội dung hiện tại của phần tử
        var ajaxRequests = [];
        $.ajax({
            url: "/san-pham/load-products",
            type: "GET",
            data: {
                "danh-muc": categoryId,
                "productType": productType
            },
            success: function (data) {
                console.log(data);

                if (data.length > 0) {
                    $.each(data, function (iterStat, pd_categories) {
                        var request = getBrandName(pd_categories.brandId);
                        ajaxRequests.push(request);
                    });

                    // Xử lý khi tất cả cuộc gọi AJAX đã hoàn thành
                    $.when.apply($, ajaxRequests).done(function () {
                        var results = arguments;
                        $.each(data, function (iterStat, pd_categories) {
                            var brandName = results[iterStat][0];
                            console.log(brandName)
                            if (iterStat % 2 === 1) {
                                filteredProducts.append(`
                                    <div>
                                        <a href="/san-pham/san-pham-chi-tiet?ma-san-pham=${pd_categories.productId}">
                                            <div class="item mt-4 mb-4 aos-init aos-animate" data-aos="fade-up">
                                                <div class="row">
                                                    <div class="float-left col-xl-4">
                                                        <img src="/upload/${pd_categories.productImagesByProductId[0].imagePath}" alt="img">
                                                    </div>

                                                    <div class="float-right col-xl-8 d-flex justify-content-center align-items-center">
                                                        <div class="content">
                                                            <h3>${pd_categories.productName}</h3>
                                                            <p class="desciption text-dark">${pd_categories.descriptions}</p>
                                                            <p class="wat text-dark">Công suất: <b>${pd_categories.power}</b></p>
                                                            <p class="brand text-dark">Hãng: <b>${brandName}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>
                                            </div>
                                        </a>
                                    </div>
                                `);
                            } else {
                                filteredProducts.append(`
                                    <div>
                                        <a href="/san-pham/san-pham-chi-tiet?ma-san-pham=${pd_categories.productId}">
                                            <div class="item mt-4 mb-4 aos-init aos-animate" data-aos="fade-up">
                                                <div class="row">
                                                    <div class=" col-xl-4">
                                                        <img src="/upload/${pd_categories.productImagesByProductId[0].imagePath}" alt="img">
                                                    </div>
                                                    <div class=" col-xl-8">
                                                        <h3>${pd_categories.productName}</h3>
                                                        <p class="desciption text-dark">${pd_categories.descriptions}</p>
                                                        <p class="wat text-dark">Công suất: <b>${pd_categories.power}</b></p>
                                                        <p class="brand text-dark">Hãng: <b>${brandName}</b></p>
                                                    </div>
                                                    <hr>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                `);
                            }
                        });
                    });
                } else {
                    filteredProducts.append("<p class=\"text-center\">Danh sách sản phẩm đang trống...</p>");
                }
            },
            error: function (error) {
                console.log("Error: " + JSON.stringify(error));
            }
        });
    });
}

function getDanhMucFromURL() {
    // Lấy đường dẫn URL hiện tại
    var currentURL = window.location.href;

    // Tìm vị trí của tham số "danh-muc" trong URL
    var indexOfDanhMuc = currentURL.indexOf("danh-muc=");

    // Kiểm tra xem có tồn tại tham số "danh-muc" trong URL không
    if (indexOfDanhMuc !== -1) {
        // Tìm vị trí của ký tự '&' tiếp theo sau tham số "danh-muc"
        var nextAmpersandIndex = currentURL.indexOf("&", indexOfDanhMuc);

        // Lấy mã danh mục từ URL
        if (nextAmpersandIndex !== -1) {
            var danhMucValue = currentURL.substring(indexOfDanhMuc + "danh-muc=".length, nextAmpersandIndex);
            return danhMucValue;
        } else {
            var danhMucValue = currentURL.substring(indexOfDanhMuc + "danh-muc=".length);
            return danhMucValue;
        }
    } else {
        // Trả về null nếu không tìm thấy tham số "danh-muc" trong URL
        return null;
    }
}

function getBrandName(brandId) {
    return $.ajax({
        url: "/san-pham/get-brand-name",
        type: "GET",
        data: {"brandId": brandId}
    });
}