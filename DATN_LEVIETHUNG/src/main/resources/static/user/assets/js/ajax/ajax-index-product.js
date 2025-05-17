document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[id^="product-"]');
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const categoryId = this.id.split('-')[1];

            $.ajax({
                url: '/trang-chu/load-slide',
                type: 'GET',
                data: {'ma-san-pham': categoryId},
                dataType: 'JSON',
                beforeSend: function () {
                    $('#loading').show(); // Hiển thị loading khi AJAX bắt đầu
                },
                success: function (data) {
                    const list_product = data.product_load_slide;
                    const brandName = data.brandName;
                    updateSlider(list_product, brandName);
                },
                error: function (error) {
                    console.error('Lỗi khi tải dữ liệu:', error);
                    console.log(error.text);
                },
                complete: function () {
                    $('#loading').hide(); // Ẩn loading khi AJAX hoàn thành (bất kể thành công hay không)
                }
            });
        });
    });
});

function updateSlider(data, brandName) {
    const productSlider = document.getElementById('product-slider');
    const swiperWrapper = productSlider.querySelector('.swiper-wrapper');
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

    // Xóa các phần tử cũ trong slider
    swiperWrapper.innerHTML = '';

    // Thêm các phần tử mới
    data.forEach(function (item) {
        const newSlide = document.createElement('div');
        newSlide.className = 'swiper-slide';

        newSlide.innerHTML = `
            <a href="/san-pham/san-pham-chi-tiet?ma-san-pham=${item.productId}">
                <div class="d-flex align-items-center product-hot">
                    <img src="/upload/${item.productImagesById[0].imagePath}" width="30%" alt="">
                    <div class="content-item text-start text-dark">
                        <div style="font-size: 14px">${brandName}</div>
                        <div style="padding-right: 10px; font-size: 16px; text-transform: uppercase">${item.productName}</div>
                        <div style="font-size: 14px">Công suất: <span style="font-weight: bold">${item.power}</span></div>
                        <div style="font-size: 14px">Giá: <span style="font-weight: bold">${formatCurrency(item.price)}</span></div>
                    </div>
                </div>
            </a>
        `;

        swiperWrapper.appendChild(newSlide);
    });

    // Cập nhật Swiper
    mySwiper.update();
}

function formatCurrency(price) {
    return new Intl.NumberFormat('vi-VN', {currency: 'VND'}).format(price);
}