const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreUI = document.querySelector(".score");
const overBox = document.querySelector(".over");
const finalUI = document.querySelector(".final");
const restartBtn = document.querySelector(".btn");


function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();


let player = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 120,
    w: 50,
    h: 50,
    speed: 13.5
};

let bullets = [];
let enemies = []; 
let keys = {};

let score = 0;
let alive = true;


restartBtn.onclick = () => location.reload();


document.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if(e.key === " " && alive){
        bullets.push({
            x: player.x + 22,
            y: player.y,
            w: 6,
            h: 14,
            speed: 9
        });
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});


function drawPlayer(){
    ctx.fillStyle = "#b79cff";

    ctx.beginPath();
    ctx.moveTo(player.x + 25, player.y);
    ctx.lineTo(player.x, player.y + 50);
    ctx.lineTo(player.x + 50, player.y + 50);
    ctx.closePath();
    ctx.fill();
}


function movePlayer(){
    if(keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if(keys["ArrowRight"] && player.x < canvas.width - player.w) player.x += player.speed;
}


function drawBullets(){
    ctx.fillStyle = "#ff8bd1";
    bullets.forEach(b => ctx.fillRect(b.x,b.y,b.w,b.h));
}

function moveBullets(){
    bullets.forEach((b,i) => {
        b.y -= b.speed;
        if(b.y < -20) bullets.splice(i,1);
    });
}


function spawnEnemy(){
    if(!alive) return;

    enemies.push({
        x: Math.random() * (canvas.width - 50),
        y: -50,
        w: 45,
        h: 45,
        speed: 1.69
    });
}

setInterval(spawnEnemy, 900);

function drawEnemies(){
    ctx.fillStyle = "#ff6f91";
    enemies.forEach(e => ctx.fillRect(e.x,e.y,e.w,e.h));
}

function moveEnemies(){
    enemies.forEach((e,i) => {
        e.y += e.speed;
        if(e.y > canvas.height) enemies.splice(i,1);
    });
}


function hit(a,b){
    return (
        a.x < b.x + b.w &&
        a.x + (a.w||0) > b.x &&
        a.y < b.y + b.h &&
        a.y + (a.h||0) > b.y
    );
}


function checkHits(){
    bullets.forEach((b,bi) => {
        enemies.forEach((e,ei) => {
            if(hit(b,e)){
                bullets.splice(bi,1);
                enemies.splice(ei,1);

                score++;
                scoreUI.innerText = "Score : " + score;
            }
        });
    });
}


function checkDeath(){
    enemies.forEach(e => {
        if(hit(player,e)){
            alive = false;
            overBox.classList.remove("hidden");
            finalUI.innerText = "score : " + score;
        }
    });
}


function loop(){
    if(!alive) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    movePlayer();
    moveBullets();
    moveEnemies();

    checkHits();
    checkDeath();

    drawPlayer();
    drawBullets();
    drawEnemies();

    requestAnimationFrame(loop);
}

loop();
