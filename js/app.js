const leftBorder = 0;
const rightBorder = 400;
const upBorder = 50;
const downBorder = 390;
const bugSpeeds = [200, 300, 400, 500];
const waterTile = -35;
const gemCoordinates = [[28, 128, 228, 328, 428],[113, 198, 283, 368]];

class Entity {
  constructor(x = 0, y = 0, sprite = null) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Entity {
  constructor(x, y, sprite = "images/enemy-bug.png") {
    super(x, y, sprite);
    this.speed = bugSpeeds [ Math.round( Math.random() * (bugSpeeds.length - 1) ) ];
  }

  updatePosition(frameSpeed) {
    this.x += this.speed * frameSpeed;
    this.checkCollision();

    let enemyBorder = 550;
    if (this.x > enemyBorder) {
      this.respawn();
    }
  }
  checkCollision() {
      let [player_xPos, player_yPos] = player.playerCoordinates();
      let deathInterval = 60;
      if (this.y === player_yPos) {
         // If the enemy is to the left of the player and the distance is < 50, the player dies.
         if (this.x <= player_xPos && (player_xPos - this.x) < deathInterval) {
           setTimeout( function() {
             player.death();
           }, 25);
         }
         // If the enemy is to the right of the player and the distance is < 50, the player dies.
         else if (this.x > player_xPos && (this.x - player_yPos) < deathInterval) {
           setTimeout(function() {
             player.death();
           }, 25);
         }
      }
    }

  respawn() {
    this.x = -50;
    this.speed = bugSpeeds [ Math.round( Math.random() * (bugSpeeds.length - 1) ) ];
  }

}

class Player extends Entity {
  constructor(x = 200, y = 390, sprite = "images/char-boy.png", ) {
    super(x, y, sprite);
    this.winCount = 0;
    this.points = 0;
    this.lives = 3;
  }

  update( movX = 0, movY = 0) {
    this.x += movX;
    this.y += movY;
    return this.y;
};

  death() {
    this.x = 200;
    this.y = 390;
    let self = this;
    setTimeout(function(){
       self.lives -= 0.5;
       gameStats.updateLives(self.lives);
    }, 200);

  };

  startPos() {
      let self = this;
      setTimeout(function(){
        self.x = 200;
        self.y = 390;
        self.updateWinCount();
    }, 10);
  };

  handleInput(keypress) {
    if (keypress === 'left' && this.x > leftBorder) {
      this.update(-100);
    }
    if (keypress === 'right' && this.x < rightBorder) {
      this.update(100);
    }
    if (keypress === 'up' && this.y >= upBorder) {
      this.update(0,-85);
    }
    if (keypress === 'down' && this.y < downBorder) {
      this.update(0,85);
    }
  };

  playerCoordinates(){
      return [this.x, this.y];
  };

  updateWinCount() {
      this.winCount += 1;
      gameStats.updateWin(player.winCount);
      this.updatePoints();
  }

  updatePoints(points = 100) {
      this.points += points;
      gameStats.updatePointsView(this.points);
  }
}

class Gem extends Entity {
    constructor(x = 0, y = 0, sprite, gemColor, width, height, points){
        super(x, y, sprite);
        this.gemColor = gemColor;
        this.width = width;
        this.height = height;
        this.points = points;

    }

    renderGem() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }

    checkPickUp() {
        let [player_xPos, player_yPos] = player.playerCoordinates();
        const hitBoxHeight = 63;
        const hitBoxWidth = 28;
        if ((this.y - player_yPos) == hitBoxHeight && ((this.x - player_xPos) == hitBoxWidth))
        {
            this.respawn();
            player.updatePoints(this.points);
        }
    }

    respawn() {
        this.x = gemCoordinates[0][ Math.round( Math.random() * (gemCoordinates[0].length - 1) ) ];
        this.y = gemCoordinates[1][ Math.round( Math.random() * (gemCoordinates[1].length - 1) ) ];
    }
}

let blueGem = new Gem(128, 113, 'images/Gem Blue.png', 'blue', 47, 80, 10);
let orangeGem = new Gem(228, 113, 'images/Gem Orange.png', 'orange', 47, 80, 15);
let greenGem = new Gem(228, 198, 'images/Gem Green.png', 'green', 47, 80, 20);
let allGems = [blueGem, orangeGem, greenGem];

let bug = new Enemy(-100, 50);
let bug2 = new Enemy(-100, 220);
let bug3 = new Enemy(-100, 135);
let allEnemies = [bug, bug2, bug3];

let player = new Player();

let gameStats = {
    init: function() {
            this.winView = document.querySelector('#win-count');
            this.points = document.querySelector('#points');
            this.restartBttn = document.querySelector('#restart-button');
            this.livesCounter = document.querySelector('#lives-count');

            this.restartBttn.addEventListener('click', function(){
                document.location.href = '';
            })
    },

    updateWin: function(wins) {
        this.winView.textContent = "Wins: " + wins;
    },

    updatePointsView: function(playerPoints) {
        this.points.textContent = `Points: ${playerPoints}`;
    },

    updateLives: function(lives) {
        this.livesCounter.textContent = `Lives: ${lives}`;
    }
};

gameStats.init();

//EVENTS
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});