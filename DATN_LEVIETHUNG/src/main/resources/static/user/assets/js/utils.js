// chuyển trang thì sẽ active ở vị trí trang đó
document.addEventListener('DOMContentLoaded', function () {
    var currentUrl = window.location.pathname;

    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function (link) {
        var linkUrl = link.getAttribute('href');
        if (linkUrl && currentUrl.includes(linkUrl)) {
            link.classList.add('active');
        }
    });
});

// định dạng ngày giờ trên thanh topbar
function updateClock() {
    var now = new Date();
    var dayOfWeek = now.toLocaleString('vi-VN', {weekday: 'long'});
    var time = now.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    var date = now.toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});

    document.getElementById("dayOfWeek").innerHTML = dayOfWeek;
    document.getElementById("currentTime").innerHTML = time;
    document.getElementById("currentDate").innerHTML = date;
}

setInterval(updateClock, 1000);
updateClock();

// backtop
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });
    $("#backtop").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 0);
    });
});