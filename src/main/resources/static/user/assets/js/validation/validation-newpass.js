document.addEventListener('DOMContentLoaded', function () {

    const password1Input = document.getElementById('password1');
    const password2Input = document.getElementById('password2');

    const password1Error = document.getElementById('password1Error');
    const password2Error = document.getElementById('password2Error');

    const submitButton = document.getElementById('submit-button-newpass');

    let newpassSubmitted = false;

    function checkInputsNewPass() {
        const fields = [password1Input, password2Input];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '' || fields[i].classList.contains('is-invalid')) {
                submitButton.disabled = true;
                return;
            }
        }
        submitButton.disabled = newpassSubmitted;
    }

    checkInputsNewPass();

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

    submitButton.addEventListener('click', function () {
        const form = document.getElementById('form-newpass');
        form.submit();
    });

    submitButton.addEventListener('click', function (event) {
        if (newpassSubmitted) {
            event.preventDefault(); // Prevent form submission if already submitted
        } else {
            const form = document.getElementById('form-newpass');
            form.submit();
            newpassSubmitted = true;
            checkInputsNewPass();
        }
    });
});
