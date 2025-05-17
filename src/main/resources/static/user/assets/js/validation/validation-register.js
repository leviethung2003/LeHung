document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const fullnameInput = document.getElementById('fullname');
    const phoneInput = document.getElementById('phone');
    const password1Input = document.getElementById('passwordSignup');
    const password2Input = document.getElementById('passwordConfirm');

    const emailError = document.getElementById('emailError');
    const fullnameError = document.getElementById('fullnameError');
    const phoneError = document.getElementById('phoneError');
    const password1Error = document.getElementById('password1Error');
    const password2Error = document.getElementById('password2Error');

    const submitButton = document.getElementById('submit-button-register');

    let registerSubmitted = false;

    function checkInputsRegister() {
        const fields = [emailInput, fullnameInput, phoneInput, password1Input, password2Input];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '' || fields[i].classList.contains('is-invalid')) {
                submitButton.disabled = true;
                return;
            }
        }
        submitButton.disabled = registerSubmitted;
    }

    checkInputsRegister();

    emailInput.addEventListener('blur', function () {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            emailError.textContent = 'Vui lòng nhập địa chỉ email.';
        } else if (!emailRegex.test(emailValue)) {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            emailError.textContent = 'Địa chỉ email không hợp lệ.';
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
            emailError.textContent = '';
        }
        checkInputsRegister();
    });

    fullnameInput.addEventListener('blur', function () {
        const fullnameValue = fullnameInput.value.trim();
        const fullnameRegex = /^[\p{L}'][\p{L}'\s-]{0,}$/u;

        if (fullnameValue === '') {
            fullnameInput.classList.remove('is-valid');
            fullnameInput.classList.add('is-invalid');
            fullnameError.textContent = 'Vui lòng nhập họ và tên.';
        } else if (!fullnameRegex.test(fullnameValue)) {
            fullnameInput.classList.remove('is-valid');
            fullnameInput.classList.add('is-invalid');
            fullnameError.textContent = 'Họ và tên chỉ được nhập chữ cái.';
        } else {
            fullnameInput.classList.remove('is-invalid');
            fullnameInput.classList.add('is-valid');
            fullnameError.textContent = '';
        }
        checkInputsRegister();
    });

    phoneInput.addEventListener('blur', function () {
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^(0[0-9]{9}|84[0-9]{9})$/;

        if (phoneValue === '') {
            phoneInput.classList.remove('is-valid');
            phoneInput.classList.add('is-invalid');
            phoneError.textContent = 'Vui lòng nhập số điện thoại.';
        } else if (!phoneRegex.test(phoneValue)) {
            phoneInput.classList.remove('is-valid');
            phoneInput.classList.add('is-invalid');
            phoneError.textContent = 'Số điện thoại không hợp lệ.';
        } else {
            phoneInput.classList.remove('is-invalid');
            phoneInput.classList.add('is-valid');
            phoneError.textContent = '';
        }
        checkInputsRegister();
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
        checkInputsRegister();
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
        checkInputsRegister();
    });

    $(document).ready(function () {
        $('#email').on('input', function () {
            var emailValue = $(this).val();

            if (emailValue !== '') {
                $.ajax({
                    url: '/check-email',
                    type: 'POST',
                    data: {
                        email: emailValue
                    },
                    success: function (data) {
                        emailInput.addEventListener('blur', function () {
                            if (data.email) {
                                emailInput.classList.remove('is-valid');
                                emailInput.classList.add('is-invalid');
                                emailError.textContent = 'Email đã tồn tại ở một tài khoản khác !';
                            } else {
                                emailInput.classList.remove('is-invalid');
                                emailInput.classList.add('is-valid');
                                emailError.textContent = '';
                            }
                        });
                    }
                });
            }
        });

        $('#phone').on('input', function () {
            var phoneValue = $(this).val();

            if (phoneValue !== '') {
                $.ajax({
                    url: '/check-phone',
                    type: 'POST',
                    data: {
                        phone: phoneValue
                    },
                    success: function (data) {
                        phoneInput.addEventListener('blur', function () {
                            if (data.phone) {
                                phoneInput.classList.remove('is-valid');
                                phoneInput.classList.add('is-invalid');
                                phoneError.textContent = 'Số điện thoại đã tồn tại ở một tài khoản khác !';
                            } else {
                                phoneInput.classList.remove('is-invalid');
                                phoneInput.classList.add('is-valid');
                                phoneError.textContent = '';
                            }
                        });
                    }
                });
            }
        });
    });

    submitButton.addEventListener('click', function (event) {
        document.getElementById('form-register').submit();
        registerSubmitted = true;
        checkInputsRegister();
    });
});
