// ========= CUSTOM SELECT DROPDOWN ==========================

const customSelectTrigger = document.querySelectorAll('.custom-select-trigger');
const customSelectArrow = document.querySelector('.form__control--custom-select__toggle__icon');
const customSelectDropdown = document.querySelector('.form__control--custom-select__dropdown');
const customSelectOptions = document.querySelectorAll('.form__control--custom-select__item');
const customSelectInput = document.querySelector('.form__control--custom-select__input');

customSelectOptions.forEach(option => {
    option.setAttribute('tabindex', '-1');
})

// EVENT LISTENERS - - - - - - - - - - - - - - - - - - - - - - - - 

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
            option.parentNode.querySelector('.form__control--custom-select__item.selected').classList.remove('selected');
        }
        // select clicked option
        option.classList.add('selected');
        
        // set input value to the text in selected option
        customSelectInput.value = option.textContent;

        // close dropdown
        closeDropdown()
    })
})

// FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - 

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

