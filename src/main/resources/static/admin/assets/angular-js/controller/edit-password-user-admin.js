solar_app_admin.controller('EditPasswordUserAdmin', function ($scope, $http, $location) {

    // Lấy tham số từ URL
    const fullUrl = $location.absUrl();

    const idIndex = fullUrl.indexOf('id=');
    if (idIndex !== -1) {
        const idString = fullUrl.substring(idIndex + 3);
        const endOfIdIndex = idString.indexOf('&');

        if (endOfIdIndex !== -1) {
            $scope.userId = idString.substring(0, endOfIdIndex);
        } else {
            $scope.userId = idString;
        }
    }

    $scope.getUser = function () {
        let userId = $scope.userId;

        $http({
            method: 'GET',
            url: API_UserAdmin + '/findById/' + userId
        }).then(function successCallback(response) {
            if (response.status === 200) {
                $scope.user = response.data;
            }
        });

        $scope.changePasswordUser = function () {
            let password = $scope.user.password1

            Swal.fire({
                title: 'Xác nhận !',
                text: "Bạn có chắc chắn muốn đổi mật khẩu không ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý !',
                cancelButtonText: 'Huỷ !'
            }).then((result) => {
                if (result.isConfirmed) {
                    $http({
                        method: 'PUT',
                        url: API_UserAdmin + '/changePassword/' + userId + '/' + password
                    }).then(function successCallback(response) {
                        if (response.status === 200) {
                            console.log(response.data)
                            let responseMessage = response.data.message;
                            let type = responseMessage.substring(0, responseMessage.indexOf(':'));
                            let message = responseMessage.substring(responseMessage.indexOf(':') + 1).trim();

                            toastAlert(type, message);
                            $('#modal-edit-pass-user').modal('hide');
                        }
                    });
                }
            });
        };
    }
});