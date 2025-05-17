// Khai báo biến
let chartMonth; // Biểu đồ doanh thu hàng ngày
let daysInMonth; // Số ngày trong tháng

// Thiết lập sự kiện lắng nghe cho dropdown chọn tháng
document.getElementById('month-select').addEventListener('change', async (event) => {
    const month = parseInt(event.target.value);
    const year = parseInt(document.getElementById('year-select').value);
    await UpdateRevenueForTheMonth(month, year);
});

// Thiết lập sự kiện lắng nghe cho dropdown chọn năm
document.getElementById('year-select').addEventListener('change', async (event) => {
    const year = parseInt(event.target.value);
    const month = parseInt(document.getElementById('month-select').value);
    await UpdateRevenueForTheMonth(month, year);
});

// Hàm khởi tạo ban đầu cho biểu đồ
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Thiết lập giá trị mặc định cho dropdown
    document.getElementById('year-select').value = currentYear;
    document.getElementById('month-select').value = currentMonth;

    // Tải biểu đồ doanh thu
    LoadRevenueChart(currentMonth, currentYear);
});

// Hàm định dạng số thành dạng tiền tệ Việt Nam
function formatCurrency(value) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency', currency: 'VND', minimumFractionDigits: 0,
    });
    return formatter.format(value);
}

// Hàm làm tròn số lên ngưỡng gần nhất
function roundUpToNearestThreshold(value) {
    const digits = value.toString().split('').map(Number);
    const hundredsDigit = digits[0] || 0;
    const thresholds = [2, 5, 10];
    const threshold = thresholds.find(t => hundredsDigit < t) || 10;
    return threshold * Math.pow(10, digits.length - 1);
}

// Hàm lấy dữ liệu doanh thu hàng tháng từ API
async function fetchMonthlyData(month, year) {
    daysInMonth = new Date(year, month, 0).getDate();
    let monthlyData = [];

    for (let day = 1; day <= daysInMonth; day++) {
        let timestamp = normalizeDate(year, month, day);
        try {
            let response = await fetch(`/api/quan-tri/doanh-thu-thang/revenueDays?day=${day}&month=${month}&year=${year}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let responseData = await response.text();
            let revenue = responseData ? JSON.parse(responseData) : 0;
            monthlyData.push({x: timestamp, y: revenue});
        } catch (error) {
            console.error(`Error fetching data for ${day}/${month}/${year}:`, error);
            monthlyData.push({x: timestamp, y: 0});
        }
    }

    return monthlyData;
}

// Hàm tải và hiển thị biểu đồ doanh thu
async function LoadRevenueChart(month, year) {
    let data = await fetchMonthlyData(month, year);
    const increasedMaxValue = findIncreasedMaxValue(data);

    const options = {
        // Cấu hình biểu đồ
        series: [{name: 'Doanh thu trong ngày: ', data: data}],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {enabled: false},
        markers: {size: 0},
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0.9,
                inverseColors: false,
                opacityFrom: 0.7,
                opacityTo: 0.8
            },
        },
        yaxis: {
            show: true,
            min: 0,
            max: increasedMaxValue,
            tickAmount: 5,
            labels: {
                style: {cssClass: 'grey--text lighten-2--text fill-color'},
                formatter: formatCurrency,
            },
        },
        xaxis: {type: 'datetime'},
        tooltip: {
            shared: false,
            y: {formatter: formatCurrency}
        }
    };

    chartMonth = new ApexCharts(document.querySelector("#chart"), options);
    chartMonth.render();

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
}

// Hàm cập nhật biểu đồ khi thay đổi tháng hoặc năm
async function updateChartChange(month, year) {
    let data = await fetchMonthlyData(month, year);
    const increasedMaxValue = findIncreasedMaxValue(data);
    chartMonth.updateOptions({
        series: [{name: `Doanh thu trong ngày: `, data: data}],
        yaxis: {
            show: true,
            min: 0,
            max: increasedMaxValue,
            tickAmount: 5,
            labels: {
                style: {cssClass: 'grey--text lighten-2--text fill-color'},
                formatter: formatCurrency,
            }
        },
    });
}

// Hàm chuẩn hóa ngày thành timestamp
function normalizeDate(year, month, day) {
    const normalizedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)).getTime();
    return normalizedDate;
}

// Hàm tìm giá trị lớn nhất từ dữ liệu và làm tròn
function findIncreasedMaxValue(data) {
    const validValues = data.map(entry => {
        const yValue = parseFloat(entry.y);
        return Number.isFinite(yValue) ? yValue : -Infinity;
    });
    const maxValue = Math.max(...validValues);
    if (maxValue === -Infinity) return 0;
    return roundUpToNearestThreshold(Math.floor(maxValue));
}

// Hàm cập nhật thông tin doanh thu khi có sự thay đổi của select
async function UpdateRevenueForTheMonth(month, year) {
    try {
        let response = await fetch(`/api/quan-tri/doanh-thu-thang/revenueMonth?month=${month}&year=${year}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let responseData = await response.json();

        // Cập nhật thông tin doanh thu hàng tháng
        updateMonthlyRevenueData(responseData.monthlyRevenue);

        // Cập nhật thông tin sản phẩm
        updateProductTable(responseData.statisticsOfBestSellingProducts);

        // Cập nhật thông tin doanh thu trung bình hàng năm
        if (responseData.calculateTotalYearlyAverageRevenue) {
            document.getElementById('yearly-average-revenue').textContent = formatCurrency(responseData.calculateTotalYearlyAverageRevenue);
        }

        // Cập nhật biểu đồ doanh thu
        await updateChartChange(month, year);

    } catch (error) {
        console.error(`Error fetching data for ${month}/${year}:`, error);
    }
}

function updateMonthlyRevenueData(data) {
    // Cập nhật dữ liệu doanh thu hàng tháng
    document.getElementById('monthly-revenue-value').textContent = formatCurrency(data[0]);
    document.getElementById('monthly-revenue-change').textContent = Math.abs(data[1]) + '%';
    document.getElementById('current-month').textContent = 'Tháng ' + data[2];
    document.getElementById('previous-month').textContent = 'Tháng ' + data[3];

    let trendIcon = document.querySelector("#monthly-revenue-icon");
    if (data[1] < 0) {
        trendIcon.className = "ti ti-arrow-down-right text-danger";
    } else {
        trendIcon.className = "ti ti-arrow-up-left text-success";
    }
}

function updateProductTable(products) {
    const tableBody = document.getElementById('tableSortStatisticsMonth').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Xóa nội dung hiện tại của tbody

    products.forEach(product => {
        let row = tableBody.insertRow();
        row.className = "align-middle"; // Thêm class cho row

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.className = "border-bottom-0";
        cell1.innerHTML = `<h6 class="fw-semibold mb-0">${product[0]}</h6>`; // Mã sản phẩm

        cell2.className = "border-bottom-0";
        cell2.innerHTML = `<h6 class="fw-semibold mb-0">${product[1]}</h6>`; // Hãng

        cell3.className = "border-bottom-0";
        cell3.innerHTML = `<p class="mb-0 fw-normal">${product[2]}</p>`; // Tên sản phẩm

        cell4.className = "border-bottom-0";
        cell4.innerHTML = `<div class="d-flex align-items-center gap-2"><span class="badge bg-primary rounded-3 fw-semibold">${product[3]}</span></div>`; // Số lượng bán

        cell5.className = "border-bottom-0";
        cell5.innerHTML = `<h6 class="fw-medium mb-0 fs-4">${product[4]} ₫</h6>`; // Tổng doanh thu + Ship
    });
}


