solar_app.factory('OrderCodeService', function () {
    return {
        generateOrderCode: function () {
            const randomNumber = Math.floor(Math.random() * 1000000);
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
            const year = currentDate.getFullYear();
            return 'DH' + year + month + day + randomNumber;
        }
    };
});