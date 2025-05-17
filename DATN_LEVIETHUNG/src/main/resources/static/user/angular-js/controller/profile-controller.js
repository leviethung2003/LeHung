solar_app.controller('profile-controller', function ($scope, $route, UserService, AuthService) {

    $scope.isPhoneNumberDuplicate = false;

    $scope.genderOptions = [{label: 'Nam', value: true}, {label: 'Nữ', value: false}];

    UserService.fillProfileUserBySession().then(function successCallback(response) {
        $scope.users = response.data;
        $scope.users.birth = new Date($scope.users.birth);
    }, function errorCallback(response) {
        console.log(response.data);
    });

    $scope.isDuplicatePhone = function () {
        let phone = $scope.users.phoneNumber;

        AuthService.checkExistPhone(phone).then(function successCallback(response) {
            $scope.isPhoneNumberDuplicate = response.data.exists;
        });
    };

    //Thao tác lấy giá trị tỉnh/thành mới
    $scope.onProvinceSelect = function () {
        $scope.users.provinceName = "null";
        const selectElement = document.getElementById("city");
        $scope.users.provinceName = selectElement.options[selectElement.selectedIndex].text;
    };

    //Thao tác lấy giá trị quận/huyện mới
    $scope.onDistrictSelect = function () {
        $scope.users.districtName = "null";
        const selectElement = document.getElementById("province");
        $scope.users.districtName = selectElement.options[selectElement.selectedIndex].text;
    };

    //Thao tác lấy giá trị phường/xã mới
    $scope.onWardSelect = function () {
        $scope.users.wardName = "null";
        const selectElement = document.getElementById("ward");
        $scope.users.wardName = selectElement.options[selectElement.selectedIndex].text;
    };

    $scope.submit_editProfile = function (userId) {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn cập nhật thông tin không ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý !',
            cancelButtonText: 'Huỷ !'
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.checkExistPhoneProfile($scope.users.phoneNumber).then(function successCallback(response) {
                    let phone = response.data.exists;

                    if (phone) {
                        centerAlert('Cảnh báo !', 'Số điện thoại đã tồn tại ở một tài khoản khác !', 'warning');
                    } else {
                        UserService.updateProfileUser(userId, $scope.users).then(function successCallback(response) {
                            $scope.users = response.data;
                            window.location.href = "/";
                        }, function errorCallback(response) {
                            console.log('Lỗi khi cập nhật thông tin người dùng', response.data);
                        });
                    }
                });
            }
        });
    };

    // nhắm mở mắt của đổi mật khẩu
    $scope.toggleChangePassword1 = function () {
        const passwordInput = document.getElementById('currentPass');
        const eyeIcon = document.getElementById('toggleCurrentPassword');


        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = '<i class="fa-solid fa-eye"></i>';
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        }
    };

    $scope.toggleChangePassword2 = function () {
        const passwordInput = document.getElementById('newPass');
        const eyeIcon = document.getElementById('toggleNewPassword');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = '<i class="fa-solid fa-eye"></i>';
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        }
    };

    $scope.toggleChangePassword3 = function () {
        const passwordInput = document.getElementById('confirmPass');
        const eyeIcon = document.getElementById('toggleConfirmPassword');


        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = '<i class="fa-solid fa-eye"></i>';
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        }
    };

    $scope.checkPasswordMatch = function () {
        const currentPass = $scope.users.currentPass;
        const newPass = $scope.users.newPass;

        // Kiểm tra mật khẩu mới có trùng với mật khẩu hiện tại hay không
        $scope.passwordMatchError = newPass === currentPass;

        // Kiểm tra mật khẩu hiện tại có chính xác hay không
        UserService.checkCorrectCurrentPass(currentPass).then(function successCallback(response) {
            $scope.currentPassError = !response.data.exists;
        });
    };

    $scope.submit_changePass = function () {
        let currentPass = $scope.users.currentPass;

        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn có chắc chắn muốn cập nhật mật khẩu không ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý !',
            cancelButtonText: 'Huỷ !'
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.checkCorrectCurrentPass(currentPass).then(function successCallback(response) {
                    currentPass = response.data.exists;

                    if (currentPass) {
                        UserService.changePass($scope.users).then(function successCallback() {
                            Swal.fire({
                                title: 'Xác nhận !',
                                text: "Đổi mật khẩu thành công. Mời đăng nhập lại!",
                                icon: 'success',
                                timer: 3000 // Tự động đóng thông báo sau 3 giây
                            }).then((result) => {
                                window.location.href = "/dang-xuat";
                            });
                        }, function errorCallback(response) {
                            console.log('Lỗi khi đổi mật khẩu người dùng', response);
                        });
                    } else {
                        toastAlert('warning', 'Mật khẩu cũ không khớp !');
                    }
                });
            }
        });
    };
})

