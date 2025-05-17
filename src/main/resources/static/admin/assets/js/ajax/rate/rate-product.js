
$(document).ready(function () {
    // Thêm sự kiện click cho mỗi nút "Xem đánh giá"
    $('#sort-table-rate-product').on('click', '#button-rate', function () {
        // Lấy dữ liệu của hàng tương ứng
        var row = $(this).closest('tr');
        var productId = row.find('.hidden-text-table').text(); // Lấy giá trị từ cột ẩn

        $.ajax({
            url: "http://localhost:8080/quan-tri/danh-gia/findRateByProductId/" + productId,
            type: 'GET',
            success: function(response) {
                console.log("Dữ liệu nhận được:", response);
                updateUI(response.data);
            },
            error: function(error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        });

        console.log('Đã click vào sản phẩm có ID: ' + productId);

        document.getElementById("starContainer").innerHTML = "";
        document.getElementById("ratingValue").innerText = "0";
        $.ajax({
            url: "http://localhost:8080/quan-tri/danh-gia/advScoreRate/" + productId,
            type: 'GET',
            success: function(response) {
                var rating = response.data;

                var roundedRating = Math.round(rating);

                // Tạo container cho các ngôi sao
                var starContainer = document.getElementById("starContainer");

                // Tạo ngôi sao dựa trên giá trị đánh giá
                for (var i = 1; i <= 5; i++) {
                    var star = document.createElement("i");
                    star.className = i <= roundedRating ? "bx bx-star text-warning" : "bx bx-star";
                    star.style.fontSize = "25px";
                    starContainer.appendChild(star);
                }

                // Cập nhật giá trị đánh giá trong thẻ h1
                document.getElementById("ratingValue").innerText = response.data;
            },
            error: function(error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        });

        $.ajax({
            url: "http://localhost:8080/quan-tri/danh-gia/quailityRate/" + productId,
            type: 'GET',
            success: function(response) {
                // Cập nhật giá trị đánh giá trong thẻ h1
                document.getElementById("qualityRate").innerText = response.data;
            },
            error: function(error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        });

        $.ajax({
            url: "http://localhost:8080/quan-tri/danh-gia/getProductByProductId/" + productId,
            type: 'GET',
            success: function(response) {
                console.log(response.data);
                setProductData(response.data.productImagesById[0].imagePath, response.data.productName);
            },
            error: function(error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        });
    });
});
document.getElementById("button-rate").addEventListener("click", function (event) {
    const productId = document.getElementById("rateProductId").value;
    $.ajax({
        url: "http://localhost:8080/quan-tri/danh-gia/findRateByProductId/" + productId,
        type: 'GET',
        success: function(response) {
            console.log("Dữ liệu nhận được:", response);
            if(response.status === 200){
                updateUI(response.data);
            }
        },
        error: function(error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    });
});


// Hàm để đặt dữ liệu vào phần tử HTML
function setProductData(imageUrl, productName) {
    // Lấy phần tử HTML bằng ID
    var productPicture = document.getElementById('ProductPicture');
    var nameProduct = document.getElementById('NameProduct');

    // Đặt giá trị ảnh và tên vào phần tử HTML
    productPicture.src = "/upload/" + imageUrl;
    nameProduct.textContent = productName;
}

var ratingsData;

function updateUI(ratings) {
    $("#userReviews").empty();
    ratingsData = ratings;

    for (var i = 0; i < ratings.length; i++) {

        var rating = ratings[i];
        var ratingHtml = "<div class='col-md-12'>";
        ratingHtml += "<span>Trạng thái bình luận: </span>";
        ratingHtml += "<button class='btn btn-sm ms-2' onclick='confirmHideReview(" + i + ")'>" + (rating.reviewStatus ? "Hiển thị" : "Ẩn") + "</button>";
        ratingHtml += "<div class='card'>";
        ratingHtml += "<div class='card-body'>";
        ratingHtml += "<div class='d-flex align-items-center mb-2'>";
        ratingHtml += "<img src='/upload/avataUser.png' alt='User Avatar' class='rounded-circle' style='width: 30px; height: 30px; object-fit: cover;'>";
        ratingHtml += "<h5 class='card-title' style='margin: 0 0 0 10px'>" + rating.fullname + "</h5>";
        ratingHtml += "</div>";
        ratingHtml += "<div class='d-flex align-items-center mb-2'>";
        ratingHtml += "<div class='rating-stars'>";

        // Tạo ngôi sao theo số điểm đánh giá
        for (var j = 0; j < rating.rate; j++) {
            ratingHtml += "<i class='bx bx-star text-warning'></i>";
        }

        ratingHtml += "</div>";
        ratingHtml += "<span class='ms-2'>" + rating.rate + " Sao</span>";
        ratingHtml += "</div>";
        ratingHtml += "<p class='card-text mt-2'>" + rating.content + "</p>";

        // Hiển thị ảnh đánh giá
        if (rating.images.length > 0) {
            ratingHtml += "<div class='d-flex flex-wrap'>";
            for (var k = 0; k < rating.images.length; k++) {
                ratingHtml += "<img src='/upload/" + rating.images[k] + "' alt='Review Image' class='img-thumbnail mx-1 my-1' style='max-width: 100px; max-height: 100px; object-fit: cover;'>";
            }
            ratingHtml += "</div>";
        }

        ratingHtml += "</div>";
        ratingHtml += "</div>";
        ratingHtml += "</div>";

        // Add review status and "Ẩn" button
        ratingHtml += "<div class='mt-2'>";
        ratingHtml += "</div>";

        $("#userReviews").append(ratingHtml);
    }
}
function confirmHideReview(index) {
    var rating = ratingsData[index];

    // Sử dụng Bootstrap Modal để hiển thị thông báo
    var confirmation = confirm("Bạn có chắc muốn " + (rating.reviewStatus ? "ẩn" : "hiển thị") + " đánh giá này không?");
    if (confirmation) {
        $.ajax({
            url: "http://localhost:8080/quan-tri/danh-gia/updateProductRateByProductId/" + rating.reviewId,
            type: 'PUT',
            success: function(response) {
                const productId = response.data.productId;
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
                    title: response.message
                });

                $.ajax({
                    url: "http://localhost:8080/quan-tri/danh-gia/findRateByProductId/" + productId,
                    type: 'GET',
                    success: function(response) {
                        console.log("Dữ liệu nhận được:", response);
                        updateUI(response.data);
                    },
                    error: function(error) {
                        console.error("Lỗi khi gửi yêu cầu:", error);
                    }
                });
            },
            error: function(error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
            }
        });
        console.log("Dữ liệu đánh giá cần ẩn:", rating);
    }
}


