const FPS = 60;
const TICKS = 1000 / FPS;

var score = 0;

var monsterWidth = 70;
var monsterHeight = 70;
var running = true;
var heart = 3;
var end = false;
var highScore = 0;
var speed = 2;
var movingRight = 0;
var movingLeft = 0;
var movingBottom = 0;
var movingTop = 0;
var flagMove = 0;
var flagHeart = false;
var boomNum = 3;
//Init High Score
if (sessionStorage.getItem("highscore") == null) {
    sessionStorage.setItem("highscore", 0);
} else {
    highScore = sessionStorage.getItem("highscore");
}

/*Declare and initiate monster attributes */
var monster1 = {
    initX: 0,
    initY: 0,
    x: 0,
    y: 0,
    toX: 100,
    toY: 100,
    initToX: 100,
    initToY: 100,
    visible: true
};
var monster2 = {
    initX: 170,
    initY: 0,
    x: 170,
    y: 0,
    toX: 170,
    toY: 100,
    initToX: 170,
    initToY: 100,
    visible: true
}

var monster3 = {
    initX: 300,
    initY: 0,
    x: 300,
    y: 0,
    toX: 200,
    toY: 100,
    initToX: 200,
    initToY: 100,

    visible: true
};

var monster4 = {
    initX: 0,
    initY: 200,
    x: 0,
    y: 200,
    toX: 100,
    toY: 200,
    initToX: 100,
    initToY: 200,

    visible: true
};

var monster5 = {
    initX: 330,
    initY: 200,
    x: 330,
    y: 200,
    toX: 230,
    toY: 200,
    initToX: 230,
    initToY: 200,

    visible: true
}

var monster6 = {
    initX: 0,
    initY: 400,
    x: 0,
    y: 400,
    toX: 100,
    toY: 300,
    initToX: 100,
    initToY: 300,
    visible: true
};

var monster7 = {
    initX: 150,
    initY: 400,
    x: 150,
    y: 400,
    toX: 150,
    toY: 300,
    initToX: 150,
    initToY: 300,
    visible: true
};

var monster8 = {
    initX: 330,
    initY: 400,
    x: 330,
    y: 400,
    toX: 230,
    toY: 300,
    initToX: 230,
    initToY: 300,
    visible: true
};
var monster9 = {
    initX: 150,
    initY: 200,
    x: 150,
    y: 200,
    visible: true
};

//Declare Main Canvas
mainCanvas = document.getElementById("mainCanvas");
ctx = mainCanvas.getContext("2d");

//Declare Footer Canvas
footerCanvas = document.getElementById("footerCanvas");
ctxFooter = footerCanvas.getContext("2d");

//Main Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
}
bgImage.src = "images/Under-The-Sea.jpg";

//Footer Background
var bgFooterReady = false;
var bgFooterImage = new Image();
bgFooterImage.onload = function () {
    bgFooterReady = true;
}
bgFooterImage.src = "images/bg_footer.jpg";

//Heart
var heartReady = false;
var heartImage = new Image();
heartImage.onload = function () {
    heartReady = true;
}
heartImage.src = "images/heart.png";

//Bom
var boomReady = false;
var boomImage = new Image();
boomImage.onload = function () {
    boomReady = true;
}
boomImage.src = "images/boom.png";

//Monster
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
}
monsterImage.src = "images/sea-monster.png";



//Pause
var pauseReady = false;
var pauseImage = new Image();
pauseImage.onload = function () {
    pauseReady = true;
}
pauseImage.src = "images/pause.png";

//Restart
var resetReady = false;
var resetImage = new Image();
resetImage.onload = function () {
    resetReady = true;
}
resetImage.src = "images/reset.gif";

//Add Event for objects
mainCanvas.addEventListener("click", function (e) {
    var xPosition = e.pageX - this.offsetLeft;
    var yPosition = e.pageY - this.offsetTop;
    flagHeart = false;
    heart--;
    if (monster1.visible) {
        clickMonster(xPosition, yPosition, monster1);
    }
    if (monster2.visible) {
        clickMonster(xPosition, yPosition, monster2);
    }
    if (monster3.visible) {
        clickMonster(xPosition, yPosition, monster3);
    }
    if (monster4.visible) {
        clickMonster(xPosition, yPosition, monster4);
    }
    if (monster5.visible) {
        clickMonster(xPosition, yPosition, monster5);
    }
    if (monster6.visible) {
        clickMonster(xPosition, yPosition, monster6);
    }
    if (monster7.visible) {
        clickMonster(xPosition, yPosition, monster7);
    }
    if (monster8.visible) {
        clickMonster(xPosition, yPosition, monster8);
    }
    if (monster9.visible) {
        clickMonster(xPosition, yPosition, monster9);
    }
    if (xPosition >= 350 && xPosition <= 400 && yPosition >= 2 && yPosition <= 52) {
        console.log(xPosition);
        console.log(yPosition);
        boomDie();
    }
});



