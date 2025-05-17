solar_app.service('PasswordService', function ($http) {

    this.checkExistEmailForgotPass = function (email) {
        return $http({
            method: 'GET',
            url: API_ExistEmailForgot + email,
            param: 'email' + email
        })
    }

    this.emailForgot = function (email, passwordData) {
        return $http({
            method: 'POST',
            url: API_Password + '/' + email,
            data: passwordData
        })
    };

    this.checkCodeOnTime = function () {
        return $http({
            method: 'GET',
            url: API_VerifyCodeOnTime
        })
    }

    this.checkVerifyCode = function (verifyCode) {
        return $http({
            method: 'POST',
            url: API_Password + "/xac-nhan-code",
            data: verifyCode   // Sử dụng data thay vì param
        })
    }

    this.checkNewPassword = function (newPassData) {
        return $http({
            method: 'PUT',
            url: API_Password + "/new-password",
            data: newPassData
        })
    }
});
