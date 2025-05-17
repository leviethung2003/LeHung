document.addEventListener('DOMContentLoaded', function () {
    // ... (các trường đã có)

    const nameEditCategorys = document.getElementById('name-edit-categorys');
    const fileInput = document.getElementById('file-input');

    const errorNameEditCategorys = document.getElementById('invalid-name-edit-categorys');
    const errorFileInput = document.getElementById('invalid-file-input');

    const submittedButton = document.getElementById('submitted-button');
    let categorySubmitted = false;

    function checkInputsCategory() {
        const fields = [nameEditCategorys, fileInput];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === '') {
                submittedButton.disabled = true;
                return;
            }
        }
        submittedButton.disabled = categorySubmitted;
    }

    checkInputsCategory();

    nameEditCategorys.addEventListener('blur', function () {
        const value = nameEditCategorys.value.trim();

        if (value === '') {
            nameEditCategorys.classList.remove('is-valid');
            nameEditCategorys.classList.add('is-invalid');
            errorNameEditCategorys.textContent = 'Vui lòng nhập tên danh mục';
        } else {
            nameEditCategorys.classList.remove('is-invalid');
            nameEditCategorys.classList.add('is-valid');
            errorNameEditCategorys.textContent = '';
        }
        checkInputsCategory();
    });

    fileInput.addEventListener('change', function () {
        const value = fileInput.value.trim();

        if (value === '') {
            fileInput.classList.remove('is-valid');
            fileInput.classList.add('is-invalid');
            errorFileInput.textContent = 'Vui lòng chọn một tệp tin';
        } else {
            fileInput.classList.remove('is-invalid');
            fileInput.classList.add('is-valid');
            errorFileInput.textContent = '';
        }
        checkInputsCategory();
    });

    submittedButton.addEventListener('click', function (event) {
        if (categorySubmitted) {
            event.preventDefault();
        } else {
            const form = document.getElementById('form-category');
            form.submit();
            categorySubmitted = true;
            checkInputsCategory();
        }
    });
});