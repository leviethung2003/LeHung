solar_app.controller("swiper", function ($scope, $timeout) {
    let swipers = []; // Array to store Swiper instances

    function initializeSwiper(selector, options) {
        let swiper = new Swiper(selector, options);
        swipers.push(swiper);
    }

    function initializeAllSwipers() {
        initializeSwiper("#product_pin", {
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                600: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                1000: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1300: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        // Initialize other Swiper instances in a similar manner
        initializeSwiper("#product_light", {});
        initializeSwiper("#product_sale", {});
        initializeSwiper("#network_inverter", { /* ... */});
        initializeSwiper("#hybrid_inverter", { /* ... */});
        initializeSwiper("#electricity_storage_battery", { /* ... */});
        initializeSwiper("#ess", { /* ... */});
        initializeSwiper(".mySwiper", { /* ... */});
    }

    $timeout(function () {
        initializeAllSwipers();
    });
});
