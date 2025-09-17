/* import '../css/style.css'; */

const imgComputer = document.getElementById("img-computer");
if (imgComputer) {
    imgComputer.style.display = "none";
}
const imgGamer = document.getElementById("img-gamer");
if (imgGamer) {
    imgGamer.style.display = "none";
}
const imgSchnick = document.getElementById("img-persons");
if (imgSchnick) {
    imgSchnick.style.display = "block";
}


function setText(selector: string, text: string) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
}

const homeSection = document.querySelector("#home") as HTMLElement;
const gameSection = document.querySelector("#game") as HTMLElement;

const clickMeButton = document.querySelector("#btn-start");
if (clickMeButton && homeSection && gameSection) {
    clickMeButton.addEventListener('click', function () {
        homeSection.style.display = "none";
        gameSection.style.display = "grid";
    });
}

const clickMePicture = document.querySelector(".box5 img");
if (clickMePicture) {
    clickMePicture.addEventListener('click', function () {
        homeSection.style.display = "grid";
        gameSection.style.display = "none";
    });
}

const clickSymbol1 = document.querySelector("#symbol1");
const clickSymbol2 = document.querySelector("#symbol2");
const clickSymbol3 = document.querySelector("#symbol3");
const clickSymbol4 = document.querySelector("#symbol4");
const clickSymbol5 = document.querySelector("#symbol5");

setText("#resultInfo", "Es wird spannend...");

let choice;
let isGameActive = true;

function randomSymbol() {
    return Math.floor(Math.random() * 5) + 1;
}
let randomNum = randomSymbol();



function finalResult() {
    const flowers = ["🌸", "🌺", "🌻", "🌹", "🌼", "💮", "🥀", "🌷"];
    let rainInterval = setInterval(() => {
        const el = document.createElement("div");
        el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        el.style.position = "absolute";
        el.style.left = Math.random() * window.innerWidth + "px";
        el.style.top = "0px";
        el.style.color = "limegreen";
        document.body.appendChild(el);

        let pos = 0;
        const fall = setInterval(() => {
            pos += 5;
            el.style.top = pos + "px";
            if (pos > window.innerHeight) {
                el.remove();
                clearInterval(fall);
            }
        }, 50);
    }, 200);
    isGameActive = false;

    setTimeout(() => {
        clearInterval(rainInterval);
        isGameActive = true;
        setText("#userCounter", "0 / 0");
        setText("#compCounter", "0 / 0");
        const imgComputer = document.getElementById("img-computer");
        if (imgComputer) {
            imgComputer.style.display = "none";
        }
        const imgGamer = document.getElementById("img-gamer");
        if (imgGamer) {
            imgGamer.style.display = "none";
        }
        const imgSchnick = document.getElementById("img-persons");
        if (imgSchnick) {
            imgSchnick.style.display = "block";
        }
    }, 5000);

}


/* 	
        Computer
User        Stein(1)	Schere(2)	Papier(3)	Spock(4)    Echse(5)
Stein(1)	O		    +		    −	        −	        +
Schere(2)	−	        O	        +	        −	        +
Papier(3)	+	        −	        O	        +	        −
Spock(4)	+	        +	        −	        O	        −
Echse(5)	−	        −	        +	        +	        O 

User gewinnt, wenn nicht unentschieden und:
1 <--> 2 || 5
2 <--> 3 || 5
3 <--> 1 || 4
4 <--> 1 || 2
5 <--> 3 || 4

*/

function createCounter(): Counter {
    return {
        versuchUserNum: 0,
        matchUserNum: 0,
        competitionUserNum: 0,
        versuchCompNum: 0,
        matchCompNum: 0,
        competitionCompNum: 0
    };
}

let userNum: Counter = createCounter();
let compNum: Counter = createCounter();

type Counter = {
    versuchUserNum: number;
    matchUserNum: number;
    competitionUserNum: number;
    versuchCompNum: number;
    matchCompNum: number;
    competitionCompNum: number;
};

