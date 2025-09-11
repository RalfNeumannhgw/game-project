import '../css/style.css';

const clickMeButton = document.querySelector("#btn-start")
console.log(clickMeButton);

clickMeButton.addEventListener('click', function () {
    body.classList.toggle("dark");
})