import { Line, Square, RhodeIslandZ, Cleveland, OrangeRicky, BlueRicky, TeeWee } from './classFigure.js';
import { nameFigure, position_x, position_y, widthTable, heightTable } from './consts.js';

let color_playing_field = getComputedStyle(document.documentElement).getPropertyValue('--color-playing-field');
let childNodes = document.querySelector('.playing-field').childNodes;
let arrFixedCell = []; // массив для добавления ячеек
// let childElementCount = document.querySelector('.playing-field').childElementCount;

function getAllClassName(arr) {
    // получить список классов = 200 (от A1 до J20)
    let arr_class_name = [];
    for (let key in arr) {
        let nameClassCell = arr[key].className;
        nameClassCell = (String(nameClassCell).split(' '))[1];
        if (nameClassCell != undefined) {
            arr_class_name.push(nameClassCell);
        };
    };
    return arr_class_name
};

let allClassName = getAllClassName(childNodes); // список классов тегов

function getTable(allClassName) {
    // создать объект (ключ = номер строки поля, значение = массив с именами классов тегов)
    let table = {};
    for (let i = 1; i < 21; i++) {
        let arr_lines = [];
        for (let j = 0; j < widthTable; j++) {
            arr_lines.push(allClassName.shift());
        };
        table[i] = arr_lines;
    };
    return (table)
};

let table_field = getTable(allClassName); // таблица в ввиде объекта

function resetColorTable() {
    for (const key in table_field) {
        table_field[key].forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = 'rgb(0, 255, 0)';
            arrFixedCell = [];
        })
    }
};

function reversTable(table_field) {
    // клонировать таблицу и перевернуть ее
    let cloneTableField = {};
    for (let key in table_field) {
        cloneTableField[key] = table_field[key];
    }

    let count = Object.keys(table_field).length;
    for (let row in table_field) {
        cloneTableField[count] = table_field[row]
        count--;
    }
    return cloneTableField;
}

const reverseTableField = reversTable(table_field); // таблица перевернута

let randomObj = () => {
    // возвращает случайную фигуру
    let lstFigure = [Line, Square, RhodeIslandZ, Cleveland, OrangeRicky, BlueRicky, TeeWee];
    let randElement = Math.floor(Math.random() * lstFigure.length);
    let figure = new lstFigure[randElement];
    return figure
};


function fixedFigure(position) {
    // добавить в массив ячейки для фиксации фигуры на поле, в таблице закрасить ячейки фигуры в черный цвет
    position.forEach((value) => {
        let nameClass = `.cell.${value}`;
        document.querySelector(nameClass).style.background = 'rgb(24, 25, 27)';
        arrFixedCell.indexOf(value) === -1 ? arrFixedCell.push(value) : {}; // добавить только в случае если нет в массиве
    })
};

function overwriteColors(arrFixedCell) {
    // очистить массив arrFixedCell и по новой записать ячейки с черными цветами
    arrFixedCell = []
    for (let i in reverseTableField) {
        reverseTableField[i].forEach((element) => {
            let nameClass = `.cell.${element}`;
            let cell = document.querySelector(nameClass);
            let style = window.getComputedStyle(cell);
            let background = style.getPropertyValue('background-color');
            if (background == 'rgb(24, 25, 27)') {
                arrFixedCell.indexOf(element) === -1 ? arrFixedCell.push(element) : {};
            }
        })
    };
    return arrFixedCell
};

function searchFixedCell(position) {
    // искать в массиве для фиксации ячейки совпадающие с ячейками фигуры
    let result = false;
    position.forEach((value) => {
        if (arrFixedCell.includes(value)) {
            result = true;
        }
    });
    return result
};

function checkPossibilityOfMove(obj) {
    // проверить есть ли возможность хода при появления фигуры
    if (searchFixedCell(obj.position())) {
        console.log('конец');
        return false
    } else {
        return true
    }
};

function moveLinesDown(lstColors, count) {
    // строку полностью черного цвета перекрасить цветами из строки выше
    for (let cell of reverseTableField[count]) {
        let nameClass = `.cell.${cell}`;
        document.querySelector(nameClass).style.background = lstColors.shift();
    }
}

function check_color_in_arr(lstColors) {
    lstColors.forEach((value) => {
        if (value == "rgb(0, 255, 0)") {
            return false;
        }
        return true;
    })
}

function findRowsWhereCellsFixed() {
    // поиск строки у которой все ячейки зафиксированы (закрашены в черный цвет) > перенос цветов из строки выше на текущую строку
    for (let row in reverseTableField) {
        let colorBlack = true;
        for (let element of reverseTableField[row]) {
            let nameClass = `.cell.${element}`;
            let cell = document.querySelector(nameClass);
            let style = window.getComputedStyle(cell);
            let background = style.getPropertyValue('background-color');
            if (background == "rgb(0, 255, 0)") {
                // если в строке найдена хотя бы одна ячейка не черного цвета, переходим к строке выше
                colorBlack = false
                break
            }
        };
        if (colorBlack) {
            // если у строки все ячейки черного цвета,
            let lstColors = [];
            let count = Number(row);
            addPointsInput();
            while (count < Object.keys(reverseTableField).length) {
                // пока строка не дойдет до конца таблицы (получает света строки выше и переносим ее цвета на текущую строку)
                for (let element of reverseTableField[count + 1]) {
                    // получить все цвета ячеек из строки следующей за текушей строкой
                    let nameClass = `.cell.${element}`;
                    let cell = document.querySelector(nameClass);
                    let style = window.getComputedStyle(cell);
                    let background = style.getPropertyValue('background-color');
                    lstColors.push(background);
                }
                moveLinesDown(lstColors, count); // перекрашивание текущей строки цветами из строки что выше
                count++
                
            };
            if (check_color_in_arr) {
                findRowsWhereCellsFixed();
            };
            arrFixedCell = overwriteColors(arrFixedCell);
            lstColors = [];
        }
    }
};

