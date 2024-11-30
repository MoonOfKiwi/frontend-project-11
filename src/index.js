import './style.css';
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './views.js';

const state = {
    inputForm: {
        validURL: true,
        status: null //RSS уже существует, Ресурс не содержит валидный RSS, Ссылка должна быть валидным URL, RSS успешно загружен
    },
    stackURL: []
};

const watchedState = onChange(state, () => render(state));

const isURLNotInStack = (url) => {
    console.log(watchedState.stackURL)
    const doubles = watchedState.stackURL.filter((site) => site === url);
    return doubles.length == 0; 
};

const validateFormURL = () => {
    const form = document.querySelector('form');
    const schema = yup.string()
                        .url('Ссылка должна быть валидным URL')
                        .required('Необходимо ввести URL')
                        .test('notInStack', 'RSS уже существует', isURLNotInStack);

    form.addEventListener('submit', (event) => {
        // В дальнейшем нужно удалить стоппер для отправки формы
        event.preventDefault();
        const formData = new FormData(event.target);
        const inputURL = formData.get('url');
        schema.validate(inputURL)
        .then(() => {
            watchedState.inputForm.validURL = true;
            watchedState.stackURL.push(inputURL);
            watchedState.inputForm.status = 'RSS успешно загружен';
        })
        .catch((error) => {
            watchedState.inputForm.validURL = false;
            watchedState.inputForm.status = error.message;
        });
        
    })
};
validateFormURL();
