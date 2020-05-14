let time = document.querySelector("#time");
let min = document.querySelector("#minutes");
let sec = document.querySelector("#seconds");
let startButton = document.querySelector(".start-button");

let focusUp = document.querySelector(".start-button");
let focusDown = document.querySelector(".start-button");
let shortUp = document.querySelector(".start-button");
let shortDown = document.querySelector(".start-button");
let longUp = document.querySelector(".start-button");
let longDown = document.querySelector(".start-button");

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

    for (k = minVal-1; k >= 0; k--) {

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

startButton.addEventListener("click", startTime);







