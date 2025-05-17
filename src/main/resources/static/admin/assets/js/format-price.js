//format giá tiền khi nhập vào
function formatPrice(input) {

    let rawValue = input.value.replace(/[^0-9]/g, '');

    let price = parseInt(rawValue);

    if (!isNaN(price)) {
        input.value = price.toLocaleString('en-US');
    }
}

function formatPriceGetId(inputId) {
    // Lấy đối tượng input bằng cách sử dụng ID
    let input = document.getElementById(inputId);

    if (!input) {
        console.error("Input element not found");
        return;
    }

    let rawValue = input.value.replace(/[^0-9]/g, '');

    let price = parseInt(rawValue);

    if (!isNaN(price)) {
        // Cập nhật giá trị của input
        input.value = price.toLocaleString('en-US');
    }
}