function addPointsInput() {
    // в поле добавить очки
    let points = document.querySelector('body > section > div > input[type=text]:nth-child(2)');
    const amountOfPoints = String(Number(points.value) + 200);
    points.setAttribute('value', amountOfPoints);
}


async function startGame(callback) {
    // основная функция запускает игру (старт)
    let flag = true;
    let ms_ = 400;
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let obj = randomObj();
    obj.position();
    obj.paintOver();

    async function stepDown() {
        let i = 0;
        document.addEventListener('keydown', function (event) {
            // обработчик событий
            obj.resetColor(color_playing_field);
            if (event.code == 'ArrowDown') {
                obj.y_1++;
                obj.y_2++;
                obj.y_3++;
                obj.y_4++;
                i++;
                if (searchFixedCell(obj.position())) {
                    obj.y_1--;
                    obj.y_2--;
                    obj.y_3--;
                    obj.y_4--;
                }
            } else
                if (event.code == 'ArrowRight') {
                    obj.x_1++;
                    obj.x_2++;
                    obj.x_3++;
                    obj.x_4++;
                    if (searchFixedCell(obj.position())) {
                        obj.x_1--;
                        obj.x_2--;
                        obj.x_3--;
                        obj.x_4--;
                    }
                } else if (event.code == 'ArrowLeft') {
                    obj.x_1--;
                    obj.x_2--;
                    obj.x_3--;
                    obj.x_4--;
                    if (searchFixedCell(obj.position())) {
                        obj.x_1++;
                        obj.x_2++;
                        obj.x_3++;
                        obj.x_4++;
                    }
                } else if (event.code == 'Space') {
                    if (obj.name == 'I') {
                        if (obj.vertically) {
                            obj.x_1--;
                            obj.x_2--;
                            obj.x_3--;
                            obj.x_4--;
                            obj.y_1++;
                            obj.y_2++;
                            obj.y_3++;
                            obj.y_4++;
                            obj.vertically = false
                        } else {
                            obj.x_1++;
                            obj.x_2++;
                            obj.x_3++;
                            obj.x_4++;
                            obj.y_1--;
                            obj.y_2--;
                            obj.y_3--;
                            obj.y_4--;
                            obj.vertically = true
                        };
                        if (searchFixedCell(obj.position())) {
                            if (obj.vertically) {
                                obj.x_1--;
                                obj.x_2--;
                                obj.x_3--;
                                obj.x_4--;
                                obj.y_1++;
                                obj.y_2++;
                                obj.y_3++;
                                obj.y_4++;
                                obj.vertically = false
                            } else {
                                obj.x_1++;
                                obj.x_2++;
                                obj.x_3++;
                                obj.x_4++;
                                obj.y_1--;
                                obj.y_2--;
                                obj.y_3--;
                                obj.y_4--;
                                obj.vertically = true
                            };
                        };
                    } else if (obj.name == 'S' || obj.name == 'Z') {
                        if (obj.vertically) {
                            obj.vertically = false
                        } else {
                            obj.vertically = true
                        };
                        if (searchFixedCell(obj.position())) {
                            if (obj.vertically) {
                                obj.vertically = false
                            } else {
                                obj.vertically = true
                            };
                        };
                    } else if (obj.name == 'L' || obj.name == 'J' || obj.name == 'T') {
                        if (obj.vertically) {
                            if (obj.vertically_right) {
                                obj.vertically_right = false;
                            } else {
                                obj.vertically_right = true
                            };
                            obj.vertically = false
                        } else {
                            if (obj.horizontal_up) {
                                obj.horizontal_up = false;
                            } else {
                                obj.horizontal_up = true
                            };
                            obj.vertically = true
                        };
                        if (searchFixedCell(obj.position())) {
                            if (obj.vertically) {
                                if (obj.vertically_right) {
                                    obj.vertically_right = false;
                                } else {
                                    obj.vertically_right = true
                                };
                                obj.vertically = false
                            } else {
                                if (obj.horizontal_up) {
                                    obj.horizontal_up = false;
                                } else {
                                    obj.horizontal_up = true
                                };
                                obj.vertically = true
                            };
                        }
                    }
                };
            obj.position();
            obj.paintOver();
        });
        while (i < heightTable) {
            await sleep(ms_);
            if (!checkPossibilityOfMove(obj) && i == 0) {

                flag = false;
            }
            if (flag) {
                obj.resetColor(color_playing_field);
                obj.y_1++;
                obj.y_2++;
                obj.y_3++;
                obj.y_4++;
                if (searchFixedCell(obj.position())) {
                    obj.y_1--;
                    obj.y_2--;
                    obj.y_3--;
                    obj.y_4--;
                    fixedFigure(obj.position());
                    obj.position();
                    obj.paintOver();
                    break
                }
                obj.paintOver();
            } else {
                break
            };
            i++
        };
        fixedFigure(obj.position());
        findRowsWhereCellsFixed();
    };
    await stepDown();
    obj = null;
    if (flag) {
        callback(startGame)
    } else {
        alert('Игра законцена.')
        const buttonStart = document.querySelector('.btn-start');
        buttonStart.innerHTML = 'Start';
        return
    }
};


export { table_field, startGame, searchFixedCell, resetColorTable }