let API_Template = '/page/';

// api user
let API_UserSession = '/api/user/session-user';
let API_User = '/api/user';

// api profile và mật khẩu
let API_ProfileSession = '/api/profile/profile-session-user'
let API_Profile = '/api/profile'
let API_Password = '/api/password'

// api category
let API_GetTop4Category = '/api/product/get-top4-category'
let API_ProductCategory = '/api/product-category';

// api product
let API_Product = '/api/product';
let API_ProductType = '/api/product-type';

// api discount
let API_Discount = '/api/discount'

// api giỏ hàng
let API_Cart = '/api/carts';

// api order
let API_Order = 'api/order';

// api rate procduct
let API_RateProduct = 'api/rate-product'

// api vnpay
let API_VNPAY = '/api/vnpay'

// api check tồn tại email, số điện thoại, mật khẩu
let API_ExistEmail = '/api/check-duplicate-email/'
let API_ExistPhone = '/api/check-duplicate-phone/'
let API_ExistPhoneProfile = '/api/check-phone-user/'
let API_ExistEmailForgot = '/api/check-email-user-active/'
let API_VerifyCodeOnTime = '/api/check-code-on-time'

// api check mật khẩu hiện tại đúng (dùng cho đổi mật khẩu)
let API_CorrectCurrentPass = '/api/check-current-password/'

// api order item
let API_OrderItem = '/api/order-item'

// api sale off
let API_SaleOff = '/api/product/sale-off'

// api address
let API_Address = 'api/address/'

// khởi tạo ứng dụng
let solar_app = angular.module('solar_app', ['ngRoute']);

solar_app.config(['$httpProvider', '$qProvider', function ($httpProvider, $qProvider) {
    $httpProvider.interceptors.push('authenticateToken');
    $qProvider.errorOnUnhandledRejections(false);
}]);

// router link
solar_app.config(function ($routeProvider) {
    $routeProvider
        .when('/trang-chu', {
            templateUrl: API_Template + 'home/home.html',
            controller: 'index_controller'
        })
        .when('/gioi-thieu', {
            templateUrl: API_Template + 'contact/about.html',
            controller: ''
        })
        .when('/hoa-luoi-on-grid', {
            templateUrl: API_Template + 'contact/on-grid.html',
            controller: ''
        })
        .when('/hoa-luoi-hybrid', {
            templateUrl: API_Template + 'contact/hybrid.html',
            controller: ''
        })
        .when('/ban-tin', {
            templateUrl: API_Template + 'contact/news.html',
            controller: ''
        })
        .when('/chinh-sach', {
            templateUrl: API_Template + 'contact/policy.html',
            controller: ''
        })
        .when('/lien-he', {
            templateUrl: API_Template + 'contact/contact.html',
            controller: ''
        })

        // product
        .when('/san-pham', {
            templateUrl: API_Template + 'product/product.html',
            controller: 'product'
        })
        .when('/san-pham/loai-danh-muc', {
            templateUrl: API_Template + 'product/product-type.html',
            controller: 'product_type'
        })
        .when('/san-pham/loai-danh-muc/san-pham-chi-tiet', {
            templateUrl: API_Template + 'product/product_details.html',
            controller: 'product_details'
        })


        // cart
        .when('/gio-hang', {
            templateUrl: API_Template + 'cart/cart.html',
            controller: 'cart_controller'
        })
        .when('/gio-hang/xac-nhan-thong-tin-don-hang', {
            templateUrl: API_Template + 'cart/check-details.html',
            controller: 'check_details_controller'
        })
        .when('/lich-su-mua-hang', {
            templateUrl: API_Template + 'history/history-payment.html',
            controller: 'history_payment_controller'
        })
        .when('/danh-gia-san-pham', {
            templateUrl: API_Template + 'rate/rate-products.html',
            controller: 'rate_controller',
        })

        // vnpay
        .when('/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan', {
            templateUrl: API_Template + 'vnpay/payment-vnpay.html',
            controller: 'vnpay_controller'
        })
        .when('/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan/thanh-cong', {
            templateUrl: API_Template + 'vnpay/payment-success.html',
            controller: 'create_order_controller'
        })
        .when('/gio-hang/xac-nhan-thong-tin-don-hang/thanh-toan/that-bai', {
            templateUrl: API_Template + 'vnpay/payment-failed.html',
            controller: 'create_order_controller'
        })

        // auth
        .when('/dang-nhap', {
            templateUrl: API_Template + 'auth/login.html',
            controller: 'auth_controller'
        })
        .when('/dang-ky', {
            templateUrl: API_Template + 'auth/sign-up.html',
            controller: 'auth_controller'
        })
        .when('/xac-thuc-tai-khoan', {
            templateUrl: API_Template + 'auth/verify-success.html',
            controller: 'auth_controller'
        })
        .when('/thong-tin', {
            templateUrl: API_Template + 'profile/user-profile.html',
            controller: 'profile-controller'
        })
        .when('/thong-tin/sua-thong-tin', {
            templateUrl: API_Template + 'profile/user-editprofile.html',
            controller: 'profile-controller'
        })
        .when('/doi-mat-khau', {
            templateUrl: API_Template + 'password/change-password.html',
            controller: 'profile-controller'
        })
        .when('/quen-mat-khau', {
            templateUrl: API_Template + 'password/forgot-password.html',
            controller: 'password-controller'
        })
        .when('/xac-nhan-otp', {
            templateUrl: API_Template + 'password/verify.html',
            controller: 'password-controller'
        })
        .when('/mat-khau-moi', {
            templateUrl: API_Template + 'password/new-password.html',
            controller: 'password-controller'
        })
        .otherwise({
            redirectTo: '/trang-chu'
        })
});
