function updateChart() {

    const selectedYear = $("#yearSelector").val();
    const revenueText = $("#revenue");
    const percentCompareToLastYearText = $("#percentCompareToLastYear");
    const muiTenText = $("#muiTen");
    const namDanhThu = $("#nam-doanh-thu");
    const topSellingProducts_Id = $("#topSellingProducts_Id");

    //xóa tất cả html của id
    namDanhThu.empty();
    topSellingProducts_Id.empty();
    muiTenText.empty();

    // Kiểm tra xem biểu đồ đã được khởi tạo chưa
    if (charts) {
        const url = "/quan-tri/doanh-thu-nam/load-bieu-do?year=" + selectedYear;
        $.ajax({
            url: url,
            type: "GET",
            success: function (data) {
                const revenue = data.revenue;
                const percentCompareToLastYear = data.percentCompareToLastYear;
                const muiTen = data.muiTen;
                const profitData = data.profitData;
                const topSellingProducts = data.topSellingProducts;

                const maxProfit = Math.max(...profitData);
                if (maxProfit > 0) {
                    increasedMaxValue_chartYear = roundUpToNearestThreshold(Math.floor(maxProfit));
                }

                // Cập nhật dữ liệu trong biểu đồ
                charts.updateOptions({
                    series: [{
                        data: Object.values(profitData)
                    }], yaxis: {
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
                    }
                });

                revenueText.text(formatCurrency(revenue));
                percentCompareToLastYearText.text(formatNumberWithDecimals(Math.abs(percentCompareToLastYear)) + '%');
                muiTenText.append(`<i id="muiTen" class="ti ${muiTen}"></i>`)
                namDanhThu.append(`
                    <div class="me-4">
                        <span class="round-8 bg-primary rozunded-circle me-2 d-inline-block"></span>
                        <span class="fs-2">${selectedYear}</span>
                    </div>
                    <div>
                        <span class="round-8 bg-light-primary rounded-circle me-2 d-inline-block"></span>
                        <span class="fs-2">${selectedYear - 1}</span>
                    </div>
                `);

                $.each(topSellingProducts, function (index, topSellingProduct) {
                    topSellingProducts_Id.append(`
                        <tr>
                            <td class="border-bottom-0">
                                <p class="mb-0 fw-normal">${topSellingProduct[0]}</p>
                            </td>
                            <td class="border-bottom-0">
                                <span class="fw-normal">${topSellingProduct[1]}</span>
                            </td>
                            <td class="border-bottom-0">
                                <p class="mb-0 fw-normal">${topSellingProduct[2]}</p>
                            </td>
                            <td class="border-bottom-0">
                                <div class="d-flex align-items-center gap-2">
                                     <span class="badge bg-primary rounded-3 fw-semibold">${topSellingProduct[3]}</span>
                                </div>
                            </td>
                            <td class="border-bottom-0">
                                <div class="d-flex align-items-center gap-2">
                                     <span class="badge bg-primary rounded-3 fw-semibold">${topSellingProduct[5] + '%'}</span>
                                </div>
                            </td>
                            <td class="border-bottom-0">
                                 <p class="mb-0 fw-normal">
                                 ${formatCurrency(topSellingProduct[4])}</p>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function (error) {
                console.error("Lỗi khi lấy dữ liệu: " + error.responseText);
            }
        });
    } else {
        console.error("Biểu đồ không tồn tại. Hãy đảm bảo rằng bạn đã khởi tạo biểu đồ trước khi cố gắng cập nhật nó.");
    }
}



