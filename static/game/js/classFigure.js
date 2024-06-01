import { table_field } from "./main.js";
import { widthTable, heightTable, position_x, position_y } from "./consts.js";
import { nameFigure } from "./consts.js";


class Figure {

    constructor(name = nameFigure, x = position_x, y = position_y) {
        this.name = name
        this.x_1 = x;
        this.x_2 = x + 1;
        this.x_3 = x + 2;
        this.x_4 = x + 3;
        this.y_1 = y;
        this.y_2 = y + 1;
        this.y_3 = y + 2;
        this.y_4 = y + 3;
    }
}

class Square extends Figure {

    constructor(name = nameFigure[0], x, y) {
        super(name, x, y);
        this.__position = undefined
    }

    __check_coord() {
        if (this.x_1 < 0) {
            this.x_1++;
            this.x_2++;
        } else if (this.x_2 > widthTable - 1) {
            this.x_1 = widthTable - 2;
            this.x_2 = widthTable - 1;
        } else if (this.y_2 > heightTable) {
            this.y_1 = heightTable - 1;
            this.y_2 = heightTable;
        }
    }

    position() {
        this.__check_coord()
        let cells = [table_field[this.y_1][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_2][this.x_1], table_field[this.y_2][this.x_2]];
        this.__position = cells
        return cells
    }

    paintOver(color = "green") {
        this.__position.forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = color;
        })
    }

    resetColor(color) {
        this.paintOver(color)
    }
}

class Line extends Figure { 

    constructor(name = nameFigure[1], x, y) {
        super(name, x, y);
        this.__position = undefined
        this.vertically = true;
    }

    check_coord() {
        if (this.x_1 < 0) {
            this.x_1 = 0;
            this.x_2 = this.x_1 + 1;
            this.x_3 = this.x_2 + 1;
            this.x_4 = this.x_3 + 1;
        };
        if (this.vertically) {
            if (this.x_1 > widthTable - 1) {
                this.x_1 = widthTable - 1;
                this.x_2 = this.x_1 + 1;
                this.x_3 = this.x_2 + 1;
                this.x_4 = this.x_3 + 1;
            } else if (this.y_4 > heightTable) {
                this.y_4 = heightTable;
                this.y_3 = this.y_4 - 1;
                this.y_2 = this.y_3 - 1;
                this.y_1 = this.y_2 - 1;
            }
        } else {
            if (this.y_1 > heightTable) {
                this.y_1 = heightTable;
                this.y_2 = this.y_1 + 1;
                this.y_3 = this.y_2 + 1;
                this.y_4 = this.y_3 + 1;
            } else if (this.x_4 > widthTable - 1) {
                this.x_4 = widthTable - 1;
                this.x_3 = this.x_4 - 1;
                this.x_2 = this.x_3 - 1;
                this.x_1 = this.x_2 - 1;
            }
        }
    }

    position() {
        // метод формирует ячейки для таблицы
        this.check_coord()
        let cells = [];
        if (this.vertically) {
            cells = [table_field[this.y_1][this.x_1], table_field[this.y_2][this.x_1], table_field[this.y_3][this.x_1], table_field[this.y_4][this.x_1]]
        } else {
            cells = [table_field[this.y_1][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_1][this.x_3], table_field[this.y_1][this.x_4]]
        };
        this.__position = cells
        return cells
    }

    paintOver(color = "blue") {
        // метод заполняет цветом фигуру
        this.__position.forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = color;
        })
    }

    resetColor(color) {
        // метод отменяет paintOver
        this.paintOver(color)
    }
}

class RhodeIslandZ extends Figure {

    constructor(name = nameFigure[2], x, y) {
        super(name, x, y);
        this.__position = undefined
        this.vertically = true;
    }

    check_coord() {
        if (this.x_1 < 0) {
            this.x_1 = 0;
            this.x_2 = 1;
            this.x_3 = 2;
        }
        if (this.vertically) {
            if (this.x_2 > widthTable - 1) {
                this.x_1 = widthTable - 2;
                this.x_2 = widthTable - 1;
                this.x_3 = widthTable;
            } else if (this.y_3 > heightTable) {
                this.y_3 = heightTable;
                this.y_2 = heightTable - 1;
                this.y_1 = heightTable - 2;
            }
        } else {
            if (this.x_3 > widthTable - 1) {
                this.x_1 = widthTable - 3;
                this.x_2 = widthTable - 2;
                this.x_3 = widthTable - 1;
            } else if (this.y_2 > heightTable) {
                this.y_1 = heightTable - 1;
                this.y_2 = heightTable;
                this.y_3 = heightTable + 1;
            }
        }
    }

