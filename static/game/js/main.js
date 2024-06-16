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
}

const pointsCell = $('body>section>div>input[type=text]:nth-child(2)')

startGame.addEventListener("click", (e) => {
    // старт игры
    flag_2 = true
    e.preventDefault();
    if (pointsCell && timer) {
        interval = setInterval(updateTime, 1000);
        const pointsCell = document.querySelector('body > section > div > input[type=text]:nth-child(2)');
        pointsCell.setAttribute('value', 0);
        timer.setAttribute('value', '00:00:00');

    };
    tetris.resetColorTable();
    startGame.blur();
    tetris.startGame(tetris.startGame);
    startGame.setAttribute('disabled', true);
    stopGame.removeAttribute("disabled");
    const dataPointsCell = $('#id_points_per_game');
    dataPointsCell.attr('value', 0);
    
});

stopGame.addEventListener("click", (e) => {
    // остановка игры
    e.preventDefault();
    if (pointsCell && timer) {
        clearInterval(interval);
        seconds = 0;
        minutes = 0;
        hours = 0;
    }
    flag_2 = false;
    startGame.removeAttribute("disabled");
    stopGame.setAttribute('disabled', true);
});

$(document).ready(function () {
    if ($('id_points_per_game')) {
        $('.btn-stop').click(function (e) {
            e.preventDefault();
            // const userId = $('#id_username').attr('value');
            const userId = $('#id_username').attr('value');
            const time = $('#id_time_game').attr('value');
            const points = $('#id_points_per_game').attr('value');
            const name = $('')
            console.log(name, time, points);
            $.ajax({
                url: 'http://127.0.0.1:8000/',
                type: 'GET',
                data: {
                user_id: userId,
                time: time,
                points: points
                },
                success: function (data) {
                    alert(data.res);
                }
            })
        })
    }
});

export { flag_2, interval }