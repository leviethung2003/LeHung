solar_app.service('AddressService', function ($http) {

    this.findAllAddress = function () {
        return $http({
            method: 'GET',
            url: API_Address + 'addressByUserId'
        })
    };

    this.findByAddressId = function (addressId) {
        return $http({
            method: 'GET',
            url: API_Address + 'findByAddressId/' + addressId
        })
    };

    this.submitAddress = function (data) {
        return $http({
            method: 'POST',
            url: API_Address + 'saveAddress/submit',
            data: data
        })
    }

    this.updateAddress = function (data) {
        return $http({
            method: 'PUT',
            url: API_Address + 'updateAddress/submit',
            data: data
        })
    }
});