//Add callback event when having perfectly click on monster.
function clickMonster(currX, currY, monster) {
    if (currX >= monster.x && currX <= monster.x + 70 && currY >= monster.y && currY <= monster.y + 70) {
        score += 10*speed;
        if (!flagHeart) {
            heart++;
        }
        flagHeart = true;
        monster.visible = false;
        monster.x = monster.initX;
        monster.y = monster.initY;
        monster.toX = monster.initToX;
        monster.toY = monster.initToY;
        ShowMonster();
    }
}

function ShowMonster() {
    if (!monster1.visible) {
        monster1.visible = true;
    }
    if (!monster2.visible) {
        monster2.visible = true;
    }
    if (!monster3.visible) {
        monster3.visible = true;

    }
    if (!monster4.visible) {
        monster4.visible = true;
    }

    if (!monster5.visible) {
        monster5.visible = true;
    }

    if (!monster6.visible) {
        monster6.visible = true;
    }

    if (!monster7.visible) {
        monster7.visible = true;
    }

    if (!monster8.visible) {
        monster8.visible = true;
    }

    if (!monster9.visible) {
        monster9.visible = true;
    }

}

//Draw objects to mainCanvas.
//Include backgroud, monsters, blood stains, control buttons.
function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, 400, 470);
    }

    if (monsterReady) {
        if (monster1.visible)
            ctx.drawImage(monsterImage, monster1.x, monster1.y, 70, 70);
        if (monster2.visible)
            ctx.drawImage(monsterImage, monster2.x, monster2.y, 70, 70);
        if (monster3.visible)
            ctx.drawImage(monsterImage, monster3.x, monster3.y, 70, 70);
        if (monster4.visible)
            ctx.drawImage(monsterImage, monster4.x, monster4.y, 70, 70);
        if (monster5.visible)
            ctx.drawImage(monsterImage, monster5.x, monster5.y, 70, 70);
        if (monster6.visible)
            ctx.drawImage(monsterImage, monster6.x, monster6.y, 70, 70);
        if (monster7.visible)
            ctx.drawImage(monsterImage, monster7.x, monster7.y, 70, 70);
        if (monster8.visible)
            ctx.drawImage(monsterImage, monster8.x, monster8.y, 70, 70);
        if (monster9.visible)
            ctx.drawImage(monsterImage, monster9.x, monster9.y, 70, 70);
    }


    ctx.fillStyle = "#FFF";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.textBaseLine = "top";
    ctx.fillText(boomNum, 330, 32);

    if (boomReady) {
        ctx.drawImage(boomImage, 350, 2, 50, 50);
    }

    ctx.fillStyle = "#e8c53c";
    ctx.font = "24px Myriad Pro";
    ctx.textAlign = "left";
    ctx.textBaseLine = "top";
    ctx.fillText("Điểm: " + score, 32, 32);

    if (bgFooterReady) {
        ctxFooter.drawImage(bgFooterImage, 0, 0, 500, 100);
    }

    if (pauseReady) {
        ctxFooter.drawImage(pauseImage, 0, 50, 50, 50);
    }

    if (resetReady) {
        ctxFooter.drawImage(resetImage, 60, 50, 50, 50);
    }

    if (heartReady) {
        var xHeart = 220;
        for (hi = 1; hi <= heart; hi++) {
            ctxFooter.drawImage(heartImage, xHeart, 50, 50, 50);
            xHeart += 50;
        }
    }
    // text highScore
    highScore = sessionStorage.getItem("highscore");
    ctxFooter.fillStyle = "#56aaff";
    ctxFooter.font = "13pt Myriad Pro";

    ctxFooter.fillText("High Score: " + highScore, 0, 35);
    // text heart
    ctxFooter.fillStyle = "#56aaff";
    ctxFooter.font = "15pt Myriad Pro";
    ctxFooter.fillText("Heart: ", 150, 85);
    // text level
    ctxFooter.fillStyle = "#56aaff";
    ctxFooter.font = "15pt Myriad Pro";
    ctxFooter.fillText("Level: ", 150, 35);
    if (speed == 5) {
        ctxFooter.beginPath();
        ctxFooter.arc(360, 30, 22, 0, 2 * Math.PI);
        ctxFooter.fillStyle = '#3cea3c';
        ctxFooter.fill();
        ctxFooter.stroke();
    }
    else {
        ctxFooter.beginPath();
        ctxFooter.arc(360, 30, 20, 0, 2 * Math.PI);
        ctxFooter.fillStyle = '#3cea3c';
        ctxFooter.fill();
        ctxFooter.stroke();
    }

    if (speed == 4) {
        ctxFooter.beginPath();
        ctxFooter.arc(300, 30, 22, 0, 2 * Math.PI);
        ctxFooter.fillStyle = 'blue';
        ctxFooter.fill();
        ctxFooter.stroke();
    } else {
        ctxFooter.beginPath();
        ctxFooter.arc(300, 30, 20, 0, 2 * Math.PI);
        ctxFooter.fillStyle = 'blue';
        ctxFooter.fill();
        ctxFooter.stroke();
    }

    if (speed == 2) {
        ctxFooter.beginPath();
        ctxFooter.arc(240, 30, 22, 0, 2 * Math.PI);
        ctxFooter.fillStyle = '#f27979';
        ctxFooter.fill();
        ctxFooter.stroke();
    }
    else {
        ctxFooter.beginPath();
        ctxFooter.arc(240, 30, 20, 0, 2 * Math.PI);
        ctxFooter.fillStyle = '#f27979';
        ctxFooter.fill();
        ctxFooter.stroke();
    }
    // text level
    ctxFooter.fillStyle = "#FFF";
    ctxFooter.font = "8pt Myriad Pro";
    ctxFooter.fillText("slow", 232, 32);
    ctxFooter.fillText("medium", 280, 32);
    ctxFooter.fillText("fast", 352, 32);
}


