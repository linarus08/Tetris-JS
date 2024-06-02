import * as tetris from "./tetris.js";

const btn_startGame = document.querySelector('.btn-start');
btn_startGame.addEventListener("click", ()=> {
    // старт игры
    if (btn_startGame.textContent == 'Start') {
        tetris.resetColorTable();
        btn_startGame.blur();
        btn_startGame.textContent = 'Stop';
        tetris.startGame(tetris.startGame);

    } else {
        btn_startGame.textContent = 'Start';
        window.location.reload();
    }
});

