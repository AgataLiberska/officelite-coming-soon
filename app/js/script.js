// ========= CUSTOM SELECT DROPDOWN ==========================

const customSelect = document.querySelector('.js-custom-select');
const csTrigger = document.querySelectorAll('.js-custom-select-trigger');
const csArrow = document.querySelector('.custom-select__icon');
const csDropdown = document.querySelector('.custom-select__dropdown');
const csOptions = document.querySelectorAll('.custom-select__item');
const csInput = document.querySelector('.custom-select__input');
const arOptions = Array.from(csOptions);

let csState = 'initial';

customSelect.setAttribute("role", "combobox");
customSelect.setAttribute("has-popup", "listbox");
customSelect.setAttribute("aria-owns", "custom-select-list");

csDropdown.setAttribute("role", "listbox");

csInput.setAttribute("aria-autocomplere", "list");
csInput.setAttribute("aria-controls", "custom-select-list");

csOptions.forEach(option => {
    option.setAttribute("role", "option")
    option.setAttribute("tabindex","-1");
})



// EVENT LISTENERS - - - - - - - - - - - - - - - - - - - - - - - - 

customSelect.addEventListener('click', e => {
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

customSelect.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
    } 
})

customSelect.addEventListener('keyup', e => {
    handleKeyAction(e.key);
})

document.addEventListener('click', e => {
    if (csState === 'opened' && !e.target.closest('.js-custom-select')) {
        closeDropdown();
        setState('initial');
    }
})

// FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - 

function openDropdown() {
    csDropdown.classList.remove('close-dropdown');
    csDropdown.classList.add('open-dropdown');
    csDropdown.setAttribute('aria-expanded', 'true');
    csArrow.classList.add('is-open');
}

function closeDropdown() {
    csDropdown.classList.remove('open-dropdown');
    csDropdown.classList.add('close-dropdown');
    csDropdown.removeAttribute('aria-expanded');
    csArrow.classList.remove('is-open');
}

function makeSelection(option) {
    // check that the clicked option is not selected
    if (!option.classList.contains('selected')) {
        // find the selected option and unselect
        let unselected = option.parentNode.querySelector('.custom-select__item.selected')
        unselected.classList.remove('selected');
        unselected.removeAttribute('aria-selected');
    }
    option.classList.add('selected');
    option.setAttribute('aria-selected', 'true');
    csInput.value = option.textContent;
}

function setState(newState) {
    csState = newState;
}

function findFocus() {
    const focusPoint = document.activeElement;
    return focusPoint;
}

function moveFocus(fromHere, toThere) {
    switch(fromHere) {
        case csInput:
            if (toThere === 'forward') {
                csOptions[0].focus();
            }
            else if (toThere === 'back') {
                csOptions[csOptions.length - 1].focus();
            }
            break;
        case arOptions[0] :
            if (toThere === 'forward') {
                arOptions[1].focus();
            }
            else {
                arOptions[arOptions.length -1].focus();
            }
            break;
        case arOptions[arOptions.length-1] :
            if (toThere === 'forward') {
                arOptions[0].focus() ;
            }
            else if (toThere === 'back') {
                arOptions[arOptions.length-2].focus();
            }
            break;
        default :
            const currentItem = findFocus();
            const whichOne = arOptions.indexOf(currentItem);          
            if (toThere === 'forward') {
                const nextOne = arOptions[whichOne + 1];
                nextOne.focus();
            }
            else if (toThere === 'back' && whichOne > 0) {
                const previousOne = arOptions[whichOne-1];
                previousOne.focus();
            } else {
                csInput.focus();
            }

    }
}

function handleKeyAction(key) {
    const currentFocus = findFocus();

    switch(key) {
        case 'Enter':
            // if dropdown is closed, open
            if (csState === 'initial') {
                openDropdown();
                setState('opened');
            }
            //if dropdown is opened and focus is on input, close
            else if (csState === 'opened' && currentFocus === csInput) {
                closeDropdown();
                setState('initial');
            }
            // if dropdown is opened and focus is on option, select and close
            else if (csState === 'opened' && currentFocus.tagName === 'LI') {
                makeSelection(currentFocus);
                closeDropdown();
                setState('initial');
            }
            break;
        case 'Escape' :
            if (csState === 'opened') {
                closeDropdown();
                setState('initial');
                moveFocus(currentFocus, csInput);
            }
            break;
        case 'ArrowDown' :
            if (csState === 'initial') {
                openDropdown();
                moveFocus(csInput, 'forward');
                setState('opened');
            }
            else {
                openDropdown();
                moveFocus(currentFocus, 'forward');
            }
            break;
        case 'ArrowUp' :
            if (csState === 'initial') {
                openDropdown();
                moveFocus(csInput, 'back');
                setState('opened');
            }
            else {
                moveFocus(currentFocus, 'back');
            }
            break;
        default:
            if (csState === 'initial') {
                openDropdown();
                setState('opened');
            }
    }
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

