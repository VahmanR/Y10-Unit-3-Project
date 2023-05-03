//Creating variables to use
var player, playerAttack;
var ground, sky;
var leftBorder, rightBorder;
var obstacleGroup, obstacle1, obstacle2, obstacle3;
var padGroup, pad1, pad2, pad3;
var padsUsed, timesPressed;
var endPoint;
var spikeGroup, spike1;
var projectileGroup, projectile1, projectile2, projectile3, projectile4;
var enemyGroup, enemy1;
let bgMusic, button, soundIcon;
var lastMove;



function preload() {
    bgMusic = loadSound("assets/Route 201 (Day).mp3");
    soundIcon = loadImage("assets/soundIcon.png");
}


//Setting up variables
function setup() {
    var canvas = createCanvas(800, 500);

    lastMove = "";

    padsUsed = 0;

    timesPressed = 0;

    obstacleGroup = new Group();

    padGroup = new Group();

    spikeGroup = new Group();

    projectileGroup = new Group();

    enemyGroup = new Group();

    player = createSprite(100, 480, 25, 25);

    player.depth = 2;



    enemy1 = createSprite(500, 330, 50, 50);
    enemy1.shapeColor = "red";
    enemyGroup.add(enemy1);


    ground = createSprite(0, 480, 1600, 60);
    ground.shapeColor = "green";
    obstacleGroup.add(ground);

    sky = createSprite(0, 0, 1600, 1);
    sky.visible = false;
    obstacleGroup.add(sky);

    leftBorder = createSprite(0, 0, 1, 1000);
    leftBorder.visible = false;

    rightBorder = createSprite(800, 0, 1, 1000);
    rightBorder.visible = false;

    obstacle1 = createSprite(500, 430, 100, 40);
    obstacleGroup.add(obstacle1);

    obstacle2 = createSprite(0, 360, 1600, 20);
    obstacleGroup.add(obstacle2);

    obstacle3 = createSprite(268, 400, 10, 100);
    obstacleGroup.add(obstacle3);

    pad1 = createSprite(250, 452, 20, 5);
    pad1.shapeColor = "red";
    padGroup.add(pad1);

    pad2 = createSprite(300, 348, 20, 5);
    pad2.shapeColor = "red";
    padGroup.add(pad2)

    pad3 = createSprite(800, 452, 20, 5);
    pad3.shapeColor = "red";
    padGroup.add(pad3)

    spike1 = createSprite(675, 450, 20, 20);
    spike1.rotation = 45;
    spike1.depth = -1;
    spikeGroup.add(spike1);

    projectile1 = createSprite(1000, 100, 100, 10);
    projectileGroup.add(projectile1);

    projectile2 = createSprite(-100, 200, 100, 10);
    projectileGroup.add(projectile2);

    projectile3 = createSprite(200, 100, 10, 40);
    projectileGroup.add(projectile3);

    projectile4 = createSprite(400, 360, 10, 40);
    projectileGroup.add(projectile4);

    playerAttack = createSprite(100, 100, 30, 5);
    playerAttack.shapeColor = "purple";

    endPoint = createSprite(600, 60, 20, 5);
    endPoint.shapeColor = "orange";

    button = createButton('SOUND');
    button.position(500, 600);
    button.mousePressed(playBgMusic);
    button.depth = button.depth - 1;




    image(soundIcon, 1000, 100);
}

