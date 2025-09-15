import '../css/style.css';

const clickMeButton = document.querySelector("#btn-start");
const homeSection = document.querySelector("#home");
const gameSection = document.querySelector("#game");
/* console.log(clickMeButton); */

clickMeButton.addEventListener('click', function () {
    homeSection.style.display = "none";
    gameSection.style.display = "grid";
});

const clickMePicture = document.querySelector(".box5 img");
clickMePicture.addEventListener('click', function () {
    homeSection.style.display = "grid";
    gameSection.style.display = "none";
});

const clickSymbol1 = document.querySelector("#symbol1");
const clickSymbol2 = document.querySelector("#symbol2");
const clickSymbol3 = document.querySelector("#symbol3");
const clickSymbol4 = document.querySelector("#symbol4");
const clickSymbol5 = document.querySelector("#symbol5");

let choice;

function randomSymbol() {
    return Math.floor(Math.random() * 5) + 1;
}
let randomNum = randomSymbol();

function finalResult() {
    const flowers = ["🌸","🌺","🌻","🌹","🌼","💮","🥀","🌷"];
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

    setTimeout(() => {
        clearInterval(rainInterval);
        document.querySelector("#userCounter").innerText = "0";
        document.querySelector("#compCounter").innerText = "0"
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

let userNum = {
    gameUserNum: 0,
    matchUserNum: 0,
    competitionUserNum: 0
}

let compNum = {
    gameCompNum: 0,
    matchCompNum: 0,
    competitionCompNum: 0
}

function changeCounter(object) {
    if (object === userNum) {
        if (object.gameUserNum < 1) {
            object.gameUserNum += 1;
            document.querySelector("#resultInfo").innerText = `Du hast diesen Versuch gewonnen.`;
        } else {
            if (object.matchUserNum < 1) {
                object.matchUserNum += 1;
                object.gameUserNum = 0;
                document.querySelector("#resultInfo").innerText = `Du hast das Game gewonnen.`;
                compNum.gameCompNum = 0;
                return object;
            } else {
                object.gameUserNum = 0;
                object.matchUserNum = 0;
                object.competitionUserNum += 1;
                document.querySelector("#userCounter").innerText = `${object.competitionUserNum}`;
                console.log("User hat das Spiel gewonnen")
                document.querySelector("#resultInfo").innerText = `Du hast das Match gewonnen!`;
                compNum.gameCompNum = 0;
                compNum.matchCompNum = 0;
                if (object.competitionUserNum === 2) {
                    finalResult();
                object.competitionUserNum = 0
                }
                return object;
            }
        }
    } else {
        if (object.gameCompNum < 1) {
            object.gameCompNum += 1;
            document.querySelector("#resultInfo").innerText = `Ich habe diesen Versuch gewonnen.`;
        } else {
            if (object.matchCompNum < 1) {
                object.matchCompNum += 1;
                object.gameCompNum = 0;
                document.querySelector("#resultInfo").innerText = `Ich habe das Game gewonnen.`;
                userNum.gameUserNum = 0;
                return object;
            } else {
                object.gameCompNum = 0;
                object.matchCompNum = 0;
                object.competitionCompNum += 1;
                document.querySelector("#compCounter").innerText = `${object.competitionCompNum}`;
                console.log("Computer hat das Spiel gewonnen.");
                document.querySelector("#resultInfo").innerText = `Ich habe das Match gewonnen!`;
                userNum.gameUserNum = 0;
                userNum.matchUserNum = 0;
                if (object.competitionCompNum === 2) {
                    finalResult();
                    object.competitionCompNum = 0
                }
                return object;
            }
        }
    }
    return object;
}

function createInfo(choice, randomNum) {
    if ((choice === 1 && randomNum === 2) || (choice === 2 && randomNum === 1)) {
        document.querySelector("#info").innerText = "Stein macht die Schere stumpf."; 
    }
    if ((choice === 1 && randomNum === 5) || (choice === 5 && randomNum === 1)) {
        document.querySelector("#info").innerText = "Stein zerquetscht Echse."; 
    }
    if ((choice === 2 && randomNum === 3) || (choice === 3 && randomNum === 2)) {
        document.querySelector("#info").innerText = "Schere zerschneidet Papier.";
    }
    if ((choice === 2 && randomNum === 5) || (choice === 5 && randomNum === 2)) {
        document.querySelector("#info").innerText = "Schere köpft die Echse."
    }
    if ((choice === 3 && randomNum === 1) || (choice === 1 && randomNum === 3)) {
            document.querySelector("#info").innerText = "Papier wickelt den Stein ein."
    }
    if ((choice === 3 && randomNum === 4) || (choice === 4 && randomNum === 3)) {
            document.querySelector("#info").innerText = "Papier widerlegt Spock."
    }
    if ((choice === 4 && randomNum === 1) || (choice === 1 && randomNum === 4)) {
            document.querySelector("#info").innerText = "Schere zerschneidet Papier."
    }
    if ((choice === 4 && randomNum === 2) || (choice === 2 && randomNum === 4)) {
            document.querySelector("#info").innerText = "Spock zertrümmert Schere"
    }
    if ((choice === 5 && randomNum === 3) || (choice === 3 && randomNum === 5)) {
            document.querySelector("#info").innerText = "Echse frisst Papier."
    }
    if ((choice === 5 && randomNum === 4) || (choice === 4 && randomNum === 5)) {
            document.querySelector("#info").innerText = "Echse vergiftet Spock"
    }
}

function handleChoice(choiceValue: number) {
    choice = choiceValue;
    if (choice === randomNum) {
        console.log("Unentschieden !!!");
        document.querySelector("#info").innerText = "Unentschieden !!! - Eigentlich war ich besser..."
        document.querySelector("#resultInfo").innerText = "";
        randomNum = randomSymbol();

    } else if (
        (choice === 1 && (randomNum === 2 || randomNum === 5)) ||
        (choice === 2 && (randomNum === 3 || randomNum === 5)) ||
        (choice === 3 && (randomNum === 1 || randomNum === 4)) ||
        (choice === 4 && (randomNum === 1 || randomNum === 2)) ||
        (choice === 5 && (randomNum === 3 || randomNum === 4))
    ) {
        createInfo(choice, randomNum);
        /* console.log("User gewinnt: " + userNum.gameUserNum, userNum.matchUserNum, compNum.gameCompNum, compNum.matchCompNum); */
        userNum = changeCounter(userNum);
        console.log("User gewinnt: " + userNum.gameUserNum, userNum.matchUserNum, compNum.gameCompNum, compNum.matchCompNum);
        randomNum = randomSymbol();

    } else {
        createInfo(choice, randomNum);
        /* console.log("Computer gewinnt: " + userNum.gameUserNum, userNum.matchUserNum, compNum.gameCompNum, compNum.matchCompNum); */
        compNum = changeCounter(compNum);
        console.log("Computer gewinnt: " + userNum.gameUserNum, userNum.matchUserNum, compNum.gameCompNum, compNum.matchCompNum);
        randomNum = randomSymbol();

    }
}

clickSymbol1.addEventListener('click', function () {
    handleChoice(1);
});
clickSymbol2.addEventListener('click', function () {
    handleChoice(2);
});
clickSymbol3.addEventListener('click', function () {
    handleChoice(3);
});
clickSymbol4.addEventListener('click', function () {
    handleChoice(4);
});
clickSymbol5.addEventListener('click', function () {
    handleChoice(5);
});
