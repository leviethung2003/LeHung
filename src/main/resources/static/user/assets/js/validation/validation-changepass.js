document.addEventListener('DOMContentLoaded', function () {

    const password0Input = document.getElementById('password0');
    const password1Input = document.getElementById('password1');
    const password2Input = document.getElementById('password2');

    const password0Error = document.getElementById('password0Error');
    const password1Error = document.getElementById('password1Error');
    const password2Error = document.getElementById('password2Error');

    const submitButton = document.getElementById('submit-button-changepass');

    let changepassSubmitted = false;

    function checkInputsNewPass() {
        const fields = [password1Input, password2Input, password0Input];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '' || fields[i].classList.contains('is-invalid')) {
                submitButton.disabled = true;
                return;
            }
        }
        submitButton.disabled = changepassSubmitted;
    }

    checkInputsNewPass();

    password0Input.addEventListener('blur', function () {
        const password0Value = password0Input.value.trim();

        if (password0Value === '') {
            password0Input.classList.remove('is-valid');
            password0Input.classList.add('is-invalid');
            password0Error.textContent = 'Vui lòng nhập mật khẩu cũ.';
        } else {
            password0Input.classList.remove('is-invalid');
            password0Input.classList.add('is-valid');
            password0Error.textContent = '';
        }
        checkInputsNewPass();
    });

    password1Input.addEventListener('blur', function () {
        const password1Value = password1Input.value.trim();

        if (password1Value === '' || password1Value.length < 6) {
            password1Input.classList.remove('is-valid');
            password1Input.classList.add('is-invalid');
            password1Error.textContent = 'Mật khẩu phải có ít nhất 6 kí tự.';
        } else {
            password1Input.classList.remove('is-invalid');
            password1Input.classList.add('is-valid');
            password1Error.textContent = '';
        }
        checkInputsNewPass();
    });

    password2Input.addEventListener('blur', function () {
        const password2Value = password2Input.value.trim();
        const password1Value = password1Input.value.trim();

        if (password2Value === '') {
            password2Input.classList.remove('is-valid');
            password2Input.classList.add('is-invalid');
            password2Error.textContent = 'Vui lòng nhập lại mật khẩu.';
        } else if (password2Value !== password1Value) {
            password2Input.classList.remove('is-valid');
            password2Input.classList.add('is-invalid');
            password2Error.textContent = 'Mật khẩu không khớp.';
        } else {
            password2Input.classList.remove('is-invalid');
            password2Input.classList.add('is-valid');
            password2Error.textContent = '';
        }
        checkInputsNewPass();
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (changepassSubmitted) {
            return;
        }

        Swal.fire({
            title: 'Cảnh báo ?',
            text: "Bạn có chắc chắn muốn thay đổi mật khẩu không ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý !'
        }).then((result) => {
            if (result.isConfirmed) {
                const form = document.getElementById('form-changepass');
                form.submit();
                changepassSubmitted = true;
                checkInputsNewPass();
            }
        });
    });
});
