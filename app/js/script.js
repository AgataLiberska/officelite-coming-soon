// ========= CUSTOM SELECT DROPDOWN ==========================

const customSelector = document.querySelector('.js-custom-select');
const csTrigger = document.querySelectorAll('.js-custom-select-trigger');
const csArrow = document.querySelector('.custom-select__icon');
const csDropdown = document.querySelector('.custom-select__dropdown');
const csOptions = document.querySelectorAll('.custom-select__item');
const csInput = document.querySelector('.custom-select__input');

let csState = 'initial';

customSelector.setAttribute("role", "combobox");
customSelector.setAttribute("has-popup", "listbox");
customSelector.setAttribute("aria-owns", "custom-select-list");

csDropdown.setAttribute("role", "listbox");

csInput.setAttribute("aria-autocomplere", "both");
csInput.setAttribute("aria-controls", "custom-select-list");

csOptions.forEach(option => {
    option.setAttribute("role", "option")
    option.setAttribute("tabindex","-1");
})

// EVENT LISTENERS - - - - - - - - - - - - - - - - - - - - - - - - 

customSelector.addEventListener('click', e => {
    const currentFocus = findFocus();
    switch(csState) {
        case 'initial' :
            openDropdown();
            setState('opened');
            break;
        case 'opened' :
            if (currentFocus === csInput) {
                closeDropdown();
                setState('initial');
            } else if (currentFocus.tagName === 'LI') {
                makeSelection(currentFocus);
                closeDropdown();
                setState('initial');
            }
            break;
    }
})

document.addEventListener('click', e => {
    if (!e.target.closest('.js-custom-select')) {
        closeDropdown();
        setState('initial');
    }
})

// FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - 

function openDropdown() {
    csDropdown.classList.remove('close-dropdown');
    csDropdown.classList.add('open-dropdown');
    csDropdown.setAttribute("aria-expanded", "true");
    csArrow.classList.add('is-open');
}

function closeDropdown() {
    csDropdown.classList.remove('open-dropdown');
    csDropdown.classList.add('close-dropdown');
    csDropdown.setAttribute("aria-expanded", "false");
    csArrow.classList.remove('is-open');
}

function makeSelection(option) {
    // check that the clicked option is not selected
    if (!option.classList.contains('selected')) {
        // find the selected option and unselect
        option.parentNode.querySelector('.custom-select__item.selected').classList.remove('selected');
    }
    // select clicked option
    option.classList.add('selected');
    
    // set input value to the text in selected option
    csInput.value = option.textContent;
}

function setState(newState) {
    csState = newState;
}

function findFocus() {
    const focusPoint = document.activeElement;
    return focusPoint;
}
// =========== FORM VALIDATION ====================================
// Name is required, Email is required, Email needs to be email

const form = document.querySelector('.form');
const nameInput = document.querySelector('.js-form-name');
const emailInput = document.querySelector('.js-form-email');

// EVENT LISTENERS - - - - - - - - - - - - - - - - - - - 

// Check validity of the form on submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // if name is empty
    if (nameInput.validity.valueMissing) {
        showError(nameInput);
    }
    // if email is empty
    if (emailInput.validity.valueMissing) {
        showError(emailInput);
    } 
    // if email is not an email format
    else if (!isEmail(emailInput)) {
        showError(emailInput);
    }
})


// Check validity of fields on input
form.addEventListener('input', () => {
    // name not empty
    if (nameInput.validity.valid) {
        removeError(nameInput);
    }
    // email is in email format
    if (isEmail(emailInput)) {
        removeError(emailInput);
    }
})


// FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - 

function showError(input) {
    input.classList.add('not-valid');
    displayErrorIcon(input);
}

function removeError(input) {
    input.classList.remove('not-valid');
    hideErrorIcon(input);
}

function displayErrorIcon(input) {
    let formGroup = input.parentElement;
    let errorIcon = formGroup.querySelector('.form__control__error');
    errorIcon.classList.remove('hidden');
}

function hideErrorIcon(input) {
    let formGroup = input.parentElement;
    let errorIcon = formGroup.querySelector('.form__control__error');
    errorIcon.classList.add('hidden');
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value);
}

