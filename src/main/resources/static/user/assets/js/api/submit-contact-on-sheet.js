const scriptURL = 'https://script.google.com/macros/s/AKfycbzG42eq-5DWy70A8wSuksA-w4M1hgN_35e1UnkEpPv53GchnPRHA7rvvL4ocWii7nKwDQ/exec'

document.addEventListener('DOMContentLoaded', function () {
    const form = document.forms['contact-form'];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Kiểm tra các trường dữ liệu
        const full_name = form.querySelector('[name="Họ và tên"]').value.trim();
        const phone = form.querySelector('[name="Số điện thoại"]').value.trim();
        const email = form.querySelector('[name="Email"]').value.trim();
        const address = form.querySelector('[name="Địa chỉ"]').value.trim();
        const content = form.querySelector('[name="Nội dung"]').value.trim();

        // Nếu bất kỳ trường nào trống
        if (!full_name || !phone || !email || !address || !content) {
            Swal.fire(
                'Thất bại !',
                'Vui lòng nhập đủ thông tin !',
                'warning'
            )
            return;
        }

        // Thêm hiệu ứng loading
        Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        fetch(scriptURL, {method: 'POST', body: new FormData(form)})
            .then(response => {
                // Ẩn hiệu ứng loading khi gửi thành công
                Swal.close();

                Swal.fire(
                    'Thành công !',
                    'Cảm ơn bạn đã đóng góp ý kiến !',
                    'success'
                ).then(() => {
                    window.location.reload();
                });
            })
            .catch(error => {
                // Ẩn hiệu ứng loading khi có lỗi
                Swal.close();
                Swal.fire(
                    'Thất bại !',
                    'Đóng góp ý kiến thất bại !',
                    'error'
                );
            });
    });
});