    position() {
        // метод формирует ячейки для таблицы
        this.check_coord();
        let cells = [];
        if (this.vertically) {
            cells = [table_field[this.y_1][this.x_1], table_field[this.y_2][this.x_1], table_field[this.y_2][this.x_2], table_field[this.y_3][this.x_2]]
        } else {
            cells = [table_field[this.y_2][this.x_1], table_field[this.y_2][this.x_2], table_field[this.y_1][this.x_2], table_field[this.y_1][this.x_3]]
        };
        this.__position = cells
        return cells
    }

    paintOver(color = "grey") {
        // метод заполняет цветом фигуру
        this.__position.forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = color;
        })
    }

    resetColor(color) {
        // метод отменяет paintOver
        this.paintOver(color)
    }
}

class Cleveland extends Figure {

    constructor(name = nameFigure[3], x, y) {
        super(name, x, y);
        this.__position = undefined
        

        this.vertically = true;
    }

    check_coord() {
        if (this.x_1 < 0) {
            this.x_1 = 0;
            this.x_2 = 1;
            this.x_3 = 2;
        }
        if (this.vertically) {
            if (this.x_2 > widthTable - 1) {
                this.x_1 = widthTable - 2;
                this.x_2 = widthTable - 1;
                this.x_3 = widthTable;
            } else if (this.y_3 > heightTable) {
                this.y_3 = heightTable;
                this.y_2 = heightTable - 1;
                this.y_1 = heightTable - 2;
            }
        } else {
            if (this.x_3 > widthTable - 1) {
                this.x_1 = widthTable - 3;
                this.x_2 = widthTable - 2;
                this.x_3 = widthTable - 1;
            } else if (this.y_2 > heightTable) {
                this.y_1 = heightTable - 1;
                this.y_2 = heightTable;
                this.y_3 = heightTable + 1;
            }
        }
    }

    position() {
        // метод формирует ячейки для таблицы
        this.check_coord();
        let cells = [];
        if (this.vertically) {
            cells = [table_field[this.y_2][this.x_1], table_field[this.y_3][this.x_1], table_field[this.y_2][this.x_2], table_field[this.y_1][this.x_2]]
        } else {
            cells = [table_field[this.y_1][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_2][this.x_2], table_field[this.y_2][this.x_3]]
        };
        this.__position = cells
        return cells
    }

    paintOver(color = "violet") {
        // метод заполняет цветом фигуру
        this.__position.forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = color;
        })
    }

    resetColor(color) {
        // метод отменяет paintOver
        this.paintOver(color)
    }
}

class OrangeRicky extends Figure {

    constructor(name = nameFigure[4], x, y) {
        super(name, x, y);
        this.__position = undefined;
        this.vertically = true;
        this.vertically_right = true;
        this.horizontal_up = true;
    }

    check_coord() {
        if (this.x_1 < 0) {
            this.x_1 = 0;
            this.x_2 = 1;
            this.x_3 = 2;
        }
        if (this.vertically) {
            if (this.x_3 > widthTable) {
                this.x_1 = widthTable - 2;
                this.x_2 = widthTable - 1;
                this.x_3 = widthTable;
            } else if (this.y_3 > heightTable) {
                this.y_3 = heightTable;
                this.y_2 = heightTable - 1;
                this.y_1 = heightTable - 2;
            }
        } else {
            if (this.x_3 > widthTable - 1) {
                this.x_1 = widthTable - 3;
                this.x_2 = widthTable - 2;
                this.x_3 = widthTable - 1;
            } else if (this.y_2 > heightTable) {
                this.y_1 = heightTable - 1;
                this.y_2 = heightTable - 0;
                this.y_3 = heightTable + 1;
            }
        }
    }

    position() {
        // метод формирует ячейки для таблицы
        this.check_coord();
        let cells = [];
        if (this.vertically) {
            if (this.vertically_right) {
                cells = [table_field[this.y_1][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_2][this.x_2], table_field[this.y_3][this.x_2]];
            } else {
                cells = [table_field[this.y_1][this.x_1], table_field[this.y_2][this.x_1], table_field[this.y_3][this.x_1], table_field[this.y_3][this.x_2]];
            };
        } else {
            if (this.horizontal_up) {
                cells = [table_field[this.y_2][this.x_1], table_field[this.y_2][this.x_2], table_field[this.y_2][this.x_3], table_field[this.y_1][this.x_3]];
            } else {
                cells = [table_field[this.y_2][this.x_1], table_field[this.y_1][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_1][this.x_3]];
            }
        };
        this.__position = cells
        return cells
    }

    paintOver(color = "red") {
        // метод заполняет цветом фигуру
        this.__position.forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = color;
        })
    }

    resetColor(color) {
        // метод отменяет paintOver
        this.paintOver(color)
    }
}

class BlueRicky extends Figure {

