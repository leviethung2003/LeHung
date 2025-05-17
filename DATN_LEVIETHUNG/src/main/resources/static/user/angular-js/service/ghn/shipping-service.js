solar_app.service('ShippingService', function ($http) {
    this.getProvince = function () {
        return $http({
            method: 'GET',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
            headers: {
                'Content-Type': 'application/json',
                'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9'
            }
        })
    };

    this.getDistrictsByProvinceId = function (province_id) {
        return $http({
            method: 'GET',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
            headers: {
                'Content-Type': 'application/json',
                'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9'
            },
            params: {
                province_id: province_id
            }
        });
    };

    this.getWardByDistrictId = function (district_id) {
        return $http({
            method: 'GET',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
            headers: {
                'Content-Type': 'application/json',
                'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9'
            },
            params: {
                district_id: district_id
            }
        });
    };

    this.getAvailableServices = function () {
        return $http({
            method: 'GET',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
            headers: {
                'Content-Type': 'application/json',
                'ShopId': '4523814',
                'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9'
            },
            params: {
                shop_id: 4523814,
                from_district: 1542,
                to_district: 1442
            }
        })
    };

    this.calculateShippingFee = function (data) {
        return $http({
            method: 'POST',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
            headers: {
                'Content-Type': 'application/json',
                'ShopId': '4523814',
                'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9'
            },
            data: data
        });
    };

    this.getEstimatedDeliveryTime = function (requestData) {
        return $http({
            method: 'GET',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime',
            headers: {
                'Content-Type': 'application/json',
                'ShopId': '4523814',
                'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9'
            },
            params: requestData
        });
    };
});
