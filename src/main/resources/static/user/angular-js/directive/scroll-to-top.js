solar_app.directive('scrollToTop', function ($anchorScroll) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                $anchorScroll(); // Cuộn lên đầu trang
            });
        }
    };
});
