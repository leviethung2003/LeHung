let solar_app_admin = angular.module('solar_app_admin', []);

// confirm order
let API_findAllOrder = '/quan-tri/api/findAllOrder';
let API_findByOrderId = '/quan-tri/api/findByOrderId'
let API_findOrderItemByOrderId = '/quan-tri/api/findOrderItemByOrderId';

let API_CancelOrderByCustomer = '/quan-tri/api/cancelOrderByCustomer'
let API_CancelOrder = '/quan-tri/api/cancelOrder'
let API_ConfirmOrder = '/quan-tri/api/confirmOrder'
let API_DeliveredOrder = '/quan-tri/api/deliveredOrder'
let API_Discount = '/api/discount'

// notification
let API_Notification = '/api/quan-tri/notification'

// change password user admin
let API_UserAdmin = '/quan-tri/tai-khoan/api'

// nhân viên role staff
let API_RoleStaff = '/quan-tri/nhan-vien/api'

solar_app_admin.filter('vietnameseDateTimeAdmin', function () {
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

solar_app_admin.filter('timeAgo', function () {
    return function (input) {
        if (input) {
            var seconds = Math.floor((new Date() - new Date(input)) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " năm trước";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " tháng trước";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " ngày trước";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " giờ trước";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " phút trước";
            }
            return Math.floor(seconds) + " giây trước";
        }
        return '';
    };
});