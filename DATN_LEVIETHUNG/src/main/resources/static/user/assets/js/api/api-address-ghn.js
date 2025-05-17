var citiesDropdown = document.getElementById("city");
var districtsDropdown = document.getElementById("district");
var wardsDropdown = document.getElementById("ward");

var parameters = [
    {
        url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        method: "GET",
        headers: {
            'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9',
            'Content-Type': 'application/json'
        },
    }
];

// Gọi ajax = axios => nó trả về cho chúng ta là một promise
var promises = parameters.map(function (param) {
    return axios(param);
});

// Chờ tất cả các promise hoàn thành
Promise.all(promises)
    .then(function (results) {
        // Xử lý kết quả từ các API ở đây
        var provinces = results[0].data.data; // Lấy danh sách tỉnh/thành phố

        // Hiển thị danh sách tỉnh/thành phố trong dropdown "Thành phố"
        provinces.forEach(function (province) {
            var option = document.createElement("option");
            option.value = province.ProvinceID;
            option.text = province.ProvinceName;
            citiesDropdown.appendChild(option);
        });

        // Bắt sự kiện khi người dùng chọn một tỉnh/thành phố
        citiesDropdown.addEventListener('change', function () {
            var selectedProvinceID = citiesDropdown.value;
            var districtsParameter = {
                url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
                method: "GET",
                headers: {
                    'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9',
                    'Content-Type': 'application/json'
                },
                params: {
                    "province_id": selectedProvinceID
                }
            };

            axios(districtsParameter)
                .then(function (result) {
                    var districtsData = result.data.data;
                    // Xóa tất cả các option trong dropdown "Quận/Huyện"
                    districtsDropdown.innerHTML = '';
                    // Hiển thị danh sách quận/huyện trong dropdown "Quận/Huyện"
                    districtsData.forEach(function (district) {
                        var option = document.createElement("option");
                        option.value = district.DistrictID;
                        option.text = district.DistrictName;
                        districtsDropdown.appendChild(option);
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        });

        // Bắt sự kiện khi người dùng chọn một quận huyện
        districtsDropdown.addEventListener('change', function () {
            var selectedDistrictID = districtsDropdown.value;
            var wardsParameter = {
                url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                method: "GET",
                headers: {
                    'Token': 'af00fa30-4f0e-11ee-96dc-de6f804954c9',
                    'Content-Type': 'application/json'
                },
                params: {
                    "district_id": selectedDistrictID
                }
            };

            axios(wardsParameter)
                .then(function (result) {
                    var wardsData = result.data.data;

                    // Xóa tất cả các option trong dropdown "Xã/Phường"
                    wardsDropdown.innerHTML = '';

                    // Hiển thị danh sách xã/phường trong dropdown "Xã/Phường"
                    wardsData.forEach(function (ward) {
                        var option = document.createElement("option");
                        option.value = ward.WardCode;
                        option.text = ward.WardName;
                        wardsDropdown.appendChild(option);
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    })
    .catch(function (error) {
        console.error(error);
    });
