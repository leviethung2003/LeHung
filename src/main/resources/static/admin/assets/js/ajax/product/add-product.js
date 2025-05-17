function getFormData() {
    const formData = new FormData();

    const productIdValue = document.getElementById('productIdValue').value;
    const productName = document.getElementById("productName").value;
    const powers = document.getElementById("powers").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const warranty = document.getElementById("warranty").value;
    const brandId = document.getElementById("productBrandId").value;
    const productTypeId = document.getElementById("productTypeId").value;
    const isStatusDelete = document.getElementById("isStatusDelete").value;
    const descriptions = document.getElementById("descriptions").value;
    const templateDescription = writingArea.innerHTML;

    formData.append("id", productIdValue);
    formData.append("productName", productName);
    formData.append("powers", powers);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("warranty", warranty);
    formData.append("productBrandId", brandId);
    formData.append("productTypeId", productTypeId);
    formData.append("isStatusDelete", isStatusDelete);
    formData.append("descriptions", descriptions);
    formData.append("templateDescription", templateDescription);

    var file1 = document.getElementById("file1").files[0];
    if (file1) {
        formData.append("file1", file1);
    } else {
        formData.append("file1", null); // Hoặc bất kỳ giá trị mặc định nào bạn muốn gửi
    }

    var file2 = document.getElementById("file2").files[0];
    if (file2) {
        formData.append("file2", file2);
    } else {
        formData.append("file2", null); // Hoặc bất kỳ giá trị mặc định nào bạn muốn gửi
    }

    var file3 = document.getElementById("file3").files[0];
    if (file3) {
        formData.append("file3", file3);
    } else {
        formData.append("file3", null); // Hoặc bất kỳ giá trị mặc định nào bạn muốn gửi
    }

    var file4 = document.getElementById("file4").files[0];
    if (file4) {
        formData.append("file4", file4);
    } else {
        formData.append("file4", null); // Hoặc bất kỳ giá trị mặc định nào bạn muốn gửi
    }
    console.log(formData)
    return formData;
}

document.getElementById("submitted-button").addEventListener("click", function (event) {
    var formData = getFormData();

    $.ajax({
        url: 'http://localhost:8080/quan-tri/san-pham/them-san-pham',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response)
            if (response.status === "200") {
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

                resetFields();

                $.ajax({
                    url: 'http://localhost:8080/quan-tri/san-pham/productIdValueAPI',
                    type: 'GET',
                    success: function (newProductIdValue) {
                        document.getElementById('productIdValue').value = newProductIdValue;
                    },
                    error: function (error) {
                        document.getElementById('invalid-product-id').text = 'Lỗi khi lấy giá trị mã sản phẩm mới, bấm F5 để thử lại!';
                    }
                });

            } else if (response.status === "400") {
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
            } else if (response.status === "404") {
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
        },
        error: function (error) {
            Swal.fire(
                'Lỗi khi gửi dữ liệu!',
                centerFailed,
                'error'
            );
        }
    });
});

function resetFields() {
    document.getElementById('productIdValue').classList.remove('is-valid');
    document.getElementById('productName').classList.remove('is-valid');
    document.getElementById('powers').classList.remove('is-valid');
    document.getElementById('quantity').classList.remove('is-valid');
    document.getElementById('price').classList.remove('is-valid');
    document.getElementById('warranty').classList.remove('is-valid');
    document.getElementById('productBrandId').classList.remove('is-valid');
    document.getElementById('productTypeId').classList.remove('is-valid');
    document.getElementById('isStatusDelete').classList.remove('is-valid');
    document.getElementById('descriptions').classList.remove('is-valid');
    document.getElementById('text-input').classList.remove('is-valid');

    document.getElementById('productIdValue').value = '';
    document.getElementById("productName").value = '';
    document.getElementById("powers").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("price").value = '';
    document.getElementById("warranty").value = '';
    document.getElementById("productBrandId").value = '';
    document.getElementById("productTypeId").value = '';
    document.getElementById("isStatusDelete").value = '';
    document.getElementById("descriptions").value = '';
    document.getElementById("text-input").innerHTML = '';
}

let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let createTableButton = document.getElementById("createTable");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
];

const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
};

createTableButton.addEventListener("click", () => {
    event.preventDefault();
    let numRows = prompt("Nhập số hàng:");
    let numCols = prompt("Nhập số cột:");
    writingArea.insertAdjacentHTML("beforeend", "<p><br></p>");
    if (numRows && numCols) {
        let tableHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
        `;

        for (let i = 1; i <= numCols; i++) {
            tableHTML += `<th scope="col">Column ${i}</th>`;
        }

        tableHTML += `
                    </tr>
                </thead>
                <tbody>
        `;

        for (let i = 0; i < numRows; i++) {
            tableHTML += `
                <tr>
                    <th scope="row">${i + 1}</th>
            `;
            for (let j = 0; j < numCols; j++) {
                tableHTML += `<td>Cột ${j + 1}</td>`;
            }
            tableHTML += `</tr>`;
        }

        tableHTML += `
                </tbody>
            </table>
        `;

        writingArea.insertAdjacentHTML("beforeend", tableHTML);
        writingArea.insertAdjacentHTML("beforeend", "<p><br></p>");
        writingArea.insertAdjacentHTML("beforeend", "<p><br></p>");
    }
});

optionsButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault(); // Ngăn mặc định hành động của form
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", (event) => {
    event.preventDefault();
    let userLink = prompt("Enter a URL");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;

                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }

                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = initializer();

