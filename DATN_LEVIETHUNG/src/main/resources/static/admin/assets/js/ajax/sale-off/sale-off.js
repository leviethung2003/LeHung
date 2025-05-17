function getFormData() {
    const formData = new FormData();

    const productId = document.getElementById('productId').value
    const saleValue = document.getElementById('saleValue').value;
    const startUse = document.getElementById('startUse').value;
    const endUse = document.getElementById('endUse').value;

    formData.append("productId", productId);
    formData.append("saleValue", saleValue);
    formData.append("startUse", startUse);
    formData.append("endUse", endUse);

    console.log(formData)
    return formData;
}


document.getElementById("productId").addEventListener('change', function () {
    const selectedProductId = this.value;
    $.ajax({
        url: 'http://localhost:8080/quan-tri/giam-gia-san-pham/them-giam-gia-san-pham/' + selectedProductId,
        type: 'GET',
        contentType: false,
        processData: false,
        success: function (response) {
            var price = 0;
            if (response.status === '200') {
                if (response.data === null) {
                    setDataFormSaleOff('', '', '')
                    cleandFiels();
                } else {
                    setDataFormSaleOff(
                        response.data.saleValue || '',
                        response.data.startUse || '',
                        response.data.endUse || '')

                    setTimeout(function() {
                        checkAllData();
                        formatPriceGetId('saleValue');
                    }, 300);
                }
            } else if (response.status === '400') {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'success',
                    title: response.message,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            }
        }
    })
})

document.getElementById("productId").addEventListener('change', function () {
    const selectedProductId = this.value;

    $.ajax({
        url: 'http://localhost:8080/quan-tri/giam-gia-san-pham/them-giam-gia-san-pham/gia-san-pham/' + selectedProductId,
        type: 'GET',
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response)
            if (response.status === '200') {
                document.getElementById('price').value = response.data.price;

            }
        }
    })
})

document.getElementById('submitted-button').addEventListener('click', function () {
    event.preventDefault()
    const formData = getFormData();

    $.ajax({
        url: 'http://localhost:8080/quan-tri/giam-gia-san-pham/them-giam-gia-san-pham',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response)
            console.log(formData)
            if (response.status === '200') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: response.message
                });
                cleandInput();
            } else if (response.status === '201') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: response.message
                });

                setTimeout(function() {
                    window.location = 'http://localhost:8080/quan-tri/giam-gia-san-pham'
                }, 1000);

            } else if (response.status === '404') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: response.message
                });
            } else if (response.status === '400') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: response.message
                });
            }
        }

    })
})

function setDataFormSaleOff(saleValue, startUse, endUse) {

    if (saleValue === '') {
        document.getElementById('saleValue').value = '';
    } else {
        document.getElementById('saleValue').value = saleValue;
    }
    if (startUse === '') {
        document.getElementById('startUse').value = '';
    } else {
        document.getElementById('startUse').value = new Date(startUse).toISOString().slice(0, 16);
    }
    if (endUse === '') {
        document.getElementById('endUse').value = '';
    } else {
        document.getElementById('endUse').value = new Date(endUse).toISOString().slice(0, 16);
    }

}

function resetFormData() {
    document.getElementById('productId').value = '';
    document.getElementById('saveValue').value = '';
    document.getElementById('startUse').value = '';
    document.getElementById('endUse').value = '';
}


