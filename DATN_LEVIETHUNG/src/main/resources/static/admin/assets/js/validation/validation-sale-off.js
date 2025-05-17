const productId = document.getElementById('productId');
const saleValue = document.getElementById('saleValue');
const startUse = document.getElementById('startUse');
const endUse = document.getElementById('endUse');

const invalidProductId = document.getElementById('invalid-productId');
const invalidSaveValue = document.getElementById('invalid-saveValue');
const invalidStartUse = document.getElementById('invalid-startUse');
const invalidEndUse = document.getElementById('invalid-endUse');

const submittedButton = document.getElementById('submitted-button');

function checkAllData() {
    // Dọn dẹp form
    cleandFiels()

    // Kiểm tra giá trị giá giảm
    validationFielsProductId()

    // Kiểm tra giá giảm
    validationFielsSaleValue()

    // Kiểm tra ngày bắt đầu giảm giá
    validationFielsStartUser()

    // Kiểm tra ngày kết thúc giảm giá
    validationFielsEndUser();

}

productId.addEventListener('blur', function () {
    validationFielsProductId()
});

productId.addEventListener('input', function () {
    validationFielsProductId()
});

productId.addEventListener('change', function () {
    validationFielsProductId()
    formatPriceGetId('saleValue')
});

saleValue.addEventListener('blur', function () {
    validationFielsSaleValue()
    formatPriceGetId('saleValue')
});

saleValue.addEventListener('input', function () {
    validationFielsSaleValue()
    formatPriceGetId('saleValue')
});


startUse.addEventListener('blur', function () {
    validationFielsStartUser()
});

startUse.addEventListener('input', function () {
    validationFielsStartUser()
});

endUse.addEventListener('blur', function () {
    validationFielsEndUser();
})

endUse.addEventListener('input', function () {
    validationFielsEndUser();
})

checkInputs()

// Kiểm tra trường input có hợp lệ không
function checkInputs() {
    const formattedValue = saleValue.value.trim().replace(/[^\d]/g, '');

    if (
        productId.value.trim() !== '' &&
        formattedValue !== '' &&
        startUse.value.trim() !== '' &&
        endUse.value.trim() !== '' &&
        invalidProductId.textContent.trim() === '' &&
        invalidSaveValue.textContent.trim() === '' &&
        invalidStartUse.textContent.trim() === '' &&
        invalidEndUse.textContent.trim() === ''
    ) {
        submittedButton.disabled = false;
    } else {
        submittedButton.disabled = true;
    }

}

function validationFielsProductId() {
    if (!productId.value.trim()) {
        productId.classList.remove('is-valid');
        productId.classList.add('is-invalid');
        invalidProductId.textContent = 'Vui lòng chọn mã sản phẩm';
    } else if (productId.value.trim() === '--------- Chọn sản phẩm ----------') {
        productId.classList.remove('is-valid');
        productId.classList.add('is-invalid');
        invalidProductId.textContent = 'Vui lòng chọn mã sản phẩm';
    } else {
        productId.classList.remove('is-invalid');
        productId.classList.add('is-valid');
        invalidProductId.textContent = '';
    }

    checkInputs()
}

function validationFielsSaleValue() {
    const formattedValue = saleValue.value.trim().replace(/[^\d]/g, '');
    if (!formattedValue) {
        saleValue.classList.remove('is-valid');
        saleValue.classList.add('is-invalid');
        invalidSaveValue.textContent = 'Không được bỏ trống giá giảm.';
    } else if (isNaN(formattedValue) || formattedValue === '' || formattedValue < 0) {
        saleValue.classList.remove('is-valid');
        saleValue.classList.add('is-invalid');
        invalidSaveValue.textContent = 'Giá trị giảm giá không hợp lệ. Vui lòng nhập số lớn hơn hoặc bằng 0.';
    } else if (parseInt(formattedValue) > parseInt(formattedPrice)) {
        saleValue.classList.remove('is-valid');
        saleValue.classList.add('is-invalid');
        invalidSaveValue.textContent = 'Giá giảm phải nhỏ hơn giá sản phẩm';
    } else {
        saleValue.classList.remove('is-invalid');
        saleValue.classList.add('is-valid');
        invalidSaveValue.textContent = '';
    }

    checkInputs()
}

