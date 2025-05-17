solar_app.service('CategoryService', function ($http) {
    this.findCategoryTop4 = function () {
        return $http({
            method: 'GET',
            url: API_GetTop4Category
        })
    };

    this.findAllCategory = function () {
        return $http({
            method: 'GET',
            url: API_ProductCategory
        })
    };
});
