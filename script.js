let time = document.querySelector("#time");
let min = document.querySelector("#minutes");
let sec = document.querySelector("#seconds");
let startButton = document.querySelector(".start-button");
let pauseButton = document.querySelector(".pause-button");

//Adjustable Timer
let focusUp = document.querySelector("#focusUp");
let focusDown = document.querySelector("#focusDown");
let shortUp = document.querySelector("#shortUp");
let shortDown = document.querySelector("#shortDown");
let longUp = document.querySelector("#longUp");
let longDown = document.querySelector("#longDown");

let focusDuration = document.querySelector("#focusMin");
let shortDuration = document.querySelector("#shortMin");
let longDuration = document.querySelector("#longMin");

let focusDurationVal = +focusDuration.innerHTML;
let shortDurationVal = +shortDuration.innerHTML;
let longDurationVal = +longDuration.innerHTML;

let pomState = document.querySelector('div#pomState');
let shortState = document.querySelector('div#shortState');
let longState = document.querySelector('div#longState');

let minVal = +min.innerHTML;
let secVal = +sec.innerHTML;

let running = false;

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTime() {

    if (running == true) {
        return;
    }

    running = true;

    for (k = minVal - 1; k >= 0; k--) {

        min.innerHTML = k;
        if (secVal == 0) {
            minVal -= 1;
            secVal = 59;
        }
        
        for (i = secVal; i >= 0; i--) {

            if (i >= 0 && i < 10) {
                sec.innerHTML = "0" + i;
            }
            else {
                sec.innerHTML = i;
            }
            document.title = `${k}:${i} Time to focus!`
            await sleep(1000);
        } 
    }
    running = false;
}

// updates the innerHTML
function changeTime(element, val) {
    element.innerHTML = val;
}

// removes the selected class from the state box
function removeSelect() {
    let stateSelect = document.querySelector('.state.selected');
    stateSelect.classList.remove('selected');
}

// adds a class to the selected state
function selectState(state) {
    state.classList.add('selected');
}

function changeMin (command, time) {
    let t;
    if (time == "focus")
        t = focusDurationVal;
    else if (time == "short")
        t = shortDurationVal;
    else
        t = longDurationVal;

    if (command == true) {
        if (t == 60) {
            return;
        }
        t += 1;
    }
    else {
        if(t == 1) {
            return;
        }
        t -= 1;
    }

    if (time == "focus")
        focusDurationVal = t;
    else if (time == "short")
        shortDurationVal = t;
    else
        longDurationVal = t;
}

focusUp.addEventListener("click", () => {
    changeMin(true, "focus");
    changeTime(focusDuration, focusDurationVal);
})
focusDown.addEventListener("click", () => {
    changeMin(false, "focus");
    changeTime(focusDuration, focusDurationVal);
})
shortUp.addEventListener("click", () => {
    changeMin(true, "short");
    changeTime(shortDuration, shortDurationVal);
})
shortDown.addEventListener("click", () => {
    changeMin(false, "short");
    changeTime(shortDuration, shortDurationVal);
})
longUp.addEventListener("click", () => {
    changeMin(true, "long");
    changeTime(longDuration, longDurationVal);

})
longDown.addEventListener("click", () => {
    changeMin(false, "long");
    changeTime(longDuration, longDurationVal);
})


pomState.addEventListener('click', () => {
    removeSelect();
    selectState(pomState);
})
longState.addEventListener('click', () => {
    removeSelect();
    selectState(longState);
})
shortState.addEventListener('click', () => {
    removeSelect();
    selectState(shortState);
})

startButton.addEventListener("click", startTime);



