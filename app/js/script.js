const selectToggle = document.querySelector('.form__control_custom-select__toggle');
const toggleIcon = document.querySelector('.form__control_custom-select__toggle__icon');
const selectList = document.querySelector('.toggleable');
const selectOptions = document.querySelector('form__control_custom-select__item')
// const html = document.querySelector('html');

selectToggle.addEventListener('click', () => {
        if (selectList.classList.contains('open-toggle')) {
            selectList.classList.remove('open-toggle');
            selectList.classList.add('close-toggle');
            toggleIcon.classList.remove('is-open');
        } 
        else {
            selectList.classList.remove('close-toggle');
            selectList.classList.add('open-toggle');
            toggleIcon.classList.add('is-open');
        }
    })


    // html.addEventListener('click', (e)=> {
    //     if (e.target !== selectToggle) {
    //         console.log(e.target.parentNode)
    //         selectList.classList.remove('open-toggle');
    //     }
    // })


console.log('hello')