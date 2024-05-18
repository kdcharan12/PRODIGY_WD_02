const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timer.textContent = formatTimer(elapsedTime);
    }, 10);

    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);

    elapsedTime = 0;
    timer.textContent = "00:00:00";

    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
    lapsContainer.innerHTML = '';
}

function formatTimer(elapsedTime) {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const mseconds = Math.floor((elapsedTime % 1000) / 10);
    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
        (mseconds > 9 ? mseconds : "0" + mseconds)
    );
}

function lapTimer() {
    if (timerInterval) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTimer(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
