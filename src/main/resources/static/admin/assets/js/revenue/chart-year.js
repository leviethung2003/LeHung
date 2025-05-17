// Khởi tạo biến và lấy dữ liệu lợi nhuận
const profitDataElement = document.getElementById("profitData");
let profitData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Cập nhật dữ liệu nếu tồn tại trong DOM
if (profitDataElement !== null) {
    profitData = JSON.parse(profitDataElement.getAttribute("data-profit"));
}

// Tìm giá trị lợi nhuận lớn nhất
var maxProfit = Math.max(...profitData);

// Lấy phần nguyên của giá trị lợi nhuận lớn nhất
var roundedMaxValue_chartYear = Math.floor(maxProfit);

/**
 * Làm tròn số lên ngưỡng gần nhất
 * @param {number} value - Số cần làm tròn
 * @returns {number} - Số đã được làm tròn
 */
function roundUpToNearestThreshold(value) {
    const digits = value.toString().split('').map(Number);
    const hundredsDigit = digits[0] || 0;
    const thresholds = [2, 5, 10];
    const threshold = thresholds.find(t => hundredsDigit < t) || thresholds[thresholds.length - 1];
    return threshold * Math.pow(10, digits.length - 1);
}

// Áp dụng làm tròn
var increasedMaxValue_chartYear = roundUpToNearestThreshold(roundedMaxValue_chartYear);

/**
 * Định dạng số thành dạng tiền tệ Việt Nam
 * @param {number} value - Số cần định dạng
 * @returns {string} - Chuỗi định dạng tiền tệ
 */
function formatCurrency(value) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency', currency: 'VND', minimumFractionDigits: 0,
    });
    return formatter.format(value);
}

/**
 * Định dạng số với số chữ số thập phân
 * @param {number} value - Số cần định dạng
 * @returns {string} - Chuỗi định dạng số
 */
function formatNumberWithDecimals(value) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2
    });
    return formatter.format(value);
}

// Cấu hình biểu đồ lợi nhuận
const chartOptions = {
    series: [{
        name: "Doanh thu tháng này",
        data: Object.values(profitData)
    }],
    chart: {
        type: "bar",
        height: 345,
        offsetX: -15,
        toolbar: {show: true},
        foreColor: "#adb0bb",
        fontFamily: 'inherit',
        sparkline: {enabled: false},
    },
    colors: ["#5D87FF", "#49BEFF"],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "35%",
            borderRadius: [6],
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'all'
        },
    },
    markers: {size: 0},
    dataLabels: {enabled: false},
    legend: {show: false},
    grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    xaxis: {
        type: "category",
        categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        labels: {
            style: {cssClass: "grey--text lighten-2--text fill-color"},
        },
    },
    yaxis: {
        show: true,
        min: 0,
        max: increasedMaxValue_chartYear,
        tickAmount: 5,
        labels: {
            style: {
                cssClass: 'grey--text lighten-2--text fill-color',
            },
            formatter: function (value) {
                return formatCurrency(value);
            },
        },
    },
    tooltip: {theme: "light"},
    responsive: [{
        breakpoint: 600,
        options: {
            plotOptions: {
                bar: {
                    borderRadius: 3,
                }
            },
        }
    }]
};

const earning = {
    chart: {
        id: "sparkline3", type: "area", height: 60, sparkline: {
            enabled: true,
        }, group: "sparklines", fontFamily: "Plus Jakarta Sans', sans-serif", foreColor: "#adb0bb",
    }, series: [{
        name: "Earnings", color: "#49BEFF", data: [25, 66, 20, 40, 12, 58, 20],
    },], stroke: {
        curve: "smooth", width: 2,
    }, fill: {
        colors: ["#f3feff"], type: "solid", opacity: 0.05,
    },

    markers: {
        size: 0,
    }, tooltip: {
        theme: "dark", fixed: {
            enabled: true, position: "right",
        }, x: {
            show: false,
        },
    },
};
new ApexCharts(document.querySelector("#earning"), earning).render();

// Khởi tạo và hiển thị biểu đồ
const charts = new ApexCharts(document.querySelector("#chart"), chartOptions);
charts.render();
