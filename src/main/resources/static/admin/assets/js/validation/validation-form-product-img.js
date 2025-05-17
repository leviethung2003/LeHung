document.addEventListener('DOMContentLoaded', function () {
    const productId = document.getElementById('productIdValue');
    const productName = document.getElementById('productName');
    const powers = document.getElementById('powers');
    const quantity = document.getElementById('quantity');
    const price = document.getElementById('price');
    const warranty = document.getElementById('warranty');
    const brandId = document.getElementById('productBrandId');
    const productTypeId = document.getElementById('productTypeId');
    const templateDescription = document.getElementById('text-input');

    const invalidProductName = document.getElementById('invalid-product-name');
    const invalidPower = document.getElementById('invalid-power');
    const invalidAmount = document.getElementById('invalid-amount');
    const invalidPrice = document.getElementById('invalid-price');
    const invalidWarranty = document.getElementById('invalid-warranty');
    const invalidBrandId = document.getElementById('invalid-brandId');
    const invalidProductTypeId = document.getElementById('invalid-productTypeId');
    const invalidTemplateDescription = document.getElementById('invalid-templateDescription');

    const invalidFile = document.getElementById('invalid-file');

    const submittedButton = document.getElementById('submitted-button');

    const loginSubmitted = false;

    function checkInputsLogin() {
        const fields = [productId, productName, powers, quantity, price, warranty, brandId, productTypeId];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '' || fields[i].classList.contains('is-invalid')) {
                submittedButton.disabled = true;
                return;
            }
            if (templateDescription.textContent.trim() === '') {
                submittedButton.disabled = true;
                return;
            }
        }
        submittedButton.disabled = loginSubmitted;
    }

    checkInputsLogin();

    let productSubmitted = false;

    function checkInputsProduct() {
        const fields = [productId, productName, powers, quantity, price, warranty, brandId, productTypeId];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '') {
                submittedButton.disabled = true;
                return;
            }
            if (templateDescription.textContent.trim() === '') {
                submittedButton.disabled = true;
                return;
            }
        }
        submittedButton.disabled = productSubmitted;
    }


    productId.addEventListener('input', function () {
        const value = productId.value.trim();
        if (value === '') {
            productId.classList.remove('is-valid');
            productId.classList.add('is-invalid');
        } else {
            productId.classList.remove('is-invalid');
            productId.classList.add('is-valid');
        }
        checkInputsProduct();
    });

    productName.addEventListener('input', function () {
        const value = productName.value.trim();
        if (value === '') {
            productName.classList.remove('is-valid');
            productName.classList.add('is-invalid');
            invalidProductName.textContent = 'Vui lòng nhập tên sản phẩm';
        } else {
            productName.classList.remove('is-invalid');
            productName.classList.add('is-valid');
            invalidProductName.textContent = '';
        }
        checkInputsProduct();
    });

    powers.addEventListener('input', function () {
        const value = powers.value.trim();
        const regex = /^\d+(\.\d+)?(W|KW|KWH)$/i;

        if (value === '') {
            powers.classList.remove('is-valid');
            powers.classList.add('is-invalid');
            invalidPower.textContent = 'Vui lòng nhập công suất';
        } else if (!regex.test(value)) {
            powers.classList.remove('is-valid');
            powers.classList.add('is-invalid');
            invalidPower.textContent = 'Công suất không hợp lệ. Ví dụ: 100W hoặc 2.5KW.';
        } else {
            powers.classList.remove('is-invalid');
            powers.classList.add('is-valid');
            invalidPower.textContent = '';
        }
        checkInputsProduct();
    });

    quantity.addEventListener('input', function () {
        const value = quantity.value.trim();
        if (value === '' || isNaN(value)) {
            quantity.classList.remove('is-valid');
            quantity.classList.add('is-invalid');
            invalidAmount.textContent = 'Vui lòng nhập số lượng';
        } else if (isNaN(value) || value.includes('.') || value === '' || quantity.value.trim() < 0) {
            quantity.classList.remove('is-valid');
            quantity.classList.add('is-invalid');
            invalidAmount.textContent = 'Số lượng không hợp lệ. Phải là số nguyên dương.';
        } else {
            quantity.classList.remove('is-invalid');
            quantity.classList.add('is-valid');
            invalidAmount.textContent = '';
        }
        checkInputsProduct();
    });

    price.addEventListener('input', function () {
        if (price.value <= 0) {
            invalidPrice.textContent = 'Giá sản phẩm phải lớn hơn 0';
            price.classList.remove('is-valid');
            price.classList.add('is-invalid');

        } else {
            invalidPrice.textContent = '';
            price.classList.remove('is-invalid');
            price.classList.add('is-valid');

        }
        checkInputsProduct();
    });

    warranty.addEventListener('input', function () {
        const value = warranty.value.trim();
        const regex = /^\d+(\.\d+)? (Tháng|Năm)$/i;

        if (value === '') {
            warranty.classList.remove('is-valid');
            warranty.classList.add('is-invalid');
            invalidWarranty.textContent = 'Vui lòng nhập thời gian bảo hành';

        } else if (!regex.test(value)) {
            warranty.classList.remove('is-valid');
            warranty.classList.add('is-invalid');
            invalidWarranty.textContent = 'Thời gian bảo hành không hợp lệ. Ví dụ: 12 Tháng hoặc 1 Năm.';

        } else {
            warranty.classList.remove('is-invalid');
            warranty.classList.add('is-valid');
            invalidWarranty.textContent = '';
        }
        checkInputsProduct();
    });

    brandId.addEventListener('input', function () {
        if (brandId.value.trim() === '') {
            brandId.classList.remove('is-valid');
            brandId.classList.add('is-invalid');
            invalidBrandId.textContent = 'Không bỏ trống thương hiệu';

        } else if (brandId.value.trim() === '--------- Thêm thương hiệu ----------') {
            brandId.classList.remove('is-valid');
            brandId.classList.add('is-invalid');
            invalidBrandId.textContent = 'Không bỏ trống thương hiệu';

        } else {
            brandId.classList.remove('is-invalid');
            brandId.classList.add('is-valid');
            invalidBrandId.textContent = '';
        }
        checkInputsProduct();
    })

    productTypeId.addEventListener('input', function () {
        if (productTypeId.value.trim() === '') {
            productTypeId.classList.remove('is-valid');
            productTypeId.classList.add('is-invalid');
            invalidProductTypeId.textContent = 'Không bỏ trống loại sản phẩm';

        } else if (productTypeId.value.trim() === '--------- Thêm loại sản phẩm ----------') {
            productTypeId.classList.remove('is-valid');
            productTypeId.classList.add('is-invalid');
            invalidProductTypeId.textContent = 'Không bỏ trống loại sản phẩm';

        } else {
            productTypeId.classList.remove('is-invalid');
            productTypeId.classList.add('is-valid');
            invalidProductTypeId.textContent = '';
        }
        checkInputsProduct();
    })

    templateDescription.addEventListener('input', function () {
        if (templateDescription.textContent.trim() === '') {
            templateDescription.classList.remove('is-valid');
            templateDescription.classList.add('is-invalid');
            invalidTemplateDescription.textContent = 'Vui lòng nhập mô tả chi tiết sản phẩm';
        } else {
            templateDescription.classList.remove('is-invalid');
            templateDescription.classList.add('is-valid');
            invalidTemplateDescription.textContent = '';
        }
        checkInputsProduct();
    });

    productId.addEventListener('blur', function () {
        const value = productId.value.trim();
        if (value === '') {
            productId.classList.remove('is-valid');
            productId.classList.add('is-invalid');

        } else {
            productId.classList.remove('is-invalid');
            productId.classList.add('is-valid');
        }
        checkInputsProduct();
    });

    productName.addEventListener('blur', function () {
        const value = productName.value.trim();
        if (value === '') {
            productName.classList.remove('is-valid');
            productName.classList.add('is-invalid');
            invalidProductName.textContent = 'Vui lòng nhập tên sản phẩm';

        } else {
            productName.classList.remove('is-invalid');
            productName.classList.add('is-valid');
            invalidProductName.textContent = '';
        }
        checkInputsProduct();
    });

    powers.addEventListener('blur', function () {
        const value = powers.value.trim();
        const regex = /^\d+(\.\d+)?(W|KW|KWH)$/i;

        if (value === '') {
            powers.classList.remove('is-valid');
            powers.classList.add('is-invalid');
            invalidPower.textContent = 'Vui lòng nhập công suất';

        } else if (!regex.test(value)) {
            powers.classList.remove('is-valid');
            powers.classList.add('is-invalid');
            invalidPower.textContent = 'Công suất không hợp lệ. Ví dụ: 100W hoặc 2.5KW.';

        } else {
            powers.classList.remove('is-invalid');
            powers.classList.add('is-valid');
            invalidPower.textContent = '';
        }
        checkInputsProduct();
    });

    quantity.addEventListener('blur', function () {
        const value = quantity.value.trim();
        if (value === '' || isNaN(value)) {
            quantity.classList.remove('is-valid');
            quantity.classList.add('is-invalid');
            invalidAmount.textContent = 'Vui lòng nhập số lượng';

        } else if (isNaN(value) || value.includes('.') || value === '' || quantity.value.trim() < 0) {
            quantity.classList.remove('is-valid');
            quantity.classList.add('is-invalid');
            invalidAmount.textContent = 'Số lượng không hợp lệ. Phải là số nguyên dương.';

        } else {
            quantity.classList.remove('is-invalid');
            quantity.classList.add('is-valid');
            invalidAmount.textContent = '';
        }
        checkInputsProduct();
    });

    price.addEventListener('blur', function () {
        if (price.value <= 0) {
            invalidPrice.textContent = 'Giá sản phẩm phải lớn hơn 0';
            price.classList.remove('is-valid');
            price.classList.add('is-invalid');

        } else {
            invalidPrice.textContent = '';
            price.classList.remove('is-invalid');
            price.classList.add('is-valid');
        }
        checkInputsProduct();
    });

    warranty.addEventListener('blur', function () {
        const value = warranty.value.trim();
        const regex = /^\d+(\.\d+)? (Tháng|Năm)$/i;

        if (value === '') {
            warranty.classList.remove('is-valid');
            warranty.classList.add('is-invalid');
            invalidWarranty.textContent = 'Vui lòng nhập thời gian bảo hành';

        } else if (!regex.test(value)) {
            warranty.classList.remove('is-valid');
            warranty.classList.add('is-invalid');
            invalidWarranty.textContent = 'Thời gian bảo hành không hợp lệ. Ví dụ: 12 Tháng hoặc 1 Năm.';

        } else {
            warranty.classList.remove('is-invalid');
            warranty.classList.add('is-valid');
            invalidWarranty.textContent = '';
        }
        checkInputsProduct();
    });

    brandId.addEventListener('blur', function () {
        if (brandId.value.trim() === '') {
            brandId.classList.remove('is-valid');
            brandId.classList.add('is-invalid');
            invalidBrandId.textContent = 'Không bỏ trống thương hiệu';

        } else if (brandId.value.trim() === '--------- Thêm thương hiệu ----------') {
            brandId.classList.remove('is-valid');
            brandId.classList.add('is-invalid');
            invalidBrandId.textContent = 'Không bỏ trống thương hiệu';

        } else {
            brandId.classList.remove('is-invalid');
            brandId.classList.add('is-valid');
            invalidBrandId.textContent = '';
        }
        checkInputsProduct();
    })

    productTypeId.addEventListener('blur', function () {
        if (productTypeId.value.trim() === '') {
            productTypeId.classList.remove('is-valid');
            productTypeId.classList.add('is-invalid');
            invalidProductTypeId.textContent = 'Không bỏ trống loại sản phẩm';

        } else if (productTypeId.value.trim() === '--------- Thêm loại sản phẩm ----------') {
            productTypeId.classList.remove('is-valid');
            productTypeId.classList.add('is-invalid');
            invalidProductTypeId.textContent = 'Không bỏ trống loại sản phẩm';

        } else {
            productTypeId.classList.remove('is-invalid');
            productTypeId.classList.add('is-valid');
            invalidProductTypeId.textContent = '';
        }
        checkInputsProduct();
    })

    templateDescription.addEventListener('blur', function () {
        if (templateDescription.textContent.trim() === '') {
            templateDescription.classList.remove('is-valid');
            templateDescription.classList.add('is-invalid');
            invalidTemplateDescription.textContent = 'Vui lòng nhập mô tả chi tiết sản phẩm';

        } else {
            templateDescription.classList.remove('is-invalid');
            templateDescription.classList.add('is-valid');
            invalidTemplateDescription.textContent = '';
        }
        checkInputsProduct();
    });

    submittedButton.addEventListener('click', function (event) {
        if (productSubmitted) {
            event.preventDefault();
        } else {
            productSubmitted = true;
            checkInputsProduct();
        }
    });
});
