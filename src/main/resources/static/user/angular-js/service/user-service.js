solar_app.service('UserService', function ($http) {

    this.findUserBySession = function () {
        return $http({
            method: 'GET',
            url: API_UserSession
        })
    };

    //fill form thông tin cá nhân
    this.fillProfileUserBySession = function () {
        return $http({
            method: 'GET',
            url: API_ProfileSession
        })
    };

    // Update thông tin người dùng
    this.updateProfileUser = function (userId, userData) {
        return $http({
            method: 'PUT',
            url: API_Profile + '/' + userId,
            data: userData
        });
    };

    // Check số điện thoại trùng lặp khi update thông tin
    this.checkExistPhoneProfile = function (phone) {
        return $http({
            method: 'GET',
            url: API_ExistPhoneProfile + phone,
            param: 'phoneNumber' + phone
        })
    }

    this.checkCorrectCurrentPass = function (currentPass) {
        return $http({
            method: 'GET',
            url: API_CorrectCurrentPass + currentPass,
            param: 'currentPass' + currentPass
        })
    }

    this.changePass = function (userData) {
        return $http({
            method: 'PUT',
            url: API_Profile + '/change-password',
            data: userData
        })
    };

});