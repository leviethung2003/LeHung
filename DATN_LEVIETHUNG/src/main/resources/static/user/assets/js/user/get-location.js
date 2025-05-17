if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    document.getElementById("location").innerHTML = "Trình duyệt không hỗ trợ định vị vị trí.";
}

function showPosition(position) {
    document.getElementById("location").innerHTML = "Kinh độ: " + position.coords.latitude + " Vĩ độ: " + position.coords.longitude;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "Người dùng từ chối yêu cầu định vị vị trí."
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Thông tin vị trí không có sẵn."
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "Yêu cầu định vị vị trí quá thời gian."
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "Lỗi không xác định."
            break;
    }
}
