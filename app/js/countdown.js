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

// update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000)

function updateCountdown() {
    const now = new Date();
    // time left till due date in miliseconds
    const timeLeft = dueDate - now;
    
    const seconds = Math.floor(timeLeft/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);

    const secondsLeft = seconds % 60;
    const minutesLeft = minutes % 60;
    const hoursLeft = hours % 24;

    countdownDays.innerText = days;
    countdownHours.innerText = hoursLeft;
    countdownMinutes.innerText = minutesLeft;
    countdownSeconds.innerText = secondsLeft;    

    if ( timeLeft === 0 ) {
        clearInterval(countdownInterval);
    }
}
