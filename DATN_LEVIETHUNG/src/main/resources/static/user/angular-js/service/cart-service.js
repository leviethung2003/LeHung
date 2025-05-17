solar_app.service('CartService', function ($http) {
    this.findAllCart = function () {
        return $http({
            method: 'GET',
            url: API_Cart
        })
    };

    this.findAllPriceByUserId = function () {
        return $http({
            method: 'GET',
            url: API_Cart + '/productPriceByUserId'
        })
    };

    this.sumQuantityCart = function () {
        return $http({
            method: 'GET',
            url: API_Cart + '/quantity-cart'
        })
    }

    this.addProductToCart = function (productId, quantity) {
        return $http({
            method: 'POST',
            url: API_Cart + '/them-vao-gio-hang/' + productId + '&' + quantity
        })
    }

    this.updateQuantityCart = function (cartItem) {
        $http({
            method: 'POST',
            url: API_Cart + '/update-quantity-cart',
            params: {
                cardId: cartItem.id, quantity: cartItem.quantity
            }
        })
    }
});