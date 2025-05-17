document.addEventListener('DOMContentLoaded', function () {
    // ... (code for existing fields)

    const nameProductType = document.getElementById('name-edit-product-type');
    const errorNameProductType = document.getElementById('invalid-name-product-type');

    const submittedButton = document.getElementById('submitted-button');

    let productTypeSubmitted = false;

    function checkInputsProductType() {
        const fields = [nameProductType];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '') {
                submittedButton.disabled = true;
                return;
            }
        }
        submittedButton.disabled = productTypeSubmitted;
    }

    checkInputsProductType();

    nameProductType.addEventListener('blur', function () {
        const value = nameProductType.value.trim();

        if (value === '') {
            nameProductType.classList.remove('is-valid');
            nameProductType.classList.add('is-invalid');
            errorNameProductType.textContent = 'Vui lòng nhập tên loại sản phẩm';
        } else {
            nameProductType.classList.remove('is-invalid');
            nameProductType.classList.add('is-valid');
            errorNameProductType.textContent = '';
        }
        checkInputsProductType();
    });

    submittedButton.addEventListener('click', function (event) {
        if (productTypeSubmitted) {
            event.preventDefault();
        } else {
            const form = document.getElementById('form-product-type');
            form.submit();
            productTypeSubmitted = true;
            checkInputsProductType();
        }
    });
});