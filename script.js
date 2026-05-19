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

let bullets = [];

let keys = {};

document.addEventListener(
    "keydown",
    function (event) {

        keys[event.key] = true;

        if (event.key === " ") {

            bullets.push({

                x:
                    player.x +
                    player.width / 2 - 4,

                y:
                    player.y,

                width: 8,

                height: 20,

                speed: 8

            });

        }

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

function drawBullets() {

    ctx.fillStyle =
        "#ff4df0";

    for (
        let i = 0;
        i < bullets.length;
        i++
    ) {

        let bullet =
            bullets[i];

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );

    }

}

function moveBullets() {

    for (
        let i = 0;
        i < bullets.length;
        i++
    ) {

        bullets[i].y -=
            bullets[i].speed;

        if (
            bullets[i].y < -20
        ) {

            bullets.splice(i, 1);

            i--;

        }

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

    moveBullets();

    drawPlayer();

    drawBullets();

    requestAnimationFrame(
        gameLoop
    );

}

gameLoop();