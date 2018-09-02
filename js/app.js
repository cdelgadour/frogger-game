// Enemies our player must avoid
const leftBorder = 0;
const rightBorder = 400;
const upBorder = 50;
const downBorder = 390;
const bugSpeeds = [200, 300, 400];
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;  // ([-100], 0, 100, 200, 300, 400, [500])
    this.y = y; // (50, 135, 220, 305, 390)
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed; // 200, 300, 400, 500
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
    this.name = "Pepe";
    this.x = 200;
    this.y = 390;
    this.sprite = 'images/char-boy.png';
  }

  // updateX( mov = 0 ) {
  //   this.x += mov;
  // };
  //
  // updateY( mov = 0 ) {
  //   this.y += mov;
  //
  // };

  update( movX = 0, movY = 0) {
    this.x += movX;
    this.y += movY
    this.checkCollision();
    return this.y;
};

  checkCollision() {
    allEnemies.forEach(function(enemy){
      if (enemy.y === player.y) {
        if (enemy.x <= player.x && (player.x - enemy.x) < 50) {
          setTimeout( function() {
            player.death();
          }, 50);
        }
        else if (enemy.x > player.x && (enemy.x - player.x) < 50) {
          setTimeout(function() {
            player.death();
          }, 50);
        }
      }
    });
  }

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


let bug = new Enemy(50, 300);
let bug2 = new Enemy(220, 200);
let bug3 = new Enemy(135, 100);
let allEnemies = []
allEnemies.push(bug);
allEnemies.push(bug2);
allEnemies.push(bug3);

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
