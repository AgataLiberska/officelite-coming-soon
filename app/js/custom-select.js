// ========= CUSTOM SELECT DROPDOWN ==========================

const customSelect = document.querySelector('.custom-select');
const csIcon = document.querySelector('.custom-select__icon');
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


// FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - 

function setState(newState) {
    csState = newState;
}

function openDropdown() {
    csDropdown.classList.remove('close-dropdown');
    csDropdown.classList.add('open-dropdown');
    csDropdown.setAttribute('aria-expanded', 'true');
    csIcon.classList.add('is-open');
}

function closeDropdown() {
    csDropdown.classList.remove('open-dropdown');
    csDropdown.classList.add('close-dropdown');
    csDropdown.removeAttribute('aria-expanded');
    csIcon.classList.remove('is-open');
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
                moveFocus(currentFocus, csInput);
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

customSelect.addEventListener('focusout', e => { 
    if (!e.relatedTarget || (e.relatedTarget.tagName === 'INPUT' && e.relatedTarget !== csInput)) {
        closeDropdown();
        setState('initial');
    } 
})
