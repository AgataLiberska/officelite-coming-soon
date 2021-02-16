const selectToggle = document.querySelector('.form__control_custom-select__toggle');
const selectOptions = document.querySelector('.toggleable');
const html = document.querySelector('html');

selectToggle.addEventListener('click', () => {
    if (selectOptions.classList.contains('open-toggle')) {
        selectOptions.classList.remove('open-toggle');
        selectOptions.classList.add('close-toggle');
    } 
    else {
        selectOptions.classList.remove('close-toggle');
        selectOptions.classList.add('open-toggle')
    }
})

html.addEventListener('click', (e)=> {
    if (e.target !== selectToggle) {
        selectOptions.classList.remove('open-toggle');
    }
})

console.log('hello')