//Add event listen for footer canvas
footerCanvas.addEventListener("click", function (e) {
    var xClick = e.pageX - this.offsetLeft;
    var yClick = e.pageY - this.offsetTop;

    if (xClick >= 20 && xClick <= 52) {

        if (running == true) {
            running = false;
        }
        else if (running == false) {
            running = true;
            main();
        }
    }
    if (xClick >= 80 && xClick <= 112) {
        resetGame();
    }
    if (xClick >= 220 && xClick <= 260 && yClick >= 12 && yClick <= 52) {
        speed = 2;
        resetLevelGame();
    }
    if (xClick >= 280 && xClick <= 320 && yClick >= 12 && yClick <= 52) {
        speed = 4;
        resetLevelGame();
    }
    if (xClick >= 340 && xClick <= 380 && yClick >= 12 && yClick <= 52) {
        speed = 5;
        resetLevelGame();
    }
});


//Update coordinate for each monster
function update() {
    if (monster1.visible)
        updateMonster(monster1);
    if (monster2.visible)
        updateMonster(monster2);
    if (monster3.visible)
        updateMonster(monster3);
    if (monster4.visible)
        updateMonster(monster4);
    if (monster5.visible)
        updateMonster(monster5);
    if (monster6.visible)
        updateMonster(monster6);
    if (monster7.visible)
        updateMonster(monster7);
    if (monster8.visible)
        updateMonster(monster8);
    if (monster9.visible)
        updateMonsterRamdom(monster9);
}

