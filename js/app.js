/*
 *@author: alexanderanter
 *version: 1.0.0
 */


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

var genPlayers = function(players){
    var i = 0;
    for(i; i < players; i++) {
        new Player(i);
    }

};

var updateScore = function() {
    this.score += 1;
    var score = document.getElementById(this.scoreID);
    score.innerHTML = this.score;
}

var resetScore = function() {
    var score = document.getElementById(this.scoreID);
    this.score = 0;
    score.innerHTML = 0;
}


var Enemy = function(y, speed) {
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.x = -80;
    this.y = y || 70;

    allEnemies.push(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // dt ensure the game runs at the same speed for all computers

    this.x += this.speed * dt;

    if(this.x > 500){
        this.x = -80;
        this.y = (genRandom(200,50));
    }

    var i = 0;
    for(i; i < allPlayers.length; i++){
        if(this.x < allPlayers[i].x + 60 && this.x > allPlayers[i].x - 60){
            if(this.y < allPlayers[i].y + 60 && this.y > allPlayers[i].y - 20) {

                allPlayers[i].x = 200;
                allPlayers[i].y = 420;
                resetScore.call(allPlayers[i]);
            }
        } else {
            console.log("you are safe, for now...");
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(playerNumber) {
    this.playerNumber = playerNumber || 0;

    if (this.playerNumber % 2 === 0){
        this.sprite = 'images/char-boy.png';
    }else {
        this.sprite = 'images/char-horn-girl.png';
    }

    var scoreLabel= document.createElement("span");
    scoreLabel.innerHTML = "player" + playerNumber;
    var para = document.createElement("p");
    this.scoreID = "score" + playerNumber;
    para.id = this.scoreID;
    scoreWrap.appendChild(para);
    scoreWrap.appendChild(scoreLabel);

    this.x = 200 + (this.playerNumber * 30);
    this.y = 420;
    this.score = 0;
    this.handleInput();
    this.update();
    allPlayers.push(this);
};

Player.prototype.update = function() {
    //reach the river
    if(this.y <= 0){
        this.x = 200;
        this.y = 420;
        updateScore.call(this);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    console.log("hm");
    console.log(keys);
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

//initialize the game
var allEnemies = [];
var allPlayers = [];
var scoreWrap = document.createElement("div");
document.body.appendChild(scoreWrap);

genEnemies(5);
genPlayers(2);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeysArr = []
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var allowedKeys2 = {
        87: 'up',
        68: 'right',
        83: 'down',
        65: 'left'
    }
    allowedKeysArr.push(allowedKeys);
    allowedKeysArr.push(allowedKeys2);

    var i;
    for (i = 0; i < allPlayers.length; i++) {
        allPlayers[i].handleInput(allowedKeysArr[i][e.keyCode]);
    }

});