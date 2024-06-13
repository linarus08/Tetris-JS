import * as tetris from "./tetris.js";

const startGame = document.querySelector('.btn-start');
const stopGame = document.querySelector('.btn-stop');
let flag_2 = true

let timer = document.querySelector('#timer');
let timerData = document.querySelector('#id_time_game');


let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

function updateTime() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }
    timer.setAttribute('value', `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    timerData.setAttribute('value', `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    console.log(timer);
}


startGame.addEventListener("click", (e) => {
    // старт игры
    flag_2 = true
    e.preventDefault();

    interval = setInterval(updateTime, 1000);
    tetris.resetColorTable();
    startGame.blur();
    tetris.startGame(tetris.startGame);
    startGame.setAttribute('disabled', true);
    stopGame.removeAttribute("disabled");
});

stopGame.addEventListener("click", (e) => {
    // остановка игры
    e.preventDefault();
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer.setAttribute('value', '00:00:00');
    flag_2 = false;

    const userName = $('#id_username').attr('value');
    const points = $('#id_points_per_game').attr('value');
    const time = $('#id_time_game').attr('value');
    const pointsCell = document.querySelector('body > section > div > input[type=text]:nth-child(2)');
    pointsCell.setAttribute('value', 0);
    const dataPointsCell = document.querySelector('#id_points_per_game');
    dataPointsCell.value = 0;
    startGame.removeAttribute("disabled");
    stopGame.setAttribute('disabled', true);
});

// $(document).ready(function () {
//     $('.btn-start').submit(function (e) {
//         e.preventDefault();
//         const textCommand = document.querySelector('.btn-start');
//         console.log(textCommand);
//         if (textCommand.innerHTML == 'Stop') {
//             console.log('Стоп');
//             $.ajax({
//                 data: $(this).serialize(),
//                 type: $(this).attr('method'),
//                 url: '',
//                 success: function (response) {
//                     alert("Результаты игры сохранены");
//                 }
//             })
//         }
//     })
// });

export { flag_2, interval }