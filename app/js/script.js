const customSelectTrigger = document.querySelectorAll('.custom-select-trigger');
const customSelectArrow = document.querySelector('.form__control_custom-select__toggle__icon');
const customSelectDropdown = document.querySelector('.form__control_custom-select__dropdown');
const customSelectOptions = document.querySelectorAll('.form__control_custom-select__item');
const customSelectInput = document.querySelector('.form__control_custom-select__input');

customSelectOptions.forEach(option => {
    option.setAttribute('tabindex', '-1');
})


// EVENT LISTENERS

// open & close dropdown
customSelectTrigger.forEach(trigger => {
    trigger.addEventListener('click', () => {
        if (customSelectDropdown.classList.contains('open-dropdown')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    })
})

// select option 
customSelectOptions.forEach(option => {
    option.addEventListener('click', () => {
        // check that the clicked option is not selected
        if (!option.classList.contains('selected')) {
            // find the selected option and unselect
            option.parentNode.querySelector('.form__control_custom-select__item.selected').classList.remove('selected');
        }
        // select clicked option
        option.classList.add('selected');
        
        // set input value to the text in selected option
        customSelectInput.value = option.innerHTML;

        // close dropdown
        closeDropdown()
    })
})

function openDropdown() {
    customSelectDropdown.classList.remove('close-dropdown');
    customSelectDropdown.classList.add('open-dropdown');
    customSelectArrow.classList.add('is-open');
}

function closeDropdown() {
    customSelectDropdown.classList.remove('open-dropdown');
    customSelectDropdown.classList.add('close-dropdown');
    customSelectArrow.classList.remove('is-open');
}



// selecting from custom options


function doKeyAction(whichKey) {
    const focusPoint = document.activeElement;
    switch(whichKey) {
        case 'ArrowDown':
            openDropdown();
            moveFocus(focusPoint, 'forward');
            break;
        case 'ArrowUp':
            openDropdown();
            moveFocus(focusPoint, 'back');
            break;
        case 'Enter':
            makeChoice(focusPoint);
            closeDropdown();
            break;    
    }
}

function makeChoice(whichOption) {
    const optionText = whichOption.documentQuerySelector('.form__control_custom-select__item');
    customSelectInput.value = optionText;
}