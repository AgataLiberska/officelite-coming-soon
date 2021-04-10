// =========== FORM VALIDATION ====================================
// Name is required, Email is required, Email needs to be email

const form = document.querySelector('.form');
const nameInput = document.querySelector('.js-form-name');
const emailInput = document.querySelector('.js-form-email');

form.setAttribute("novalidate", "");

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

// EVENT LISTENERS - - - - - - - - - - - - - - - - - - - 

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameInput.validity.valueMissing) {
        showError(nameInput);
    }

    if (emailInput.validity.valueMissing) {
        showError(emailInput);
    } 
    else if (!isEmail(emailInput)) {
        showError(emailInput);
    }
})


form.addEventListener('input', () => {
    if (nameInput.validity.valid) {
        removeError(nameInput);
    }
    if (isEmail(emailInput)) {
        removeError(emailInput);
    }
})




