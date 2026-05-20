let canvas =
document.getElementById("gameCanvas");

let ctx =
canvas.getContext("2d");

let scoreText =
document.querySelector(".score-text");

let gameOverBox =
document.querySelector(".game-over-box");

let finalScore =
document.querySelector(".final-score");

let restartBtn =
document.querySelector(".restart-btn");

let player = {
    x:180,
    y:560,
    width:60,
    height:60,
    speed:6
};

let bullets = [];
let enemies = [];
let keys = {};

let score = 0;

let gameRunning = true;

restartBtn.onclick = function(){

    location.reload();

};

document.addEventListener(
"keydown",
function(event){

    keys[event.key] = true;

    if(
        event.key === " " &&
        gameRunning
    ){

        bullets.push({
            x:player.x + 26,
            y:player.y,
            width:8,
            height:20,
            speed:8
        });

    }

});

document.addEventListener(
"keyup",
function(event){

    keys[event.key] = false;

});

function drawPlayer(){

    ctx.fillStyle = "#5bd1ff";

    ctx.beginPath();

    ctx.moveTo(
        player.x + 30,
        player.y
    );

    ctx.lineTo(
        player.x,
        player.y + 60
    );

    ctx.lineTo(
        player.x + 60,
        player.y + 60
    );

    ctx.closePath();

    ctx.fill();

}

function movePlayer(){

    if(keys["ArrowLeft"] && player.x > 0){
        player.x -= player.speed;
    }

    if(
        keys["ArrowRight"] &&
        player.x + player.width < canvas.width
    ){
        player.x += player.speed;
    }

}

function drawBullets(){

    ctx.fillStyle = "#ff4df0";

    bullets.forEach(function(bullet){

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );

    });

}

function moveBullets(){

    bullets.forEach(function(bullet,index){

        bullet.y -= bullet.speed;

        if(bullet.y < -20){
            bullets.splice(index,1);
        }

    });

}

function createEnemy(){

    if(!gameRunning){
        return;
    }

    enemies.push({

        x:Math.random() * 370,
        y:-60,
        width:50,
        height:50,
        speed:3

    });

}

setInterval(createEnemy,1200);

function drawEnemies(){

    ctx.fillStyle = "#ff5f7a";

    enemies.forEach(function(enemy){

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

    });

}

function moveEnemies(){

    enemies.forEach(function(enemy,index){

        enemy.y += enemy.speed;

        if(enemy.y > canvas.height){
            enemies.splice(index,1);
        }

    });

}

function checkCollisions(){

    bullets.forEach(function(bullet,bIndex){

        enemies.forEach(function(enemy,eIndex){

            if(

                bullet.x <
                enemy.x + enemy.width &&

                bullet.x + bullet.width >
                enemy.x &&

                bullet.y <
                enemy.y + enemy.height &&

                bullet.y + bullet.height >
                enemy.y

            ){

                bullets.splice(bIndex,1);

                enemies.splice(eIndex,1);

                score++;

                scoreText.innerText =
                "Score: " + score;

            }

        });

    });

}

function checkPlayerCollision(){

    enemies.forEach(function(enemy){

        if(

            player.x <
            enemy.x + enemy.width &&

            player.x + player.width >
            enemy.x &&

            player.y <
            enemy.y + enemy.height &&

            player.y + player.height >
            enemy.y

        ){

            gameRunning = false;

            gameOverBox.classList.remove(
                "hidden"
            );

            finalScore.innerText =
            "Final Score: " + score;

        }

    });

}

function gameLoop(){

    if(!gameRunning){
        return;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    movePlayer();

    moveBullets();

    moveEnemies();

    checkCollisions();

    checkPlayerCollision();

    drawPlayer();

    drawBullets();

    drawEnemies();

    requestAnimationFrame(gameLoop);

}

gameLoop();