function validationFielsStartUser() {
    const startUseValue = new Date(startUse.value.trim());
    const endUseValue = new Date(endUse.value.trim());

    if (startUse.value.trim() === '') {
        startUse.classList.remove('is-valid');
        startUse.classList.add('is-invalid');
        invalidStartUse.textContent = 'Vui lòng nhập ngày bắt đầu sử dụng';
    } else if (startUseValue > endUseValue) {
        startUse.classList.remove('is-valid');
        startUse.classList.add('is-invalid');
        invalidStartUse.textContent = 'Ngày và thời gian bắt đầu phải lớn hơn ngày và thời gian kết thúc';
    } else {
        startUse.classList.remove('is-invalid');
        startUse.classList.add('is-valid');
        endUse.classList.remove('is-invalid');
        endUse.classList.add('is-valid');
        invalidEndUse.textContent = '';
        invalidStartUse.textContent = '';
    }

    if (endUse.value.trim() === '') {
        endUse.classList.remove('is-valid');
        endUse.classList.add('is-invalid');
        invalidEndUse.textContent = 'Vui lòng nhập ngày kết thúc';
    }

    checkInputs()
}

function validationFielsEndUser() {
    const startUseValue = new Date(startUse.value.trim());
    const endUseValue = new Date(endUse.value.trim());

    if (endUse.value.trim() === '') {
        endUse.classList.remove('is-valid');
        endUse.classList.add('is-invalid');
        invalidEndUse.textContent = 'Vui lòng nhập ngày kết thúc';
    } else if (startUseValue > endUseValue) {
        endUse.classList.remove('is-valid');
        endUse.classList.add('is-invalid');
        invalidEndUse.textContent = 'Ngày và thời gian kết thúc phải lớn hơn ngày và thời gian bắt đầu';

        startUse.classList.remove('is-valid');
        startUse.classList.add('is-invalid');
        invalidStartUse.textContent = 'Ngày và thời gian bắt đầu phải lớn hơn ngày và thời gian kết thúc';
    } else if ((endUseValue - startUseValue) / (1000 * 60 * 60 * 24) > 7) {
        endUse.classList.remove('is-valid');
        endUse.classList.add('is-invalid');
        invalidEndUse.textContent = 'Khoảng thời gian không được quá 7 ngày so với ngày bắt đầu';

        startUse.classList.remove('is-valid');
        startUse.classList.add('is-invalid');
        invalidStartUse.textContent = 'Khoảng thời gian không được quá 7 ngày so với ngày kết thúc';
    } else {
        endUse.classList.remove('is-invalid');
        endUse.classList.add('is-valid');
        invalidEndUse.textContent = '';

        startUse.classList.remove('is-invalid');
        startUse.classList.add('is-valid');
        invalidStartUse.textContent = '';
    }

    if (startUse.value.trim() === '') {
        startUse.classList.remove('is-valid');
        startUse.classList.add('is-invalid');
        invalidStartUse.textContent = 'Vui lòng nhập ngày bắt đầu sử dụng';
    }

    checkInputs()
}

function cleandFiels() {
    productId.classList.remove('is-valid');
    productId.classList.remove('is-invalid');
    saleValue.classList.remove('is-valid');
    saleValue.classList.remove('is-invalid');
    startUse.classList.remove('is-valid');
    startUse.classList.remove('is-invalid');
    endUse.classList.remove('is-valid');
    endUse.classList.remove('is-invalid');

    invalidProductId.textContent = '';
    invalidSaveValue.textContent = '';
    invalidStartUse.textContent = '';
    invalidEndUse.textContent = '';
}

function cleandInput() {
    productId.classList.remove('is-valid');
    productId.classList.remove('is-invalid');
    saleValue.classList.remove('is-valid');
    saleValue.classList.remove('is-invalid');
    startUse.classList.remove('is-valid');
    startUse.classList.remove('is-invalid');
    endUse.classList.remove('is-valid');
    endUse.classList.remove('is-invalid');

    productId.value = '';
    saleValue.value = '';
    startUse.value = '';
    endUse.value = '';

    invalidProductId.textContent = '';
    invalidSaveValue.textContent = '';
    invalidStartUse.textContent = '';
    invalidEndUse.textContent = '';
}