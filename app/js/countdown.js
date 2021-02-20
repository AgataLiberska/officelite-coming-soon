// ========= COUNTDOWN ==========================================
const countdownDue = document.querySelector('.js-due-date');
const countdownDays = document.querySelector('.js-days-left');
const countdownHours = document.querySelector('.js-hours-left');
const countdownMinutes = document.querySelector('.js-minutes-left');
const countdownSeconds = document.querySelector('.js-seconds-left');

// set countdown due date 30 days in the future
const dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 30);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dueYear = dueDate.getFullYear();
const dueMonth = months[dueDate.getMonth()];
const dueDay = dueDate.getDate();

const formattedDueDate = `${dueDay} ${dueMonth} ${dueYear}`;

// display due date on page
countdownDue.textContent = formattedDueDate;

// updateCountdown on page load
updateCountdown();

// update countdown every second
let countdownInterval = setInterval(updateCountdown, 1000)

function updateCountdown() {
    const now = new Date();
    // time left till due date in miliseconds
    const timeLeft = dueDate - now;

    if ( timeLeft <= 0 ) {
        clearInterval(countdownInterval);
        return;
    }
    
    let secondsLeft = Math.floor(timeLeft/1000);
    let minutesLeft = Math.floor(secondsLeft/60);
    let hoursLeft = Math.floor(minutesLeft/60);
    let daysLeft = Math.floor(hoursLeft/24);

    secondsLeft %= 60;
    minutesLeft %= 60;
    hoursLeft %= 24;

    secondsLeft < 10 ? secondsLeft = '0' + secondsLeft : secondsLeft
    minutesLeft < 10 ? minutesLeft = '0' + minutesLeft : minutesLeft
    hoursLeft < 10 ? hoursLeft = '0' + hoursLeft : hoursLeft

    countdownDays.innerText = daysLeft;
    countdownHours.innerText = hoursLeft;
    countdownMinutes.innerText = minutesLeft;
    countdownSeconds.innerText = secondsLeft;    
}
