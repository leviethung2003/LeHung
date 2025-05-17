document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById("email-edit-account");
    const fullNameInput = document.getElementById("fullName-edit-account");
    const phoneInput = document.getElementById("phone-edit-account");
    const passwordInput = document.getElementById("password-edit-account");
    const cityInput = document.getElementById('city');
    const districtInput = document.getElementById('province');
    const wardInput = document.getElementById('ward');
    const addressInput = document.getElementById('address-edit-account');

    const errorEmail = document.getElementById('invalid-email');
    const errorFull_name = document.getElementById('invalid-full-name');
    const errorPhone = document.getElementById('invalid-phone');
    const errorPassword = document.getElementById('invalid-password');
    const errorBirth = document.getElementById('invalid-birth-account');
    const errorCity = document.getElementById('invalid-city');
    const errorDistrict = document.getElementById('invalid-province');
    const errorWard = document.getElementById('invalid-ward');
    const errorAddress = document.getElementById('invalid-address');

    const submittedButton = document.getElementById('submitted-button');

    let accountSubmitted = false;
    const currentURL = window.location.href;

    if (currentURL.indexOf("tai-khoan/sua-tai-khoan/") !== -1) {
        function checkInputsAccountEdit() {
            const fields = [emailInput, fullNameInput, phoneInput, cityInput, districtInput, wardInput, addressInput];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].value.trim() === '') {
                    submittedButton.disabled = true;
                    return;
                }
            }
            submittedButton.disabled = accountSubmitted;
        }

        checkInputsAccountEdit();

        emailInput.addEventListener('blur', function () {
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailValue === '') {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                errorEmail.textContent = 'Vui lòng nhập địa chỉ email.';
            } else if (!emailRegex.test(emailValue)) {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                errorEmail.textContent = 'Địa chỉ email không hợp lệ.';
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                errorEmail.textContent = '';
            }
            checkInputsAccountEdit();
        });

        fullNameInput.addEventListener('blur', function () {
            const fullNameValue = fullNameInput.value.trim();
            const fullNameRegex = /^[\p{L}'][\p{L}'\s-]{0,}$/u;

            if (fullNameValue === '') {
                fullNameInput.classList.remove('is-valid');
                fullNameInput.classList.add('is-invalid');
                errorFull_name.textContent = 'Vui lòng nhập họ và tên.';
            } else if (!fullNameRegex.test(fullNameValue)) {
                fullNameInput.classList.remove('is-valid');
                fullNameInput.classList.add('is-invalid');
                errorFull_name.textContent = 'Họ và tên chỉ được nhập chữ cái.';
            } else {
                fullNameInput.classList.remove('is-invalid');
                fullNameInput.classList.add('is-valid');
                errorFull_name.textContent = '';
            }
            checkInputsAccountEdit();
        });

        phoneInput.addEventListener('blur', function () {
            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[0-9]{10}$/;

            if (phoneValue === '') {
                phoneInput.classList.remove('is-valid');
                phoneInput.classList.add('is-invalid');
                errorPhone.textContent = 'Vui lòng nhập số điện thoại.';
            } else if (!phoneRegex.test(phoneValue)) {
                phoneInput.classList.remove('is-valid');
                phoneInput.classList.add('is-invalid');
                errorPhone.textContent = 'Số điện thoại không hợp lệ.';
            } else {
                phoneInput.classList.remove('is-invalid');
                phoneInput.classList.add('is-valid');
                errorPhone.textContent = '';
            }
            checkInputsAccountEdit();
        });

        cityInput.addEventListener('blur', function () {
            const value = cityInput.value.trim();

            if (value === '') {
                cityInput.classList.remove('is-valid');
                cityInput.classList.add('is-invalid');
                errorCity.textContent = 'Vui lòng chọn tỉnh';
            } else {
                cityInput.classList.remove('is-invalid');
                cityInput.classList.add('is-valid');
                errorCity.textContent = '';
            }
            checkInputsAccountEdit();
        });

        districtInput.addEventListener('blur', function () {
            const value = districtInput.value.trim();

            if (value === '') {
                districtInput.classList.remove('is-valid');
                districtInput.classList.add('is-invalid');
                errorDistrict.textContent = 'Vui lòng chọn huyện';
            } else {
                districtInput.classList.remove('is-invalid');
                districtInput.classList.add('is-valid');
                errorDistrict.textContent = '';
            }
            checkInputsAccountEdit();
        });

        wardInput.addEventListener('blur', function () {
            const value = wardInput.value.trim();

            if (value === '') {
                wardInput.classList.remove('is-valid');
                wardInput.classList.add('is-invalid');
                errorWard.textContent = 'Vui lòng chọn ấp';
            } else {
                wardInput.classList.remove('is-invalid');
                wardInput.classList.add('is-valid');
                errorWard.textContent = '';
            }
            checkInputsAccountEdit();
        });

        addressInput.addEventListener('blur', function () {
            const value = addressInput.value.trim();

            if (value === '') {
                addressInput.classList.remove('is-valid');
                addressInput.classList.add('is-invalid');
                errorAddress.textContent = 'Vui lòng nhập địa chỉ';
            } else {
                addressInput.classList.remove('is-invalid');
                addressInput.classList.add('is-valid');
                errorAddress.textContent = '';
            }
            checkInputsAccountEdit();
        });

        // Xử lý sự kiện click nút gửi (kiểm tra đã gửi hay chưa)
        submittedButton.addEventListener('click', function (event) {
            if (accountSubmitted) {
                event.preventDefault(); // Ngăn form gửi đi nếu đã gửi rồi
            } else {
                const form = document.getElementById('form-product');
                form.submit();
                accountSubmitted = true;
                checkInputsAccountEdit();
            }
        });
    } else if (currentURL.indexOf("nhan-vien/sua-nhan-vien/") !== -1) {
        function checkInputsAccountEdit() {
            const fields = [emailInput, fullNameInput, phoneInput, cityInput, districtInput, wardInput, addressInput];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].value.trim() === '') {
                    submittedButton.disabled = true;
                    return;
                }
            }
            submittedButton.disabled = accountSubmitted;
        }

        checkInputsAccountEdit();

        emailInput.addEventListener('blur', function () {
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailValue === '') {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                errorEmail.textContent = 'Vui lòng nhập địa chỉ email.';
            } else if (!emailRegex.test(emailValue)) {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                errorEmail.textContent = 'Địa chỉ email không hợp lệ.';
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                errorEmail.textContent = '';
            }
            checkInputsAccountEdit();
        });

        fullNameInput.addEventListener('blur', function () {
            const fullNameValue = fullNameInput.value.trim();
            const fullNameRegex = /^[\p{L}'][\p{L}'\s-]{0,}$/u;

            if (fullNameValue === '') {
                fullNameInput.classList.remove('is-valid');
                fullNameInput.classList.add('is-invalid');
                errorFull_name.textContent = 'Vui lòng nhập họ và tên.';
            } else if (!fullNameRegex.test(fullNameValue)) {
                fullNameInput.classList.remove('is-valid');
                fullNameInput.classList.add('is-invalid');
                errorFull_name.textContent = 'Họ và tên chỉ được nhập chữ cái.';
            } else {
                fullNameInput.classList.remove('is-invalid');
                fullNameInput.classList.add('is-valid');
                errorFull_name.textContent = '';
            }
            checkInputsAccountEdit();
        });

        phoneInput.addEventListener('blur', function () {
            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[0-9]{10}$/;

            if (phoneValue === '') {
                phoneInput.classList.remove('is-valid');
                phoneInput.classList.add('is-invalid');
                errorPhone.textContent = 'Vui lòng nhập số điện thoại.';
            } else if (!phoneRegex.test(phoneValue)) {
                phoneInput.classList.remove('is-valid');
                phoneInput.classList.add('is-invalid');
                errorPhone.textContent = 'Số điện thoại không hợp lệ.';
            } else {
                phoneInput.classList.remove('is-invalid');
                phoneInput.classList.add('is-valid');
                errorPhone.textContent = '';
            }
            checkInputsAccountEdit();
        });

        cityInput.addEventListener('blur', function () {
            const value = cityInput.value.trim();

            if (value === '') {
                cityInput.classList.remove('is-valid');
                cityInput.classList.add('is-invalid');
                errorCity.textContent = 'Vui lòng chọn tỉnh';
            } else {
                cityInput.classList.remove('is-invalid');
                cityInput.classList.add('is-valid');
                errorCity.textContent = '';
            }
            checkInputsAccountEdit();
        });

        districtInput.addEventListener('blur', function () {
            const value = districtInput.value.trim();

            if (value === '') {
                districtInput.classList.remove('is-valid');
                districtInput.classList.add('is-invalid');
                errorDistrict.textContent = 'Vui lòng chọn huyện';
            } else {
                districtInput.classList.remove('is-invalid');
                districtInput.classList.add('is-valid');
                errorDistrict.textContent = '';
            }
            checkInputsAccountEdit();
        });

        wardInput.addEventListener('blur', function () {
            const value = wardInput.value.trim();

            if (value === '') {
                wardInput.classList.remove('is-valid');
                wardInput.classList.add('is-invalid');
                errorWard.textContent = 'Vui lòng chọn ấp';
            } else {
                wardInput.classList.remove('is-invalid');
                wardInput.classList.add('is-valid');
                errorWard.textContent = '';
            }
            checkInputsAccountEdit();
        });

        addressInput.addEventListener('blur', function () {
            const value = addressInput.value.trim();

            if (value === '') {
                addressInput.classList.remove('is-valid');
                addressInput.classList.add('is-invalid');
                errorAddress.textContent = 'Vui lòng nhập địa chỉ';
            } else {
                addressInput.classList.remove('is-invalid');
                addressInput.classList.add('is-valid');
                errorAddress.textContent = '';
            }
            checkInputsAccountEdit();
        });

        // Xử lý sự kiện click nút gửi (kiểm tra đã gửi hay chưa)
        submittedButton.addEventListener('click', function (event) {
            if (accountSubmitted) {
                event.preventDefault(); // Ngăn form gửi đi nếu đã gửi rồi
            } else {
                const form = document.getElementById('form-product');
                form.submit();
                accountSubmitted = true;
                checkInputsAccountEdit();
            }
        });
    } else {
        function checkInputsAccountAdd() {
            const fields = [emailInput, fullNameInput, phoneInput, passwordInput, cityInput, districtInput, wardInput, addressInput];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].value.trim() === '') {
                    submittedButton.disabled = true;
                    return;
                }
            }
            submittedButton.disabled = accountSubmitted;
        }

        checkInputsAccountAdd();

        emailInput.addEventListener('blur', function () {
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailValue === '') {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                errorEmail.textContent = 'Vui lòng nhập địa chỉ email.';
            } else if (!emailRegex.test(emailValue)) {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                errorEmail.textContent = 'Địa chỉ email không hợp lệ.';
            } else {
                checkDuplicateEmail(emailValue);
            }
            checkInputsAccountAdd();
        });

        fullNameInput.addEventListener('blur', function () {
            const fullNameValue = fullNameInput.value.trim();
            const fullNameRegex = /^[\p{L}'][\p{L}'\s-]{0,}$/u;

            if (fullNameValue === '') {
                fullNameInput.classList.remove('is-valid');
                fullNameInput.classList.add('is-invalid');
                errorFull_name.textContent = 'Vui lòng nhập họ và tên.';
            } else if (!fullNameRegex.test(fullNameValue)) {
                fullNameInput.classList.remove('is-valid');
                fullNameInput.classList.add('is-invalid');
                errorFull_name.textContent = 'Họ và tên chỉ được nhập chữ cái.';
            } else {
                fullNameInput.classList.remove('is-invalid');
                fullNameInput.classList.add('is-valid');
                errorFull_name.textContent = '';
            }
            checkInputsAccountAdd();
        });

        phoneInput.addEventListener('blur', function () {
            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^[0-9]{10}$/;

            if (phoneValue === '') {
                phoneInput.classList.remove('is-valid');
                phoneInput.classList.add('is-invalid');
                errorPhone.textContent = 'Vui lòng nhập số điện thoại.';
            } else if (!phoneRegex.test(phoneValue)) {
                phoneInput.classList.remove('is-valid');
                phoneInput.classList.add('is-invalid');
                errorPhone.textContent = 'Số điện thoại không hợp lệ.';
            } else {
                checkDuplicatePhoneNumber(phoneValue);
            }
            checkInputsAccountAdd();
        });
        passwordInput.addEventListener('blur', function () {
            const passwordValue = passwordInput.value.trim();

            if (passwordValue === '' || passwordValue.length < 6) {
                passwordInput.classList.remove('is-valid');
                passwordInput.classList.add('is-invalid');
                errorPassword.textContent = 'Mật khẩu phải có ít nhất 6 kí tự.';
            } else {
                passwordInput.classList.remove('is-invalid');
                passwordInput.classList.add('is-valid');
                errorPassword.textContent = '';
            }
            checkInputsAccountAdd();
        });

        cityInput.addEventListener('blur', function () {
            const value = cityInput.value.trim();

            if (value === '') {
                cityInput.classList.remove('is-valid');
                cityInput.classList.add('is-invalid');
                errorCity.textContent = 'Vui lòng chọn tỉnh';
            } else {
                cityInput.classList.remove('is-invalid');
                cityInput.classList.add('is-valid');
                errorCity.textContent = '';
            }
            checkInputsAccountAdd();
        });

        districtInput.addEventListener('blur', function () {
            const value = districtInput.value.trim();

            if (value === '') {
                districtInput.classList.remove('is-valid');
                districtInput.classList.add('is-invalid');
                errorDistrict.textContent = 'Vui lòng chọn huyện';
            } else {
                districtInput.classList.remove('is-invalid');
                districtInput.classList.add('is-valid');
                errorDistrict.textContent = '';
            }
            checkInputsAccountAdd();
        });

        wardInput.addEventListener('blur', function () {
            const value = wardInput.value.trim();

            if (value === '') {
                wardInput.classList.remove('is-valid');
                wardInput.classList.add('is-invalid');
                errorWard.textContent = 'Vui lòng chọn ấp';
            } else {
                wardInput.classList.remove('is-invalid');
                wardInput.classList.add('is-valid');
                errorWard.textContent = '';
            }
            checkInputsAccountAdd();
        });

        addressInput.addEventListener('blur', function () {
            const value = addressInput.value.trim();

            if (value === '') {
                addressInput.classList.remove('is-valid');
                addressInput.classList.add('is-invalid');
                errorAddress.textContent = 'Vui lòng nhập địa chỉ';
            } else {
                addressInput.classList.remove('is-invalid');
                addressInput.classList.add('is-valid');
                errorAddress.textContent = '';
            }
            checkInputsAccountAdd();
        });

        // Xử lý sự kiện click nút gửi (kiểm tra đã gửi hay chưa)
        submittedButton.addEventListener('click', function (event) {
            if (accountSubmitted) {
                event.preventDefault(); // Ngăn form gửi đi nếu đã gửi rồi
            } else {
                const form = document.getElementById('form-product');
                form.submit();
                accountSubmitted = true;
                checkInputsAccountAdd();
            }
        });

        // Hàm kiểm tra trùng lặp Email
        function checkDuplicateEmail(email) {

            const xhr = new XMLHttpRequest();
            const url = '/api/check-duplicate-email/' + email;

            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.exists) {
                        // Email đã tồn tại
                        emailInput.classList.remove('is-valid');
                        emailInput.classList.add('is-invalid');
                        errorEmail.textContent = 'Email đã tồn tại !';
                    } else {
                        emailInput.classList.remove('is-invalid');
                        emailInput.classList.add('is-valid');
                        errorEmail.textContent = '';
                    }
                }
            };
            xhr.send();
        }

        // Hàm kiểm tra trùng lặp Số điện thoại
        function checkDuplicatePhoneNumber(phoneNumber) {
            const xhr = new XMLHttpRequest();
            const url = '/api/check-duplicate-phone/' + phoneNumber;

            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.exists) {
                        // Số điện thoại đã tồn tại
                        phoneInput.classList.remove('is-valid');
                        phoneInput.classList.add('is-invalid');
                        errorPhone.textContent = 'Số điện thoại đã tồn tại !';
                    } else {
                        phoneInput.classList.remove('is-invalid');
                        phoneInput.classList.add('is-valid');
                        errorPhone.textContent = '';
                    }
                }
            };
            xhr.send();
        }
    }
});