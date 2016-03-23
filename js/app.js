/*
 *@author: alexanderanter
 *version: 1.0.0
 */
var allEnemies = [];
var player = new Player(4);

var genRandom  = function(maxValue, min) {
    var minValue = 0 || min;
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

var genEnemies = function(enemies){
    var i = 0;
    for(i; i < enemies; i++) {
        new Enemy(genRandom(200,50), genRandom(400,90));
    }
};

var updateScore = function() {
    this.score += 1;
    var score = document.getElementById('score');
    score.innerHTML = this.score;
}

var resetScore = function() {
    var score = document.getElementById('score');
    this.score = 0;
    score.innerHTML = 0;
}

// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.x = -80;
    this.y = y || 70;

    allEnemies.push(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if(this.x > 500){
        this.x = -80;
        this.y = (genRandom(200,50));
    }

    if(this.x < player.x + 60 && this.x > player.x - 60){
        if(this.y < player.y + 100 && this.y > player.y - 20) {

            player.x = 200;
            player.y = 420;
            resetScore.call(player);
        }
    } else {
        console.log("you are safe, for now...");
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 420;
    this.score = 0;
};

Player.prototype.update = function() {
    if(this.y <= 0){
        console.log("you made it!");
        this.x = 200;
        this.y = 420;
        updateScore.call(player);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {

    if (keys === "left") {
        this.x -= 30;
    }else if (keys === "right") {
        this.x += 30;
    }else if (keys === "up") {
        this.y -= 30;
    }else if (keys === "down") {
        this.y += 30;
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

genEnemies(6);
player.handleInput();
player.update(4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});