import '../css/style.css';

const clickMeButton = document.querySelector("#btn-start");
const homeSection = document.querySelector("#home");
const gameSection = document.querySelector("#game");
console.log(clickMeButton);

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
let gameNum = 1;
let matchNum = 1;

function changeCounter(gameNum, matchNum) {
    if (gameNum === 1) {
        gameNum += 1
    } else {
        if (matchNum = 1) {
            matchNum += 1
        } else {
            gameNum = 0;
            matchNum = 0;
            console.log("alles wieder 0")
        }
    }
    console.log("game:" + gameNum, "match:" + matchNum)
}


function handleChoice(choiceValue: number) {
    choice = choiceValue;
    if (choice === randomNum) {
        console.log("Unentschieden")
        console.log("Unentschieden: " + gameNum, matchNum);
        changeCounter(gameNum, matchNum);
        console.log("Unentschieden: " + gameNum, matchNum);
        randomNum = randomSymbol();

    } else if (
        (choice === 1 && (randomNum === 2 || randomNum === 5)) ||
        (choice === 2 && (randomNum === 3 || randomNum === 5)) ||
        (choice === 3 && (randomNum === 1 || randomNum === 4)) ||
        (choice === 4 && (randomNum === 1 || randomNum === 2)) ||
        (choice === 5 && (randomNum === 3 || randomNum === 4))
    ) {
        console.log("User gewinnt!")
        console.log("User gewinnt: " + gameNum, matchNum);
        changeCounter(gameNum, matchNum);
        console.log("User gewinnt: " + gameNum, matchNum);
        randomNum = randomSymbol();

    } else {
        console.log("Computer gewinnt!");
        console.log("Computer gewinnt: "+ gameNum, matchNum);
        changeCounter(gameNum, matchNum);
        console.log("Computer gewinnt: " + gameNum, matchNum);
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