    constructor(name = nameFigure[5], x, y) {
        super(name, x, y);
        this.__position = undefined;
        this.vertically = true;
        this.vertically_right = true;
        this.horizontal_up = true
    }

    check_coord() {
        if (this.x_1 < 0) {
            this.x_1 = 0;
            this.x_2 = 1;
            this.x_3 = 2;
        }
        if (this.vertically) {
            if (this.x_3 > widthTable) {
                this.x_1 = widthTable - 2;
                this.x_2 = widthTable - 1;
                this.x_3 = widthTable;
            } else if (this.y_3 > heightTable) {
                this.y_3 = heightTable;
                this.y_2 = heightTable - 1;
                this.y_1 = heightTable - 2;
            }
        } else {
            if (this.x_3 > widthTable - 1) {
                this.x_1 = widthTable - 3;
                this.x_2 = widthTable - 2;
                this.x_3 = widthTable - 1;
            } else if (this.y_2 > heightTable) {
                this.y_1 = heightTable - 1;
                this.y_2 = heightTable - 0;
                this.y_3 = heightTable + 1;
            }
        }
    }

    position() {
        // метод формирует ячейки для таблицы
        this.check_coord();
        let cells = [];

        if (this.vertically) {
            if (this.vertically_right) {
                cells = [table_field[this.y_1][this.x_1], table_field[this.y_2][this.x_1], table_field[this.y_3][this.x_1], table_field[this.y_1][this.x_2]];
            } else {
                cells = [table_field[this.y_3][this.x_1], table_field[this.y_3][this.x_2], table_field[this.y_2][this.x_2], table_field[this.y_1][this.x_2]];
            }
        } else {
            if (this.horizontal_up) {
                cells = [table_field[this.y_1][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_1][this.x_3], table_field[this.y_2][this.x_3]];
            } else {
                cells = [table_field[this.y_1][this.x_1], table_field[this.y_2][this.x_1], table_field[this.y_2][this.x_2], table_field[this.y_2][this.x_3]];
            }
        };
        this.__position = cells
        return cells
    }

    paintOver(color = "purple") {
        // метод заполняет цветом фигуру
        this.__position.forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = color;
        })
    }

    resetColor(color) {
        // метод отменяет paintOver
        this.paintOver(color)
    }

}

class TeeWee extends Figure {

    constructor(name = nameFigure[6], x, y) {
        super(name, x, y);
        this.__position = undefined;
        this.vertically = true;
        this.vertically_right = true;
        this.horizontal_up = true
    }

    check_coord() {
        if (this.x_1 < 0) {
            this.x_1 = 0;
            this.x_2 = 1;
            this.x_3 = 2;
        }
        if (this.vertically) {
            if (this.x_3 > widthTable) {
                this.x_1 = widthTable - 2;
                this.x_2 = widthTable - 1;
                this.x_3 = widthTable;
            } else if (this.y_3 > heightTable) {
                this.y_3 = heightTable;
                this.y_2 = heightTable - 1;
                this.y_1 = heightTable - 2;
            }
        } else {
            if (this.x_3 > widthTable - 1) {
                this.x_1 = widthTable - 3;
                this.x_2 = widthTable - 2;
                this.x_3 = widthTable - 1;
            } else if (this.y_2 > heightTable) {
                this.y_1 = heightTable - 1;
                this.y_2 = heightTable - 0;
                this.y_3 = heightTable + 1;
            }
        }
    }

    position() {
        // метод формирует ячейки для таблицы
        this.check_coord();
        let cells = [];
        if (this.vertically) {
            if (this.vertically_right) {
                cells = [table_field[this.y_1][this.x_1], table_field[this.y_2][this.x_1], table_field[this.y_3][this.x_1], table_field[this.y_2][this.x_2]];
            } else {
                cells = [table_field[this.y_2][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_2][this.x_2], table_field[this.y_3][this.x_2]];
            }
        } else {
            if (this.horizontal_up) {
                cells = [table_field[this.y_1][this.x_1], table_field[this.y_1][this.x_2], table_field[this.y_1][this.x_3], table_field[this.y_2][this.x_2]];
            } else {
                cells = [table_field[this.y_2][this.x_1], table_field[this.y_2][this.x_2], table_field[this.y_2][this.x_3], table_field[this.y_1][this.x_2]];
            }
        };
        this.__position = cells
        return cells
    }

    paintOver(color = "maroon") {
        // метод заполняет цветом фигуру
        this.__position.forEach((value) => {
            let nameClass = `.cell.${value}`;
            document.querySelector(nameClass).style.background = color;
        })
    }

    resetColor(color) {
        // метод отменяет paintOver
        this.paintOver(color)
    }

}

export { Line, Square, RhodeIslandZ, Cleveland, OrangeRicky, BlueRicky, TeeWee, }