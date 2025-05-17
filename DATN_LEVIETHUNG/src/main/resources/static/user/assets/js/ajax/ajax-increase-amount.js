$(document).ready(function () {
    $('.increase-quantity').click(function () {
        const quantityInput = $(this).siblings('.quantity-input');
        const quantity = parseInt(quantityInput.val(), 10);
        const newQuantity = quantity + 1;
        quantityInput.val(newQuantity);

        const inputElement = $(this).closest('.button-quantity').find('input');
        const cartId = inputElement.closest('.row').find('.cart-id').val();

        // Gửi yêu cầu kiểm tra số lượng tăng
        $.ajax({
            type: 'POST',
            url: '/gio-hang/kiem-tra-so-luong',
            data: {
                'ma-gio-hang': cartId,
                'so-luong': newQuantity
            }, success: function (data) {
                if (data.valid) {
                    updateCartIncrease(cartId, newQuantity);
                } else {
                    Swal.fire(
                        'Cảnh báo !',
                        'Số lượng đã đạt đến mức tối đa !',
                        'warning'
                    )
                }
            }
        });
    });

    $('.decrease-quantity').click(function () {
        const quantityInput = $(this).siblings('.quantity-input');
        const quantity = parseInt(quantityInput.val(), 10);
        const inputElement = $(this).closest('.button-quantity').find('input');
        const cartId = inputElement.closest('.row').find('.cart-id').val();

        if (quantity > 1) {
            const newQuantity = quantity - 1;
            quantityInput.val(newQuantity);

            updateCartDecrease(cartId, newQuantity);
        }
        if (quantity === 1) {
            Swal.fire({
                title: 'Cảnh báo ?',
                text: "Bạn có chắc chắn muốn xoá sản phẩm này ra khỏi giỏ hàng không ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/gio-hang/xoa-gio-hang/" + cartId;
                } else {
                    return false;
                }
            });
        }
    });
});

// get qua controller và update db của tăng số lượng
function updateCartIncrease(cartId, newQuantity) {
    $.ajax({
        type: 'GET',
        url: '/gio-hang/tang-so-luong',
        data: {
            'ma-gio-hang': cartId,
            'so-luong': newQuantity
        }, success: function (data) {
            const price = data.price;
            const totalPrice = data.total + price;
            const amountDb = data.cart.amount;

            // Kiểm tra nếu amount trong DB bé hơn amount của giỏ hàng
            if (amountDb < newQuantity) {
                // Vô hiệu hóa nút tăng
                $('.increase-quantity').prop('disabled', true);
            } else {
                // Kích hoạt lại nút tăng
                $('.increase-quantity').prop('disabled', false);
            }

            updatePriceAndTotalOnViews(cartId, newQuantity, price, totalPrice);
        }, error: function (error) {
            console.log(error.text());
        }
    });
}

// get qua controller và update db của giảm số lượng
function updateCartDecrease(cartId, newQuantity) {
    $.ajax({
        type: 'GET',
        url: '/gio-hang/tang-so-luong',
        data: {
            'ma-gio-hang': cartId,
            'so-luong': newQuantity
        }, success: function (data) {
            const price = data.price;
            const totalPrice = data.total - price;

            $('.increase-quantity').prop('disabled', false);
            updatePriceAndTotalOnViews(cartId, newQuantity, price, totalPrice);
        }, error: function (error) {
            console.log(error.text());
        }
    });
}

// format giá và cập nhật lên form
function updatePriceAndTotalOnViews(cartId, quantity, price, totalPrice) {
    const subtotalElement = $(`#total_${cartId}`);

    $('#subtotal').text(totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}));
    $('#totalPricePay').text(totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}));

    const formattedTotal = new Intl.NumberFormat('vi-VN', {
        style: 'currency', currency: 'VND'
    }).format(quantity * price);

    subtotalElement.text(`Tạm tính: ${formattedTotal}`);
    console.log('vao roi nha')
}
