const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minuteDisplay = document.getElementsByClassName("minute")[0];
const secondDisplay = document.getElementsByClassName("sec")[0];
const centiSecondDisplay = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];


let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let lapItem = 0;
let centiCounter = 0;
let minInterval;
let secInterval;
let centiSecInterval;
let isReset = false;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg")
        minInterval = setInterval(() => {
            minCounter++;
            minuteDisplay.innerHTML = `${minCounter} : &nbsp;`;
        }, 60000);

        secInterval = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            secondDisplay.innerHTML = `${secCounter < 10 ? '0' : ''}${secCounter} : `;
            secCounter++;
        }, 1000);

        centiSecInterval = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecondDisplay.innerHTML = `&nbsp;${centiCounter < 10 ? '0' : ''}${centiCounter}`;
            centiCounter++;
        }, 10);
        
        isPlay = true;
        isReset = true;
       
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(minInterval);
        clearInterval(secInterval);
        clearInterval(centiSecInterval);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
}

const reset = () => {
    isReset = true;

    if (isPlay) {
        play(); // To pause the stopwatch if it's running
    }
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    secCounter = 0;
    centiCounter = 0;
    minCounter = 0;
    minuteDisplay.innerHTML = '0 : ';
    secondDisplay.innerHTML = '&nbsp;00 : ';
    centiSecondDisplay.innerHTML = '&nbsp;00';
}

const lap = () => {
    const li = document.createElement("li");
    const number= document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class","lap-item");
    number.setAttribute("class","number");
    timeStamp.setAttribute("class","time-stamp");

    number.innerText = `#${++lapItem}`;

    timeStamp.innerHTML = `${minCounter} : ${secCounter < 10 ? '0' : ''}${secCounter} : ${centiCounter < 10 ? '0' : ''}${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
}

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.add("hidden");
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);


