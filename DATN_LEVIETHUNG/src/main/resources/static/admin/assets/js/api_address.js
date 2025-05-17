var citis = document.getElementById("city");
var province = document.getElementById("province");
var wards = document.getElementById("ward");

var Parameter = {
    url: "/admin/assets/js/data/data.json", //Đường dẫn đến file chứa dữ liệu hoặc api do backend cung cấp
    method: "GET", //do backend cung cấp
    responseType: "application/json", //kiểu Dữ liệu trả về do backend cung cấp
};

var promise = axios(Parameter);
//Xử lý khi request thành công
promise.then(function (result) {
    var currentURL = window.location.href;

    if (currentURL.indexOf("tai-khoan/sua-tai-khoan/") !== -1) {
        renderCityEdit(result.data);
    } else if (currentURL.indexOf("them-tai-khoan") !== -1) {
        renderCityEdit(result.data);
    } else if (currentURL.indexOf("thong-tin/sua-thong-tin") !== -1) {
        renderCityEdit(result.data);
    } else if (currentURL.indexOf("nhan-vien/sua-nhan-vien") !== -1) {
        renderCityEdit(result.data);
    } else {
        renderCity(result.data);
    }
});


function renderCity(data) {
    for (const x of data) {
        const option = new Option(x.Name, x.Name); // Sử dụng x.Name làm giá trị và nhãn
        citis.options[citis.options.length] = option;
    }

    // Xử lý khi thay đổi tỉnh thành
    citis.onchange = function () {
        province.length = 1;
        wards.length = 1;
        if (this.value != "") {
            const result = data.filter((n) => n.Name === this.value);

            for (const k of result[0].Districts) {
                const option = new Option(k.Name, k.Name);
                province.options[province.options.length] = option;
            }
        }
    };


    province.onchange = function () {
        wards.length = 1;
        const dataCity = data.filter((n) => n.Name === citis.value);
        if (this.value != "") {
            const dataWards = dataCity[0].Districts.filter((n) => n.Name === this.value)[0].Wards;

            for (const w of dataWards) {
                const option = new Option(w.Name, w.Name);
                wards.options[wards.options.length] = option;
            }
        }
    };
}

function renderCityEdit(data) {
    for (const x of data) {
        const option = new Option(x.Name, x.Name); // Sử dụng x.Name làm giá trị và nhãn
        citis.options[citis.options.length] = option;
    }
    performEventsInOrder();

    let previousCitisValue = citis.value; // Lưu giá trị của citis trước khi thay đổi

    citis.onchange = function () {
        if (previousCitisValue !== this.value) {
            // Citis đã thay đổi giá trị
            previousCitisValue = this.value; // Cập nhật giá trị của citis trước khi thay đổi
            province.innerHTML = '<option value="" selected>Chọn Quận/Huyện</option>';
            wards.innerHTML = '<option value="" selected>Chọn Phường/Xã</option>';

        }
        // Thực hiện các xử lý khác ở đây sau khi citis thay đổi
    };

    let previousDistrictsValue = province.value; // Lưu giá trị của province trước khi thay đổi
    province.onchange = function () {
        if (previousDistrictsValue !== this.value) {
            // Districts đã thay đổi giá trị
            previousDistrictsValue = this.value; // Cập nhật giá trị của province trước khi thay đổi
            wards.innerHTML = '<option value="" selected>Chọn Phường/Xã</option>';
        }
        // Thực hiện các xử lý khác ở đây sau khi province thay đổi
    };


    // Xử lý khi thay đổi tỉnh thành
    citis.onclick = function () {
        province.length = 1;
        wards.length = 1;
        if (this.value !== "") {
            const result = data.filter((n) => n.Name === this.value);

            for (const k of result[0].Districts) {
                const option = new Option(k.Name, k.Name);
                province.options[province.options.length] = option;
            }
        }
        setTimeout(function () {
            province.click();
        }, 100);
    };

    // Xử lý khi thay đổi quận huyện
    province.onclick = function () {
        wards.length = 1;
        const dataCity = data.filter((n) => n.Name === citis.value);
        if (this.value != "") {
            const dataWards = dataCity[0].Districts.filter((n) => n.Name === this.value)[0].Wards;

            for (const w of dataWards) {
                const option = new Option(w.Name, w.Name);
                wards.options[wards.options.length] = option;
            }
        }
    };
}

function performEventsInOrder() {
    setTimeout(function () {
        citis.click();
        setTimeout(function () {
            province.click();
        }, 100);
    }, 100);
}

function btnFunc() {
    var selectedCityIndex = citis.selectedIndex;
    var selectedDistrictIndex = province.selectedIndex;
    var selectedWardIndex = wards.selectedIndex;

    var selectedCityName = citis.options[selectedCityIndex].text;
    var selectedDistrictName = province.options[selectedDistrictIndex].text;
    var selectedWardName = wards.options[selectedWardIndex].text;

    var selectedAddress = `Địa chỉ đã chọn: ${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`;
    console.log(selectedAddress);
}

