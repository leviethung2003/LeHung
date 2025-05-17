solar_app.filter('timestampToDateString', function () {
    return function (timestamp) {
        // Tạo một đối tượng Date từ timestamp (đơn vị: giây)
        const date = new Date(timestamp * 1000); // Nhân 1000 để chuyển từ mili-giây thành giây

        // Lấy ngày, tháng, năm
        let day = date.getDate();
        let month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        let year = date.getFullYear();

        // Đảm bảo rằng ngày và tháng có 2 chữ số
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        // Trả về chuỗi ngày/tháng/năm
        return day + '/' + month + '/' + year;
    };
});

solar_app.filter('calculatePreviousDate', function () {
    return function (timestamp, days) {
        if (!timestamp) {
            return null;
        }

        // Tạo một đối tượng Date từ timestamp (đơn vị: giây)
        const date = new Date(timestamp * 1000); // Nhân 1000 để chuyển từ mili-giây thành giây

        // Trừ đi số ngày cần tính
        date.setDate(date.getDate() - days);

        // Lấy ngày, tháng, năm
        let day = date.getDate();
        let month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        let year = date.getFullYear();

        // Đảm bảo rằng ngày và tháng có 2 chữ số
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        // Trả về chuỗi ngày/tháng/năm
        return day + '/' + month + '/' + year;
    };
});

solar_app.filter('vietnameseDateTime', function () {
    return function (isoDateTime) {
        const date = new Date(isoDateTime);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
});

solar_app.filter('formatDateTime', function () {
    return function (apiDateTime) {
        // Chuyển đổi chuỗi đầu vào thành đối tượng Moment
        const momentObj = moment(apiDateTime, 'YYYYMMDDHHmmss');

        // Format theo định dạng mong muốn (dd/mm/yyyy HHmmss)
        return momentObj.format('DD/MM/YYYY HH:mm:ss');
    };
});