function changeCounter(object: Counter): Counter {
    if (object === userNum) {
        const imgComputer = document.getElementById("img-computer");
        if (imgComputer) {
            imgComputer.style.display = "none";
        }
        const imgGamer = document.getElementById("img-gamer");
        if (imgGamer) {
            imgGamer.style.display = "block";
        }
        const imgSchnick = document.getElementById("img-persons");
        if (imgSchnick) {
            imgSchnick.style.display = "none";
        }
        if (object.versuchUserNum < 1) {
            object.versuchUserNum += 1;
            setText("#resultInfo", "Du hast diesen Versuch gewonnen.");
        } else {
            if (object.matchUserNum < 1) {
                object.matchUserNum += 1;
                object.versuchUserNum = 0;
                setText("#resultInfo", "Du hast das Game gewonnen.");
                setText("#userCounter", `${object.matchUserNum} / ${object.competitionUserNum}`);
                compNum.versuchCompNum = 0;
                return object;
            } else {
                object.versuchUserNum = 0;
                object.matchUserNum = 0;
                object.competitionUserNum += 1;
                setText("#resultInfo", "Du hast das Match gewonnen!");
                setText("#userCounter", `${object.matchUserNum} / ${object.competitionUserNum}`);
                compNum.versuchCompNum = 0;
                compNum.matchCompNum = 0;
                if (object.competitionUserNum === 2) {
                    finalResult();
                    object.competitionUserNum = 0
                    setText("#info", "Gratulation 🌼 Du hast das Turnier gewonnen.");
                    setText("#resultInfo", "Ich glaube du schummelst.");
                }
                return object;
            }
        }
    } else {
        const imgComputer = document.getElementById("img-computer");
        if (imgComputer) {
            imgComputer.style.display = "block";
        }
        const imgGamer = document.getElementById("img-gamer");
        if (imgGamer) {
            imgGamer.style.display = "none";
        }
        const imgSchnick = document.getElementById("img-persons");
        if (imgSchnick) {
            imgSchnick.style.display = "none";
        }
        if (object.versuchCompNum < 1) {
            object.versuchCompNum += 1;
            setText("#resultInfo", "Computer hat diesen Versuch gewonnen.");
        } else {

            if (object.matchCompNum < 1) {
                object.matchCompNum += 1;
                object.versuchCompNum = 0;
                setText("#resultInfo", "Computer hat das Game gewonnen.");
                setText("#compCounter", `${object.matchCompNum} / ${object.competitionCompNum}`);
                userNum.versuchUserNum = 0;
                return object;
            } else {
                object.versuchCompNum = 0;
                object.matchCompNum = 0;
                object.competitionCompNum += 1;
                setText("#resultInfo", "Computer hat das Match gewonnen!");
                setText("#compCounter", `${object.matchCompNum} / ${object.competitionCompNum}`);
                userNum.versuchUserNum = 0;
                userNum.matchUserNum = 0;
                if (object.competitionCompNum === 2) {
                    finalResult();
                    object.competitionCompNum = 0
                    setText("#info", "Computer hat das Turnier gewonnen :-)");
                    setText("#resultInfo", "Versuche es erneut !!!");
                }
                return object;
            }
        }
    }
    return object;
}

function createInfo(choice: number, randomNum: number) {
    if ((choice === 1 && randomNum === 2) || (choice === 2 && randomNum === 1)) {
        setText("#info", "Stein macht die Schere stumpf.");
    }
    if ((choice === 1 && randomNum === 5) || (choice === 5 && randomNum === 1)) {
        setText("#info", "Stein zerquetscht Echse.");
    }
    if ((choice === 2 && randomNum === 3) || (choice === 3 && randomNum === 2)) {
        setText("#info", "Schere zerschneidet Papier.");
    }
    if ((choice === 2 && randomNum === 5) || (choice === 5 && randomNum === 2)) {
        setText("#info", "Schere köpft die Echse.");
    }
    if ((choice === 3 && randomNum === 1) || (choice === 1 && randomNum === 3)) {
        setText("#info", "Papier wickelt den Stein ein.");
    }
    if ((choice === 3 && randomNum === 4) || (choice === 4 && randomNum === 3)) {
        setText("#info", "Papier widerlegt Spock.");
    }
    if ((choice === 4 && randomNum === 1) || (choice === 1 && randomNum === 4)) {
        setText("#info", "Schere zerschneidet Papier.");
    }
    if ((choice === 4 && randomNum === 2) || (choice === 2 && randomNum === 4)) {
        setText("#info", "Spock zertrümmert Schere.");
    }
    if ((choice === 5 && randomNum === 3) || (choice === 3 && randomNum === 5)) {
        setText("#info", "Echse frisst Papier.");
    }
    if ((choice === 5 && randomNum === 4) || (choice === 4 && randomNum === 5)) {
        setText("#info", "Echse vergiftet Spock.");
    }
}

function handleChoice(choiceValue: number) {
    if (!isGameActive) return;
    choice = choiceValue;
    if (choice === randomNum) {
        console.log("Unentschieden !!!");
        setText("#info", "Unentschieden");
        setText("#resultInfo", "... aber du kannst es erneut versuchen ...");
        const imgComputer = document.getElementById("img-computer");
        if (imgComputer) {
            imgComputer.style.display = "none";
        }
        const imgGamer = document.getElementById("img-gamer");
        if (imgGamer) {
            imgGamer.style.display = "none";
        }
        const imgSchnick = document.getElementById("img-persons");
        if (imgSchnick) {
            imgSchnick.style.display = "block";
        }
        randomNum = randomSymbol();

    } else if (
        (choice === 1 && (randomNum === 2 || randomNum === 5)) ||
        (choice === 2 && (randomNum === 3 || randomNum === 5)) ||
        (choice === 3 && (randomNum === 1 || randomNum === 4)) ||
        (choice === 4 && (randomNum === 1 || randomNum === 2)) ||
        (choice === 5 && (randomNum === 3 || randomNum === 4))
    ) {
        createInfo(choice, randomNum);
        userNum = changeCounter(userNum);
        console.log("User gewinnt: " + userNum.versuchUserNum, userNum.matchUserNum, compNum.versuchCompNum, compNum.matchCompNum);
        randomNum = randomSymbol();

    } else {
        createInfo(choice, randomNum);
        compNum = changeCounter(compNum);
        console.log("Computer gewinnt: " + userNum.versuchUserNum, userNum.matchUserNum, compNum.versuchCompNum, compNum.matchCompNum);
        randomNum = randomSymbol();

    }
}

if (
    clickSymbol1 &&
    clickSymbol2 &&
    clickSymbol3 &&
    clickSymbol4 &&
    clickSymbol5
) {
    clickSymbol1.addEventListener('click', function () { handleChoice(1); });
    clickSymbol2.addEventListener('click', function () { handleChoice(2); });
    clickSymbol3.addEventListener('click', function () { handleChoice(3); });
    clickSymbol4.addEventListener('click', function () { handleChoice(4); });
    clickSymbol5.addEventListener('click', function () { handleChoice(5); });
}
