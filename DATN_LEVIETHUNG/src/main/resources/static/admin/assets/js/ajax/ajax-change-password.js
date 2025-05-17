$(document).ready(function () {
    $('.dropdown-item').on('click', function () {
        var url = $(this).attr('href');

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (data) {
                var account = data.accounts;

                $('#email').val(account.email);

                $('#confirm-button-change-pass').click(function (event) {
                    event.preventDefault();

                    Swal.fire({
                        title: 'Cảnh báo !',
                        text: "Bạn có chắc chắn muốn đổi mật khẩu không ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Đồng ý'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#form-change-pass').submit();
                        }
                    });
                });
            }, error: function (error) {
                console.log(error);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const pass0 = document.getElementById('password0');
    const pass1 = document.getElementById('password1');
    const pass2 = document.getElementById('password2');

    const errorPass0 = document.getElementById('pass0Error');
    const errorPass1 = document.getElementById('pass1Error');
    const errorPass2 = document.getElementById('pass2Error');

    const submittedButton = document.getElementById('confirm-button-change-pass');

    let changesPassSubmitted = false;

    function checkInputsChangePass() {
        const fields = [pass0, pass1, pass2];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '') {
                submittedButton.disabled = true;
                return;
            }
        }
        submittedButton.disabled = changesPassSubmitted;
    }

    checkInputsChangePass();

    pass0.addEventListener('blur', function () {
        const value = pass0.value.trim();

        if (value === '') {
            pass0.classList.remove('is-valid');
            pass0.classList.add('is-invalid');
            errorPass0.textContent = 'Vui lòng nhập mật khẩu cũ !';
        } else {
            pass0.classList.remove('is-invalid');
            pass0.classList.add('is-valid');
            errorPass0.textContent = '';
        }
        checkInputsChangePass();
    });

    pass1.addEventListener('blur', function () {
        const password1Value = pass1.value.trim();

        if (password1Value === '' || password1Value.length < 6) {
            pass1.classList.remove('is-valid');
            pass1.classList.add('is-invalid');
            errorPass1.textContent = 'Mật khẩu phải có ít nhất 6 kí tự.';
        } else {
            pass1.classList.remove('is-invalid');
            pass1.classList.add('is-valid');
            errorPass1.textContent = '';
        }
        checkInputsChangePass();
    });

    pass2.addEventListener('blur', function () {
        const password2Value = pass2.value.trim();
        const password1Value = pass1.value.trim();

        if (password2Value === '') {
            pass2.classList.remove('is-valid');
            pass2.classList.add('is-invalid');
            errorPass2.textContent = 'Vui lòng nhập lại mật khẩu.';
        } else if (password2Value !== password1Value) {
            pass2.classList.remove('is-valid');
            pass2.classList.add('is-invalid');
            errorPass2.textContent = 'Mật khẩu không khớp.';
        } else {
            pass2.classList.remove('is-invalid');
            pass2.classList.add('is-valid');
            errorPass2.textContent = '';
        }
        checkInputsChangePass();
    });
});