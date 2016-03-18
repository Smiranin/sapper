"use strict";
var status;
var container = document.getElementById('container');

function junior(){
    status = 0;
    changeTab();
    var rows = 10, cols = 10, bombs = 10;
    newField();
    initGame(rows, cols, bombs);
};

function middle(){
    status = 1;
    changeTab();
    var rows = 16, cols = 16, bombs = 40;
    newField();
    initGame(rows, cols, bombs);
};

function senior(){
    status = 2;
    changeTab();
    var rows = 30, cols = 16, bombs = 99;
    newField();
    initGame(rows, cols, bombs);
};

function reset() {
    if(status == 0){junior();}
    if(status == 1 ){middle();}
    if(status > 1){senior();}
};

function newField(){
    var oldField = document.getElementById('field');
    var field = document.createElement('div');
    field.id = "field";
    container.replaceChild(field, oldField);

    if(status > 1){
        container.style.width = "900px";
        field.style.width = "900px";
    }if(status == 1){
        container.style.width = "480px";
        field.style.width = "480px";
    }if(status < 1){
        container.style.width = "480px";
        field.style.width = "300px";
    }
};

function changeTab(){
    var tabs = document.getElementById('tabs');
    for(var i = 0; i<3; i++){
        tabs.children[i].classList.remove('active');
    }
    tabs.children[status].className = 'active';
};

