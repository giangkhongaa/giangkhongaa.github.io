$(function () {
    var canvas = document.getElementById("canvas1");
    var context = canvas.getContext("2d");
    var width = canvas.getAttribute("width");
    var height = canvas.getAttribute("height");
    var heightPlay = height - 130;
    var sizeMonster = 80;   
    var background = new Image();

    background.onload = function () {

        context.drawImage(background, 0, 0);
    }
    background.src = "images/background.png";

    var imgPause = new Image();

    imgPause.onload = function () {

        context.drawImage(imgPause, width - 50, height - 100);
    }
    imgPause.src = "images/6f679-pause.png";

    imgMonster = new Image();

    imgMonster.onload = function () {

        Init();
    }
    imgMonster.src = "images/sea-monster.png";

    var imgBoom = new Image();
    
    imgBoom.onload = function () {

        context.drawImage(imgBoom, 0, height - 50);
    }
    imgBoom.src = "images/5DJYfQR.png";
    var monster1 = {
        x: 0,
        y: 0,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster2 = {
        x: 0,
        y: heightPlay / 2,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster3 = {
        x: 0,
        y: heightPlay,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster4 = {
        x: width / 2 - sizeMonster / 2,
        y: heightPlay,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster5 = {
        x: width - sizeMonster,
        y: heightPlay,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster6 = {
        x: width - sizeMonster,
        y: heightPlay / 2,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster7 = {
        x: width - sizeMonster,
        y: 0,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster8 = {
        x: width / 2 - sizeMonster / 2,
        y: 0,
        right: 0,
        left: 0,
        visible: false,
    };
    var monster9 = {
        x: width / 2 - sizeMonster / 2,
        y: heightPlay / 2,
        right: 0,
        left: 0,
        visible: false,
    };




    function Init() {
        context.drawImage(imgMonster, monster1.x, monster1.y);
        context.drawImage(imgMonster, monster2.x, monster2.y);
        context.drawImage(imgMonster, monster3.x, monster3.y);
        context.drawImage(imgMonster, monster4.x, monster4.y);
        context.drawImage(imgMonster, monster5.x, monster5.y);
        context.drawImage(imgMonster, monster6.x, monster6.y);
        context.drawImage(imgMonster, monster7.x, monster7.y);
        context.drawImage(imgMonster, monster8.x, monster8.y);
        context.drawImage(imgMonster, monster9.x, monster9.y);

    };
    function update() {

    };
    render();
});