//Creating the sprites and tracking key inputs
function draw() {

    background(0, 150, 200);






    //Stop Player from moving

    player.velocityX = 0;



    //Player Movement
    if (keyWentDown("up")) {
        player.velocityY = -10;
        player.velocityY = player.velocityY + 0.8;
    }

    else if (keyDown("left")) {
        player.velocityX = -5;
        lastMove = "left";
    }
    else if (keyDown("right")) {
        player.velocityX = 5;
        lastMove = "right";
    }

    //Gravity
    player.velocityY = player.velocityY + 0.8;

    moveProjectileLeft(projectile1);
    moveProjectileRight(projectile2);
    moveProjectileDown(projectile3);
    moveProjectileUp(projectile4);


    //Player Collision
    player.collide(obstacleGroup);
    player.collide(leftBorder, stopPlayer);
    player.collide(rightBorder, stopPlayer);
    player.collide(padGroup, bouncePlayer);
    player.collide(spikeGroup, removePlayer);
    player.collide(projectileGroup, removePlayer);
    player.collide(enemyGroup, removePlayer);
    player.collide(endPoint, reachEnd);

    playerAttack.collide(obstacleGroup, removeEnemy);
    playerAttack.collide(leftBorder, removeEnemy);
    playerAttack.collide(rightBorder, removeEnemy);
    playerAttack.collide(leftBorder, removeEnemy);
    playerAttack.collide(enemyGroup, removeAttack);




    if (keyWentDown("w")) {
        attackPlayer(playerAttack);
    }




    console.log(playerAttack.position.x);
    console.log(playerAttack.position.y)


    moveEnemy(enemy1);

    drawSprites();
}

//Function to stop player from moving
function stopPlayer() {
    player.velocityX = 0;
    player.velocityY = 0;
}

//Function to bounce target of a certain tile
function bouncePlayer(target, pad) {
    if (padsUsed % 2 == 0) {
        target.position.y -= 160;
        target.velocityX = 0;
        target.velocityY = 0;
        padsUsed += 1;
    }
    else if (padsUsed % 2 !== 0 && target.position.y + 80 < 481) {
        target.position.y += 80;
        target.velocityX = 0;
        target.velocityY = 0;
        padsUsed += 1;
    }


}

//Function to send player to the start
function removePlayer(target, spike) {
    target.velocityX = 0;
    target.velocityY = 0;
    target.position.x = 100;
    target.position.y = 480;
    padsUsed = 0;
}

function removeEnemy(target, attack) {
    target.position.x = -25;
}

function removeAttack(target, attack) {
    attack.destroy();
    target.position.x = -25;
}


//Functions to move projectiles across screen
function moveProjectileLeft(projectile) {
    projectile.velocityX = -50;
    if (projectile.position.x < 1) {
        projectile.position.x = 1000;
    }
}

function moveProjectileRight(projectile) {
    projectile.velocityX = 50;
    if (projectile.position.x > 900) {
        projectile.position.x = -100;
    }
}

function moveProjectileDown(projectile) {
    projectile.velocityY = 25;
    if (projectile.position.y > 360) {
        projectile.position.y = -100;
    }
}

function moveProjectileUp(projectile) {
    projectile.velocityY = -25;
    if (projectile.position.y < 0) {
        projectile.position.y = 340;
    }
}

//Function to end the game
function reachEnd(target) {
    console.log("Game End");
    target.position.x = 100;
    target.position.y = 480;
    padsUsed = 0;
}



function playBgMusic() {
    if (timesPressed % 2 == 0) {
        bgMusic.loop();
        bgMusic.play();
        timesPressed += 1;
    }
    else {
        bgMusic.stop();
        timesPressed += 1;
    }


}

function attackPlayer(attack) {
    //attack = createSprite(player.position.x,player.position.y,30,5);    



    if (lastMove == "right") {
        attack.position.x = player.position.x;
        attack.position.y = player.position.y;
        attack.velocityX = 15;
        player.velocityX = player.velocityX - 12.5;
    }

    else if (lastMove == "left") {
        attack.position.x = player.position.x;
        attack.position.y = player.position.y;
        attack.velocityX = -15;
        player.velocityX = player.velocityX + 12.5;
    }

    else {
        attack.position.x = player.position.x;
        attack.position.y = player.position.y;
        attack.velocityX = 15;
        player.velocityX = player.velocityX - 12.5;
    }



}

function moveEnemy(enemy) {
    move1 = 0;
    move1 = Math.random()
    move2 = 0;
    move2 = Math.floor(Math.random()) * 10;
    if (move1 % 2 == 0) {
        enemy.position.x += move2;
    }
    else {
        enemy.position.x -= move2;
    }
}

