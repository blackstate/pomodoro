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

let focusState = document.querySelector('div#pomState');
let shortState = document.querySelector('div#shortState');
let longState = document.querySelector('div#longState');

let a;
let running = false;
let sessions = 0;

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function changeA() {
    a = "stop";
    running = false;
}
pauseButton.addEventListener("click", () => {
    changeA();
})

async function startTime() {
    let minVal = +min.innerHTML;
    let secVal = +sec.innerHTML;

    if (running == true) {
        return;
    }

    running = true;
    
    for (k = minVal - 1; k >= 0; k--) {

        if (a != "cont" && running)
            min.innerHTML = k;
        
        if (secVal == 0) {
            minVal -= 1;
            secVal = 59;
        }
        
        for (i = secVal; i >= 0; i--) {

            if (a == "stop" && !running) {
                a = "cont";
                running = false;
                return;
            }
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
    sessions += 1;
}

// updates the innerHTML
function changeTime(element, val) {
    element.innerHTML = val;

    if (element == focusDuration) {
        if (focusState.classList.contains("selected")) {
            min.innerHTML = val;
        }
    }
    else if (element == shortDuration) {
        if (shortState.classList.contains("selected")) {
            min.innerHTML = val;
        }
    }
    else  {
        if (longState.classList.contains("selected")) {
            min.innerHTML = val;
        }
    }
    changeA();
    sec.innerHTML = "00";
}

// removes the selected class from the state box
function removeSelect() {
    let stateSelect = document.querySelector('.state.selected');
    stateSelect.classList.remove('selected');
}

// adds a class to the selected state
function selectState(state, val) {
    state.classList.add('selected');
    min.innerHTML = val;
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

// click event listeners for changing the time
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

// state event listeners to change state
focusState.addEventListener('click', () => {
    removeSelect();
    selectState(focusState, focusDurationVal);
    changeA();
    sec.innerHTML = "00";
})
longState.addEventListener('click', () => {
    removeSelect();
    selectState(longState, longDurationVal);
    changeA();
    sec.innerHTML = "00";
})
shortState.addEventListener('click', () => {
    removeSelect();
    selectState(shortState, shortDurationVal);
    changeA();
    sec.innerHTML = "00";
})

// starts time
startButton.addEventListener("click", startTime);


