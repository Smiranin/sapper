"use strict";

function initGame(rows, cols, bombs) {
    var cntRows = rows, cntCols = cols, cntBombs = bombs, cntCell = cntRows * cntCols;
    var bombsArr = randomInteger(0, cntCell - 1, cntBombs);
    var mainArr = createVirtualField();
    var field = document.getElementById('field');

    var win = cntCell - cntBombs;
//уникальные числа для массива бомб
    function randomInteger(min, max, cnt) {
        var arr = [];
        for (var i = 0; i < cnt; i++) {
            var rand = Math.floor(min + Math.random() * (max + 1 - min));
            if (inArray(arr, rand)) {
                --i;
                continue;
            }
            arr.push(rand);
        }
        return arr;
    };

    function inArray(arr, elem) {
        return arr.indexOf(elem) !== -1;
    };

//создаем виртуальное поле, чтобы в дальнейшем, чекать его значение.
//где ячейка с бомбой = -1, пустая = 0, стоящая рядом с бомбой > 0.
    function createVirtualField() {
        var arr = [];
        for (var i = 0; i < cntCell; i++) {
            arr.push(0);
        }

        for (var k = 0; k < bombsArr.length; k++) {
            var index = bombsArr[k];
            addNumbersInCell(arr, index);
            arr[index] = -1;
        }
        return arr;
    };

//добавляем цифры ячекам, находящимся рядом с бомбой
    function addNumbersInCell(arr, index) {
        //if this index isn`t in left col
        if (index % cntRows != 0) {
            filterCell(arr, index - cntRows - 1);
            filterCell(arr, index - 1);
            filterCell(arr, index + cntRows - 1);
        }//if this index isn`t in right col
        if ((index + 1) % cntRows != 0) {
            filterCell(arr, index - cntRows + 1);
            filterCell(arr, index + 1);
            filterCell(arr, index + cntRows + 1);
        }
        filterCell(arr, index - cntRows);
        filterCell(arr, index + cntRows);
    };

    function filterCell(arr, index) {
        if (index >= 0 && index < cntCell && arr[index] >= 0) {
            arr[index] += 1;
        }
    };

//создаем html поле
    function createField() {
        field.addEventListener("click", initElem);
        field.oncontextmenu = flag;
        for (var i = 0; i < cntCell; i++) {
            var divChild = document.createElement('div');
            divChild.classList.add('cover');
            divChild.classList.add('class_' + mainArr[i]);
            divChild.id = "" + i;

            field.appendChild(divChild);
        }
    };

//через event.target инициализируем еллемент.
    function initElem(e) {
        var id = +e.target.id;
        actionElem(id);
    };

    function flag(e){
        e.target.classList.toggle('flag');
        e.target.classList.toggle('cover');
        return false;
    }

    function actionElem(id) {
        if (field.children[id].check) return;
        field.children[id].classList.remove('cover');
        field.children[id].classList.remove('flag');
        if (mainArr[id] > 0) {
            win--;
            field.children[id].check = true;
            field.children[id].innerHTML = "" + mainArr[id];
            if(win == 0){gameOver(win);}
            return;
        }
        if (mainArr[id] == 0) {
            openCells(id);
        }
        if (mainArr[id] < 0) {
            gameOver();
        }
    };

    function openCells(id) {
        if (field.children[id].check) return;
        field.children[id].check = true;
        win--;
        //if this index isn`t in left col
        if (id % cntRows != 0) {
            checkCell(id - cntRows - 1);
            checkCell(id - 1);
            checkCell(id + cntRows - 1);
        }//if this index isn`t in right col
        if ((id + 1) % cntRows != 0) {
            checkCell(id - cntRows + 1);
            checkCell(id + 1);
            checkCell(id + cntRows + 1);
        }
        checkCell(id - cntRows);
        checkCell(id + cntRows);
    };

    function checkCell(id) {
        if (id >= 0 && id < cntCell && mainArr[id] >= 0) {
            field.children[id].classList.remove('cover');
            field.children[id].classList.remove('flag');
            if (mainArr[id] > 0) {
                field.children[id].innerHTML = "" + mainArr[id];
                if(!field.children[id].check){win--;};
                field.children[id].check = true;
            }
            if (mainArr[id] == 0) {
                openCells(id);
            }
        }
    };

    function gameOver(){
        for (var i = 0; i < bombsArr.length; i++) {
            var index = bombsArr[i];
            field.children[index].classList.remove('cover');
        }if(arguments.length>0){alert('Победа');}
        else{alert('Game over!');}
            reset();
    };

    createField();
};
window.onunload = senior();