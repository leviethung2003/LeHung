document.addEventListener('DOMContentLoaded', function () {
    const brandNameInput = document.getElementById('brandName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const countryOfOriginInput = document.getElementById('countryOfOrigin');
    const websiteUrlInput = document.getElementById('websiteUrl');
    const brandDescriptionInput = document.getElementById('brandDescription');

    const brandNameError = document.getElementById('brandNameError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const countryOfOriginError = document.getElementById('countryOfOriginError');
    const websiteUrlError = document.getElementById('websiteUrlError');
    const brandDescriptionError = document.getElementById('brandDescriptionError');

    const submitButton = document.getElementById('submit-button-brand');

    let brandSubmitted = false;

    function checkInputsBrand() {
        const fields = [brandNameInput, phoneNumberInput, countryOfOriginInput, websiteUrlInput, brandDescriptionInput];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '' || fields[i].classList.contains('is-invalid')) {
                submitButton.disabled = true;
                return;
            }
        }
        submitButton.disabled = brandSubmitted;
    }

    checkInputsBrand();

    brandNameInput.addEventListener('blur', function () {
        const brandNameValue = brandNameInput.value.trim();
        //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (brandNameValue === '') {
            brandNameInput.classList.remove('is-valid');
            brandNameInput.classList.add('is-invalid');
            brandNameError.textContent = 'Vui lòng nhập tên thương hiệu.';
        } else {
            brandNameInput.classList.remove('is-invalid');
            brandNameInput.classList.add('is-valid');
            brandNameError.textContent = '';
        }
        checkInputsBrand();
    });

    phoneNumberInput.addEventListener('blur', function () {
        const phoneValue = phoneNumberInput.value.trim();
        const phoneRegex = /^[0-9]{10}$/;

        if (phoneValue === '') {
            phoneNumberInput.classList.remove('is-valid');
            phoneNumberInput.classList.add('is-invalid');
            phoneNumberError.textContent = 'Vui lòng nhập số điện thoại.';
        } else if (!phoneRegex.test(phoneValue)) {
            phoneNumberInput.classList.remove('is-valid');
            phoneNumberInput.classList.add('is-invalid');
            phoneNumberError.textContent = 'Số điện thoại không hợp lệ.';
        } else {
            phoneNumberInput.classList.remove('is-invalid');
            phoneNumberInput.classList.add('is-valid');
            phoneNumberError.textContent = '';
        }
        checkInputsBrand();
    });

    countryOfOriginInput.addEventListener('blur', function () {
        const countryOfOriginValue = countryOfOriginInput.value.trim();
        const countryOfOriginRegex = /^[\p{L}'][\p{L}'\s-]{0,}$/u;

        if (countryOfOriginValue === '') {
            countryOfOriginInput.classList.remove('is-valid');
            countryOfOriginInput.classList.add('is-invalid');
            countryOfOriginError.textContent = 'Vui lòng nhập địa chỉ thương hiệu.';
        } else {
            countryOfOriginInput.classList.remove('is-invalid');
            countryOfOriginInput.classList.add('is-valid');
            countryOfOriginError.textContent = '';
        }
        checkInputsBrand();
    });

    websiteUrlInput.addEventListener('blur', function () {
        const websiteUrlValue = websiteUrlInput.value.trim();

        if (websiteUrlValue === '') {
            websiteUrlInput.classList.remove('is-valid');
            websiteUrlInput.classList.add('is-invalid');
            websiteUrlError.textContent = 'Vui lòng nhập trang web thương hiệu.';
        } else {
            websiteUrlInput.classList.remove('is-invalid');
            websiteUrlInput.classList.add('is-valid');
            websiteUrlError.textContent = '';
        }
        checkInputsBrand();
    });

    brandDescriptionInput.addEventListener('blur', function () {
        const brandDescriptionValue = brandDescriptionInput.value.trim();

        if (brandDescriptionValue === '') {
            brandDescriptionInput.classList.remove('is-valid');
            brandDescriptionInput.classList.add('is-invalid');
            brandDescriptionError.textContent = 'Vui lòng nhập mô tả thương hiệu.';
        } else {
            brandDescriptionInput.classList.remove('is-invalid');
            brandDescriptionInput.classList.add('is-valid');
            brandDescriptionError.textContent = '';
        }
        checkInputsBrand();
    });

    brandNameInput.addEventListener('input', function () {
        const brandNameValue = brandNameInput.value.trim();
        //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (brandNameValue === '') {
            brandNameInput.classList.remove('is-valid');
            brandNameInput.classList.add('is-invalid');
            brandNameError.textContent = 'Vui lòng nhập tên thương hiệu.';
        } else {
            brandNameInput.classList.remove('is-invalid');
            brandNameInput.classList.add('is-valid');
            brandNameError.textContent = '';
        }
        checkInputsBrand();
    });

    phoneNumberInput.addEventListener('input', function () {
        const phoneValue = phoneNumberInput.value.trim();
        const phoneRegex = /^[0-9]{10}$/;

        if (phoneValue === '') {
            phoneNumberInput.classList.remove('is-valid');
            phoneNumberInput.classList.add('is-invalid');
            phoneNumberError.textContent = 'Vui lòng nhập số điện thoại.';
        } else if (!phoneRegex.test(phoneValue)) {
            phoneNumberInput.classList.remove('is-valid');
            phoneNumberInput.classList.add('is-invalid');
            phoneNumberError.textContent = 'Số điện thoại không hợp lệ.';
        } else {
            phoneNumberInput.classList.remove('is-invalid');
            phoneNumberInput.classList.add('is-valid');
            phoneNumberError.textContent = '';
        }
        checkInputsBrand();
    });

    countryOfOriginInput.addEventListener('input', function () {
        const countryOfOriginValue = countryOfOriginInput.value.trim();
        const countryOfOriginRegex = /^[\p{L}'][\p{L}'\s-]{0,}$/u;

        if (countryOfOriginValue === '') {
            countryOfOriginInput.classList.remove('is-valid');
            countryOfOriginInput.classList.add('is-invalid');
            countryOfOriginError.textContent = 'Vui lòng nhập địa chỉ thương hiệu.';
        } else {
            countryOfOriginInput.classList.remove('is-invalid');
            countryOfOriginInput.classList.add('is-valid');
            countryOfOriginError.textContent = '';
        }
        checkInputsBrand();
    });

    websiteUrlInput.addEventListener('input', function () {
        const websiteUrlValue = websiteUrlInput.value.trim();

        if (websiteUrlValue === '') {
            websiteUrlInput.classList.remove('is-valid');
            websiteUrlInput.classList.add('is-invalid');
            websiteUrlError.textContent = 'Vui lòng nhập trang web thương hiệu.';
        } else {
            websiteUrlInput.classList.remove('is-invalid');
            websiteUrlInput.classList.add('is-valid');
            websiteUrlError.textContent = '';
        }
        checkInputsBrand();
    });

    brandDescriptionInput.addEventListener('input', function () {
        const brandDescriptionValue = brandDescriptionInput.value.trim();

        if (brandDescriptionValue === '') {
            brandDescriptionInput.classList.remove('is-valid');
            brandDescriptionInput.classList.add('is-invalid');
            brandDescriptionError.textContent = 'Vui lòng nhập mô tả thương hiệu.';
        } else {
            brandDescriptionInput.classList.remove('is-invalid');
            brandDescriptionInput.classList.add('is-valid');
            brandDescriptionError.textContent = '';
        }
        checkInputsBrand();
    });
});
