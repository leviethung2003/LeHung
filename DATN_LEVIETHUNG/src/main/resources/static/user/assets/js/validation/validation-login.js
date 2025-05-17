document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('passwordLogin');

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const submitButton = document.getElementById('submit-button-login');

    let loginSubmitted = false;

    function checkInputsLogin() {
        const fields = [emailInput, passwordInput];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '' || fields[i].classList.contains('is-invalid')) {
                submitButton.disabled = true;
                return;
            }
        }
        submitButton.disabled = loginSubmitted;
    }

    checkInputsLogin();

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
        checkInputsLogin();
    });

    passwordInput.addEventListener('blur', function () {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue === '' || passwordValue.length < 6) {
            passwordInput.classList.remove('is-valid');
            passwordInput.classList.add('is-invalid');
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 kí tự.';
        } else {
            passwordInput.classList.remove('is-invalid');
            passwordInput.classList.add('is-valid');
            passwordError.textContent = '';
        }
        checkInputsLogin();
    });

    submitButton.addEventListener('click', function (event) {
        const form = document.getElementById('form-login');
        form.submit();
        loginSubmitted = true;
        checkInputsLogin();
    });
});
