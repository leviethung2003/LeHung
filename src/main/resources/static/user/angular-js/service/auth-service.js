solar_app.service('AuthService', function ($http) {

    this.loginAuthenticate = function (data) {
        return $http({
            method: 'POST',
            url: API_User + '/login/authenticate',
            data: data
        })
    };

    this.getCurrentUser = function (token) {
        const tokenString = JSON.stringify(token);
        const tokenObject = JSON.parse(tokenString);
        const jwtToken = tokenObject.token;

        return $http({
            method: 'GET',
            url: API_User + '/request-client',
            headers: {
                'Authorization': jwtToken
            }
        });
    };

    this.extractTokenLogin = function (email) {
        return $http({
            method: 'GET',
            url: API_User + '/redirectUrl/' + email,
        });
    }

    this.creatAuth = function (authData) {
        return $http({
            method: 'POST',
            url: API_User + '/register',
            data: authData
        })
    };

    this.findUserByEmail = function (email) {
        return $http({
            method: 'GET',
            url: API_User + '/find-by-email/' + email
        })
    };

    this.checkExistEmail = function (email) {
        return $http({
            method: 'GET',
            url: API_ExistEmail + email,
            param: 'email' + email
        })
    }

    this.checkExistPhone = function (phone) {
        return $http({
            method: 'GET',
            url: API_ExistPhone + phone,
            param: 'phoneNumber' + phone
        })
    }
});
