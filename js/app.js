// Enemies our player must avoid
const leftBorder = 0;
const rightBorder = 400;
const upBorder = 50;
const downBorder = 390;
const bugSpeeds = [200, 300, 400];
const waterTile = -35;
'use strict;'

var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;  // ([-100], 0, 100, 200, 300, 400, [500])
    this.y = y; // (50, 135, 220, 305, 390)
    this.sprite = 'images/enemy-bug.png';
    this.speed = bugSpeeds [ Math.round( Math.random() * 2 ) ]; // 200, 300, 400, 500
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > 550) {
    this.respawn();
  };
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Respawns the bug after it reaches a certan x-value.
Enemy.prototype.respawn = function() {
    this.x = -50;
    this.speed = bugSpeeds [ Math.round( Math.random() * 2 ) ];
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor() {
    this.x = 200;
    this.y = 390;
    this.sprite = 'images/char-boy.png';
  }

// Updates movement for the player.
// Returns this.y to an if inside engine.js to validate if you player has reached the water tile.
  update( movX = 0, movY = 0) {
    this.x += movX;
    this.y += movY
    this.checkCollision();
    return this.y;
};

  checkCollision() {
    allEnemies.forEach(function(enemy){
      // Validates if the enemy and player have the same Y-value.
      if (enemy.y === player.y) {
        // If the enemy is to the left of the player and the distance is < 50, the player dies.
        if (enemy.x <= player.x && (player.x - enemy.x) < 50) {
          setTimeout( function() {
            player.death();
          }, 50);
        }
        // If the enemy is to the right of the player and the distance is < 50, the player dies.
        else if (enemy.x > player.x && (enemy.x - player.x) < 50) {
          setTimeout(function() {
            player.death();
          }, 50);
        }
      }
    });
  }

// death() and startPos() behave the same, they have to be different Methods
// when adding additional features in the future.
  death() {
    this.x = 200;
    this.y = 390;
  };

  startPos() {
    this.x = 200;
    this.y = 390;
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // console.log(Resources.get(this.sprite))
  };

  // Before updating the position, this method validates if the playes is next to a border.
  handleInput(keypress) {
    if (keypress === 'left' && this.x > leftBorder) {
      // this.x -= 100;
      // this.updateX(-100);
      this.update(-100);
    };
    if (keypress === 'right' && this.x < rightBorder) {
      // this.x += 100;
      // this.updateX(100);
      this.update(100);
    };
    if (keypress === 'up' && this.y >= upBorder) {
      // this.y -= 85;
      // this.updateY(-85);
      this.update(0,-85);
    };
    if (keypress === 'down' && this.y < downBorder) {
      // this.y += 85;
      // this.updateY(85);
      this.update(0,85);
    };
  };
}

// The parameters are hard-coded, those are the y-values.
let bug = new Enemy(50);
let bug2 = new Enemy(220);
let bug3 = new Enemy(135);
let allEnemies = [bug, bug2, bug3];
// allEnemies.push(bug);
// allEnemies.push(bug2);
// allEnemies.push(bug3);


let player = new Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
