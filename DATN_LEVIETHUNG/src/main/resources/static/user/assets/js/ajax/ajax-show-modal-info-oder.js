$(document).ready(function () {
    $('.show-info').on('click', function () {
        var url = $(this).attr('href');
        $.ajax({
            url: url, type: 'GET', dataType: 'json', success: function (data) {
                var orders = data.orders;
                var products = data.products;
                var cartItems = data.cartItems;

                $('#madh').val(orders.orderId);
                $('#full_name').val(orders.fullName);
                $('#phone_number').val(orders.phoneNumber);
                $('#email').val(orders.email);
                $('#city').val(orders.province);
                $('#district').val(orders.district);
                $('#ward').val(orders.village);
                $('#address-edit-customer').val(orders.address);
                $('#payment').val(orders.categoryPayment);
                $('#statusOrder').val(orders.statusOrder);
                $('#datePayment').val(formatVietnameseDate(orders.createdAt));
                $('#satusPayment').val(orders.statusPayment);

                // Đưa dữ liệu vào bảng trong modal
                $('#table-modal tbody').empty();
                var giamgiaTong = 0;
                for (var i = 0; i < products.length; i++) {
                    giamgiaTong += (cartItems[i].amount * products[i].price);
                    var formattedTotalPrice = (cartItems[i].amount * products[i].price).toLocaleString('vi-VN', {
                        style: 'currency', currency: 'VND'
                    });

                    var formattedPrice = products[i].price.toLocaleString('vi-VN', {
                        style: 'currency', currency: 'VND'
                    });

                    var html = '<tr>' + '<td>' + products[i].productName + '</td>' + '<td>' + formattedPrice + '</td>' + '<td>' + cartItems[i].amount + '</td>' + '<td>' + formattedTotalPrice + '</td>' + '</tr>';
                    $('#table-modal tbody').append(html);
                    formattedTotalPrice += formattedTotalPrice;
                }

                var giamgia = giamgiaTong - orders.totalAmount;
                $('#giamGia').text(giamgia.toLocaleString('vi-VN', {
                    style: 'currency', currency: 'VND'
                }));

                $('#totalPricePay').text(orders.totalAmount.toLocaleString('vi-VN', {
                    style: 'currency', currency: 'VND'
                }));


                // Hiển thị modal
                $('#modal-confirm-data').modal('show');
            }, error: function (error) {
                console.log(error);
            }
        });
    });
});

function formatVietnameseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}