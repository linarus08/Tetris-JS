import * as tetris from "./tetris.js";

const btn_startGame = document.querySelector('.btn-start');
let flag_2 = true

btn_startGame.addEventListener("click", () => {
    // старт игры
    if (btn_startGame.textContent == 'Start') {
        flag_2 = true
        $('.btn-start').click(function (e) {
            e.preventDefault();
        });
        tetris.resetColorTable();
        btn_startGame.blur();
        btn_startGame.textContent = 'Stop';
        btn_startGame.setAttribute('type', 'submit')
        tetris.startGame(tetris.startGame);

    } else {
        flag_2 = false;
        $('.btn-start').submit(function (e) {
            $.ajax({
                data: $(this).serialize(),
                dataType: 'json',
                type: "POST",
                url: "",
                success: function (response) {
                    alert("Результаты игры сохранены");
                    console.log($(this).serialize());
                },
                error: function(response) {
                    alert(response.responseJSON.errors);
                    console.log(response.responseJSON.errors)
                }
            });
            console.log('123456');
            e.preventDefault();
        });
        btn_startGame.textContent = 'Start';
        btn_startGame.setAttribute('type', 'button')
        const pointsCell = document.querySelector('body > section > div > input[type=text]:nth-child(2)');
        pointsCell.setAttribute('value', 0);
        const dataPointsCell = document.querySelector('#id_points_per_game');
        dataPointsCell.value = 0;
    }
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

export { flag_2 }