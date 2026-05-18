let canvas =
    document.getElementById("gameCanvas");

let ctx =
    canvas.getContext("2d");

let player = {

    x: 180,

    y: 560,

    width: 60,

    height: 60,

    speed: 6

};

let keys = {};

document.addEventListener(
    "keydown",
    function (event) {

        keys[event.key] = true;

    }
);

document.addEventListener(
    "keyup",
    function (event) {

        keys[event.key] = false;

    }
);

function drawPlayer() {

    ctx.fillStyle =
        "#5bd1ff";

    ctx.beginPath();

    ctx.moveTo(
        player.x + player.width / 2,
        player.y
    );

    ctx.lineTo(
        player.x,
        player.y + player.height
    );

    ctx.lineTo(
        player.x + player.width,
        player.y + player.height
    );

    ctx.closePath();

    ctx.fill();

}

function movePlayer() {

    if (
        keys["ArrowLeft"] &&
        player.x > 0
    ) {

        player.x -= player.speed;

    }

    if (
        keys["ArrowRight"] &&
        player.x + player.width <
        canvas.width
    ) {

        player.x += player.speed;

    }

    if (
        keys["ArrowUp"] &&
        player.y > 0
    ) {

        player.y -= player.speed;

    }

    if (
        keys["ArrowDown"] &&
        player.y + player.height <
        canvas.height
    ) {

        player.y += player.speed;

    }

}

function gameLoop() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    movePlayer();

    drawPlayer();

    requestAnimationFrame(
        gameLoop
    );

}

gameLoop();