/*
This function help monster know how to move in mainCanvas.
*/
function updateMonster(monster) {
    if (monster.x > monster.toX) {
        monster.x -= speed;
    } else if (monster.x < monster.toX) {
        monster.x += speed;
    }

    if (monster.y > monster.toY) {
        monster.y -= speed;
    } else if (monster.y < monster.toY) {
        monster.y += speed;
    }

    if (monster.x == monster.toX && monster.y == monster.toY) {
        monster.x = monster.toX;
        monster.y = monster.toY;
        monster.toX = monster.initX;
        monster.toY = monster.initY;
    }

    if (monster.x == monster.initX && monster.y == monster.initY) {
        monster.x = monster.initX;
        monster.y = monster.initY;
        monster.toX = monster.initToX;
        monster.toY = monster.initToY;
       // ShowMonster();
    }

}
function updateMonsterRamdom(monster) {
    if (flagMove == 0) {
        if (movingRight <= 20) {
            movingLeft = 0;
            movingBottom = 0;
            movingTop = 0;
            monster.x += speed;
            if (movingRight == 20 || monster.x >= 300) {
                movingRight = 20;
                flagMove = Math.floor((Math.random() * 4));
            }
            movingRight++;

        }
        else {
            movingRight = 0;
        }
    } else if (flagMove == 1) {
        if (movingBottom <= 10) {
            movingLeft = 0;
            movingRight = 0;
            movingTop = 0;
            monster.y += speed;
            if (movingBottom == 10 || monster.y >= 400) {
                flagMove = Math.floor((Math.random() * 4));
                movingBottom = 10;
            }
            movingBottom++;
        }
        else {
            movingBottom = 0;
        }
    }
    else if (flagMove == 2) {
        if (movingLeft <= 15) {
            movingRight = 0;
            movingBottom = 0;
            movingTop = 0;
            monster.x -= speed;
            if (movingLeft == 15 || monster.x <= 0) {
                flagMove = Math.floor((Math.random() * 4));
                movingLeft = 15;
            }
            movingLeft++;
        }
        else {
            movingLeft = 0;
        }
    } else {
        if (movingTop <= 20) {
            movingLeft = 0;
            movingBottom = 0;
            movingRight = 0;
            monster.y -= speed;
            if (movingTop == 20 || monster.y <= 0) {
                flagMove = Math.floor((Math.random() * 4));
                movingTop = 20;
            }
            movingTop++;
        }
        else {
            movingTop = 0;
        }
    }

}

//Reset all attributes to initial value. 
function resetGame() {
    initMonster(monster1);
    initMonster(monster2);
    initMonster(monster3);
    initMonster(monster4);
    initMonster(monster5);
    initMonster(monster6);
    initMonster(monster7);
    initMonster(monster8);
    initMonster(monster9);
    running = true;
    score = 0;
    heart = 3;
    highScore = sessionStorage.getItem("highscore");
    boomNum = 3;
    ShowMonster();
    main();
}

//reset level
function resetLevelGame() {
    initMonster(monster1);
    initMonster(monster2);
    initMonster(monster3);
    initMonster(monster4);
    initMonster(monster5);
    initMonster(monster6);
    initMonster(monster7);
    initMonster(monster8);
    initMonster(monster9);
    running = true;
    ShowMonster();
    main();
}
// boom die all monster
function boomDie() {
    if (boomNum > 0) {
        initMonster(monster1);
        initMonster(monster2);
        initMonster(monster3);
        initMonster(monster4);
        initMonster(monster5);
        initMonster(monster6);
        initMonster(monster7);
        initMonster(monster8);
        initMonster(monster9);
        boomNum--;
        score += 90;
        heart++;
        ShowMonster();
    }
}
//End game
function endGame() {
    end = true;
    running = false;
}

//Initiate monster attributes to default
function initMonster(monster) {
    monster.x = monster.initX;
    monster.y = monster.initY;
    monster.toX = monster.initToX;
    monster.toY = monster.initToY;
    monster.visible = false;
}
/*Main function
This function is main function.
Game Loop by defined time and FPS.
*/
function main() {
    if (heart <= 0) {
        endGame();
    }
    var now = Date.now();
    var differentTime = now - lastUpdateTime;
    if (differentTime >= TICKS) {
        update();
        render();
        lastUpdateTime = now;
    }
    if (running) {
        requestAnimationFrame(main);
    } else if (!running && !end) {
        ctx.fillStyle = "red";
        ctx.font = "35pt Arial"
        ctx.fillText("PAUSE", 100, 250);
    } else if (!running && end) {
        if (score > highScore) {
            highScore = score;
            sessionStorage.setItem("highscore", score);
            ctx.fillStyle = "white";
            ctx.font = "18pt Arial"
            ctx.fillText("NEW HIGHSCORE: " + highScore, 100, 280);
        }
        ctx.fillStyle = "#edd81a";
        ctx.font = "30pt Arial"
        ctx.fillText("GAME OVER", 90, 250);
    }

}


// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
var lastUpdateTime = Date.now();

main();