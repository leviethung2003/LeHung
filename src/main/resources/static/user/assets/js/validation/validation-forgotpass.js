document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');

    const emailError = document.getElementById('emailError');

    const submitButton = document.getElementById('submit-button-forgot');

    let forgotSubmitted = false;

    function checkInputsForgot() {
        const fields = [emailInput];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '' || fields[i].classList.contains('is-invalid')) {
                submitButton.disabled = true;
                return;
            }
        }
        submitButton.disabled = forgotSubmitted;
    }

    checkInputsForgot();

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
        checkInputsForgot();
    });


    submitButton.addEventListener('click', function () {
        const form = document.getElementById('form-forgot');
        form.submit();
    });

    submitButton.addEventListener('click', function (event) {
        if (forgotSubmitted) {
            event.preventDefault(); // Prevent form submission if already submitted
        } else {
            const form = document.getElementById('form-forgot');
            form.submit();
            forgotSubmitted = true;
            checkInputsForgot();
        }
    });
});
