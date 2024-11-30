const render = (state) => {
    const inputForm = document.querySelector('input');
    const formStatus = document.querySelector('.feedback');

    if (state.inputForm.validURL) {
        inputForm.classList.remove('is-invalid');
        formStatus.classList.remove('text-danger');
        formStatus.classList.add('text-success');
        inputForm.value = '';
        inputForm.focus();
    } else {
        inputForm.classList.add('is-invalid');
        formStatus.classList.remove('text-success');
        formStatus.classList.add('text-danger'); 
    }

    formStatus.textContent = state.inputForm.status;
};

export default render;