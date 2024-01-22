let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;
let startTime, endTime;
let stopClicked = false;
let timerIsRunning = false; // Track whether the timer is already running

// Timer-related functions
function startTimer() {
    // Check if the timer is already running
    if (timerIsRunning) {
        alert('Timer is already running.');
        return;
    }

    // Start the timer
    startTime = logTime();
    timer = setInterval(updateTimerDisplay, 1000);

    // Update the timerIsRunning flag
    timerIsRunning = true;
}

function stopTimer() {
    // Check if the timer is running
    if (!timerIsRunning) {
        alert('Timer is not running.');
        return;
    }

    // Stop the timer
    stopClicked = true;
    clearInterval(timer);
    endTime = logTime();

    // Update the timerIsRunning flag
    timerIsRunning = false;
}

function resetTimer() {
    // Check if the timer is running
    if (timerIsRunning) {
        alert('Stop the timer before resetting.');
        return;
    }

    // Reset the timer
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    document.getElementById('stopwatch').innerHTML = "00:00:00";

    // Update the timerIsRunning flag
    timerIsRunning = false;
}

// UI-related functions
function updateTimerDisplay() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    document.getElementById('stopwatch').innerHTML = formatTime(hours, minutes, seconds);
}

function formatTime(hours, minutes, seconds) {
    return addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
}

function addZero(time) {
    return time < 10 ? "0" + time : time;
}

// Data manipulation functions
function saveData() {
    // Check if hours, minutes, and seconds are all zero
    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('No data to save. Start the timer first.');
        return;
    }

    // Check if the timer is running
    if (!stopClicked) {
        alert('Stop the timer before saving data.');
        return;
    }

    const tableBody = document.getElementById('row-data');

    // Save the data
    const totalTime = formatTime(hours, minutes, seconds);

    // Create a new table row and append it to the table body
    const newRow = document.createElement('tr');
    
    // Create cells for each data
    const startTimeCell = document.createElement('td');
    startTimeCell.textContent = startTime;
    newRow.appendChild(startTimeCell);

    const endTimeCell = document.createElement('td');
    endTimeCell.textContent = endTime;
    newRow.appendChild(endTimeCell);

    const totalTimeCell = document.createElement('td');
    totalTimeCell.id = 'total-time';
    totalTimeCell.textContent = totalTime;
    newRow.appendChild(totalTimeCell);

    tableBody.appendChild(newRow);

    // Reset the timer and flags
    resetTimer();
    stopClicked = false;
    addTotalRow();
}

function addTotalRow() {
    const parentDiv = document.getElementById('total-row');
    parentDiv.innerHTML = ''; // Clear existing content

    // Calculate total time
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;

    document.querySelectorAll('#total-time').forEach((column) => {
        const timeValue = column.textContent.trim();
        if (timeValue !== '') {
            const [hours, minutes, seconds] = timeValue.split(':').map(Number);
            totalHours += hours;
            totalMinutes += minutes;
            totalSeconds += seconds;
        }
    });
    // Adjust for overflow
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    const totalTime = formatTime(totalHours, totalMinutes, totalSeconds);

    // Create a new row for total time
    const totalRow = document.createElement('tr');
    totalRow.id = 'total-row';
    // Create cells for total time
    const totalTimeCell = document.createElement('td');
    totalTimeCell.textContent = 'Total Time';
    totalRow.appendChild(totalTimeCell);

    const totalTimeValue = document.createElement('td');
    totalTimeValue.textContent = totalTime;
    totalRow.appendChild(totalTimeValue);
    parentDiv.appendChild(totalRow);
}

// Utility function
function logTime(){
    const date = new Date();
    let getHours = (date.getHours() % 12).toString().padStart(2, "0");
    let getMinutes = date.getMinutes().toString().padStart(2, "0");
    let getSeconds = date.getSeconds().toString().padStart(2, "0");
  
    return (`${getHours}:${getMinutes}:${getSeconds}`);
}
