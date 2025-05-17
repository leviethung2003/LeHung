document.querySelector("#exportExcel").addEventListener("click", function () {
    let table = document.querySelector("#sortDoanhThuNam");
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.table_to_sheet(table);

    XLSX.utils.book_append_sheet(wb, ws, "Top 5 Sản phẩm");
    XLSX.writeFile(wb, "Top_5_San_Pham.xlsx");
});


