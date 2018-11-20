let Engine = (function (global) {
    const doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');
    let lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            frameSpeed = (now - lastTime) / 1000.0;

        update(frameSpeed);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    function init() {
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.updatePosition(dt);
        });

        allGems.forEach(function (gem) {
            gem.checkPickUp();
        });

        if (player.update() === waterTile) {
            player.startPos();
        }

        if (player.lives === 0) {
            checkForEndGame();
        }
    }

    function checkForEndGame() {
        alert('Game Over!');
        document.querySelector('#restart-button').click();
    }

    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',// Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();

        blueGem.renderGem();
        orangeGem.renderGem();
        greenGem.renderGem();
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
