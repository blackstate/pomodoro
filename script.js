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
let current = "pomodoro";

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// pause function
function changeA() {
    a = "stop";
    running = false;
}

// starts the timer
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
            await sleep(0.001);
        } 
    }
    running = false;

    endTime();
    
}

// handles notifications and automatic selecting of the next state
function endTime() {
    
    if (current == "pomodoro") {
        notifyMe("pom");
        removeSelect();
        sessions += 1;
        if (sessions % 4 == 0 && sessions != 0) {
            current = "long"
            selectState(longState, longDurationVal);
            return;
        }   
        current = "short";
        selectState(shortState, shortDurationVal);    
    }

    else if (current == "short") {
        notifyMe("short");
        removeSelect();
        selectState(focusState, focusDurationVal);
        current = "pomodoro";
    }

    else {
        notifyMe("long");
        removeSelect();
        selectState(focusState, focusDurationVal);
        current = "pomodoro";
    }
    
}
// updates the innerHTML
function changeTime(element, val) {
    element.innerHTML = val;

    if (element == focusDuration) {
        if (focusState.classList.contains("selected")) {
            min.innerHTML = val;
            changeA();
            sec.innerHTML = "00";
        }
    }
    else if (element == shortDuration) {
        if (shortState.classList.contains("selected")) {
            min.innerHTML = val;
            changeA();
            sec.innerHTML = "00";
        }
    }
    else  {
        if (longState.classList.contains("selected")) {
            min.innerHTML = val;
            changeA();
            sec.innerHTML = "00";
        }
    }

    
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

// changes the variable of the changed value
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
    current="pomodoro";
    selectState(focusState, focusDurationVal);
    changeA();
    sec.innerHTML = "00";
})
longState.addEventListener('click', () => {
    removeSelect();
    current="long";
    selectState(longState, longDurationVal);
    changeA();
    sec.innerHTML = "00";
})
shortState.addEventListener('click', () => {
    removeSelect();
    current="short";
    selectState(shortState, shortDurationVal);
    changeA();
    sec.innerHTML = "00";
})

// notification function
function notifyMe(state) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
      
      if (state == "pom") {
        var notification = new Notification("Pomodoro Timer", {
            body: `Great job focusing!\nClick me to start your break`,
            icon: "assets/icon.png",
            image: "assets/thumbs.jpg"
          })
      }
      else if (state == "short") {
        var notification = new Notification("Pomodoro Timer", {
            body: "Short break done!\nClick me to start focusing",
            icon: "assets/icon.png",
            image: "assets/short.jpg"
          })
      }
      else{
        var notification = new Notification("Pomodoro Timer", {
            body: "Long break done!\nClick me to start focusing",
            icon: "assets/icon.png",
            image: "assets/long.jpg"
          })
      }
      notification.onclick = function(event) {
        startTime();
      }
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Notification turned on");
        }
      });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  }

// starts timer
startButton.addEventListener("click", startTime);

// pause timer
pauseButton.addEventListener("click", changeA);
