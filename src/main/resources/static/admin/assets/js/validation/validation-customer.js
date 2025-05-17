document.addEventListener('DOMContentLoaded', function () {
    const customerId = document.getElementById('customerId-edit-customer');
    const birthEditCustomer = document.getElementById('birth-edit-customer');
    const city = document.getElementById('city');
    const district = document.getElementById('district');
    const ward = document.getElementById('ward');
    const addressEditCustomer = document.getElementById('address-edit-customer');

    const errorCustomerId = document.getElementById('invalid-customerId');
    const errorBirthEditCustomer = document.getElementById('invalid-birth-edit-customer');
    const errorCity = document.getElementById('invalid-city');
    const errorDistrict = document.getElementById('invalid-district');
    const errorWard = document.getElementById('invalid-ward');
    const errorAddressEditCustomer = document.getElementById('invalid-address-edit-customer');

    const submittedButton = document.getElementById('submitted-button');

    let customerSubmitted = false;

    function checkInputsCustomer() {
        const fields = [customerId, birthEditCustomer, city, district, ward, addressEditCustomer];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '') {
                submittedButton.disabled = true;
                return;
            }
        }
        submittedButton.disabled = customerSubmitted;
    }

    checkInputsCustomer();

    customerId.addEventListener('blur', function () {
        const value = customerId.value.trim();
        if (value === '') {
            customerId.classList.remove('is-valid');
            customerId.classList.add('is-invalid');
            errorCustomerId.textContent = 'Vui lòng nhập ID khách hàng';
        } else {
            customerId.classList.remove('is-invalid');
            customerId.classList.add('is-valid');
            errorCustomerId.textContent = '';
        }
        checkInputsCustomer();
    });

    birthEditCustomer.addEventListener('blur', function () {
        const value = birthEditCustomer.value.trim();
        const regex = /^\d{4}-\d{2}-\d{2}$/; // Assumes YYYY-MM-DD format

        if (value === '') {
            birthEditCustomer.classList.remove('is-valid');
            birthEditCustomer.classList.add('is-invalid');
            errorBirthEditCustomer.textContent = 'Vui lòng nhập ngày sinh';
        } else if (!regex.test(value)) {
            birthEditCustomer.classList.remove('is-valid');
            birthEditCustomer.classList.add('is-invalid');
            errorBirthEditCustomer.textContent = 'Ngày sinh không hợp lệ. Ví dụ: YYYY-MM-DD';
        } else {
            birthEditCustomer.classList.remove('is-invalid');
            birthEditCustomer.classList.add('is-valid');
            errorBirthEditCustomer.textContent = '';
        }
        checkInputsCustomer();
    });

    city.addEventListener('blur', function () {
        const value = city.value.trim();

        if (value === '') {
            city.classList.remove('is-valid');
            city.classList.add('is-invalid');
            errorCity.textContent = 'Vui lòng chọn tỉnh';
        } else {
            city.classList.remove('is-invalid');
            city.classList.add('is-valid');
            errorCity.textContent = '';
        }
        checkInputsCustomer();
    });

    district.addEventListener('blur', function () {
        const value = district.value.trim();

        if (value === '') {
            district.classList.remove('is-valid');
            district.classList.add('is-invalid');
            errorDistrict.textContent = 'Vui lòng chọn huyện';
        } else {
            district.classList.remove('is-invalid');
            district.classList.add('is-valid');
            errorDistrict.textContent = '';
        }
        checkInputsCustomer();
    });

    ward.addEventListener('blur', function () {
        const value = ward.value.trim();

        if (value === '') {
            ward.classList.remove('is-valid');
            ward.classList.add('is-invalid');
            errorWard.textContent = 'Vui lòng chọn ấp';
        } else {
            ward.classList.remove('is-invalid');
            ward.classList.add('is-valid');
            errorWard.textContent = '';
        }
        checkInputsCustomer();
    });

    addressEditCustomer.addEventListener('blur', function () {
        const value = addressEditCustomer.value.trim();

        if (value === '') {
            addressEditCustomer.classList.remove('is-valid');
            addressEditCustomer.classList.add('is-invalid');
            errorAddressEditCustomer.textContent = 'Vui lòng nhập địa chỉ';
        } else {
            addressEditCustomer.classList.remove('is-invalid');
            addressEditCustomer.classList.add('is-valid');
            errorAddressEditCustomer.textContent = '';
        }
        checkInputsCustomer();
    });

    // Add similar event listeners for other fields

    // Xử lý sự kiện click nút gửi (kiểm tra đã gửi hay chưa)
    submittedButton.addEventListener('click', function (event) {
        if (customerSubmitted) {
            event.preventDefault(); // Ngăn form gửi đi nếu đã gửi rồi
        } else {
            const form = document.getElementById('form-customer');
            form.submit();
            customerSubmitted = true;
            checkInputsCustomer();
        }
    });
});
