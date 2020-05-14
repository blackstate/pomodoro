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

let minVal = +min.innerHTML;
let secVal = +sec.innerHTML;
let running = false;

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

function changeTime(element, val) {
    element.innerHTML = val;
}

function focusChange(command) {
    if (command == true) {
        if (focusDurationVal == 60) {
            return;
        }
        focusDurationVal += 1;
    }

    else {
        if(focusDurationVal == 1) {
            return;
        }
        focusDurationVal -= 1;
    }
    console.log(focusDurationVal);
}

function shortChange(command) {
    if (command == true) {
        if (shortDurationVal == 60) {
            return;
        }
        shortDurationVal += 1;
    }

    else {
        if(shortDurationVal == 1) {
            return;
        }
        shortDurationVal -= 1;
    }
    console.log(shortDurationVal);
}
function longChange(command) {
    if (command == true) {
        if (longDurationVal == 60) {
            return;
        }
        longDurationVal += 1;
    }

    else {
        if(longDurationVal == 1) {
            return;
        }
        longDurationVal -= 1;
    }
    console.log(longDurationVal);
}

focusUp.addEventListener("click", () => {
    focusChange(true);
    changeTime(focusDuration, focusDurationVal);
})

focusDown.addEventListener("click", () => {
    focusChange(false);
    changeTime(focusDuration, focusDurationVal);
})

shortUp.addEventListener("click", () => {
    shortChange(true);
    changeTime(shortDuration, shortDurationVal);
})

shortDown.addEventListener("click", () => {
    shortChange(false);
    changeTime(shortDuration, shortDurationVal);
})

longUp.addEventListener("click", () => {
    longChange(true);
    changeTime(longDuration, longDurationVal);

})

longDown.addEventListener("click", () => {
    longChange(false);
    changeTime(longDuration, longDurationVal);
})

startButton.addEventListener("click", startTime);








