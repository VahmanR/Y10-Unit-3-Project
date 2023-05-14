//Creating variables to use
var player, playerAttack; //Variables for the player

var ground, sky; //Making the variables for the sky and ground

var leftBorder, rightBorder; //Creating the variables for the right and left borders

var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5; //Group and variables for obstacles

var padGroup, pad1, pad2, pad3; //Group and variable for pads

var padsUsed, timesPressed; //Variables for usage

var endPoint; //Creating the endpoint

var spikeGroup, spike1; //Group and variable for spikes

var projectileGroup, projectile1, projectile2, projectile3, projectile4; //Group and variables for projectiles

var enemyGroup, enemy1, enemy2; //Group and variables for enemies

let bgMusic, soundButton, soundIcon; //To create the sound button

let cookieButton, loadButton; //Buttons for saving and loading data

var playerSavedX, playerSavedY, enemy1SavedX, enemy1SavedY, enemy2SavedX, enemy2SavedY, savedPadsUsed; //Variables to save data to

var lastMove; //Variable for saving the player's last move

var uses; //Variable for uses of the shift key

function preload() { //Loading sounds and images to use later

    bgMusic = loadSound("assets/Route 201 (Day).mp3"); //Loading the file for the background music
    soundIcon = loadImage("assets/soundIcon.png"); //Loading the image for the sound button
}

function setup() { //Setting up variables

    var canvas = createCanvas(800, 500); //Creating the canvas

    lastMove = ""; //Setting the last move to an empty string, so that it won't do anything until the player moves

    padsUsed = 0; //The player hasn't done anything yet so padsUsed is 0

    timesPressed = 0; //The player hasn't pressed the sound button so timesPressed is 0

    uses = 1; //The player hasn't pressed shift so uses is 0

    obstacleGroup = new Group(); //Creating the obstacle group

    padGroup = new Group(); //Creating the pad group

    spikeGroup = new Group(); //Creating the spike group

    projectileGroup = new Group(); //Creating the projectile group

    enemyGroup = new Group(); //Creating the enemy group

    player = createSprite(100, 480, 25, 25); //Creating the player's sprite

    player.depth = 2; //Setting the player's depth so the player is above the other things on screen

    enemy1 = createSprite(500, 330, 50, 50); //Creating the enemy's sprite
    enemy1.shapeColor = "red"; //Setting the enemy's colour
    enemyGroup.add(enemy1); //Adding the enemy to the enemy group

    enemy1.depth = 2; //Setting the enemy's depth

    enemy2 = createSprite(500, 100, 25, 25); //Creating the second enemy's sprite
    enemy2.shapeColor = "black"; //Setting the second enemy's colour
    enemyGroup.add(enemy2); //Adding the second enemy to the enemy group

    enemy2.depth = 2; //Setting the second enemy's depth

    ground = createSprite(0, 480, 1600, 60); //Creating the sprite for the ground
    ground.shapeColor = "green"; //Setting the colour of the ground
    obstacleGroup.add(ground); //Adding the ground to the obstacle group

    sky = createSprite(0, 0, 1600, 1); //Creating the sprite for the sky
    sky.visible = false; //Making the sky invisible
    obstacleGroup.add(sky); //Adding the sky to the obstacle group

    leftBorder = createSprite(0, 0, 1, 1000); //Creating the left border
    leftBorder.visible = false; //Making the left border invisible

    rightBorder = createSprite(800, 0, 1, 1000); //Creating the right border
    rightBorder.visible = false; //Making the right border invisible

    obstacle1 = createSprite(500, 430, 100, 40);  //Making the first obstacle
    obstacleGroup.add(obstacle1); //Adding the obstacle to its group

    obstacle2 = createSprite(0, 360, 1600, 20); //Making the second obstacle
    obstacleGroup.add(obstacle2); //Adding it to its group

    obstacle3 = createSprite(268, 400, 10, 100); //Making the third obstacle
    obstacleGroup.add(obstacle3); //Adding it to its group

    obstacle4 = createSprite(650, 67, 300, 10); //Making the fourth obstacle
    obstacleGroup.add(obstacle4); //Adding it to its group

    obstacle5 = createSprite(400, 340, 10, 50); //Making the fifth obstacle
    obstacleGroup.add(obstacle5); //Adding it to its group

    pad1 = createSprite(250, 452, 20, 5); //Creating the first pad
    pad1.shapeColor = "red"; //Setting its colour
    padGroup.add(pad1); //Adding it to the group

    pad2 = createSprite(300, 348, 20, 5); //Creating the second pad
    pad2.shapeColor = "red"; //Setting its colour
    padGroup.add(pad2) //Adding it to the group

    pad3 = createSprite(800, 452, 20, 5); //Creating the third pad
    pad3.shapeColor = "red"; //Setting its colour
    padGroup.add(pad3) //Adding it to its group

    spike1 = createSprite(675, 450, 20, 20); //Creating the spike
    spike1.rotation = 45; //Rotating it so that it looks triangular
    spike1.depth = -1; //Changing its depth so it is behind other obstacles
    spikeGroup.add(spike1); // Adding it to its group

    projectile1 = createSprite(1000, 100, 100, 10); //Creating the projectile
    projectileGroup.add(projectile1); //Adding it to its group

    projectile2 = createSprite(-100, 200, 100, 10); //Creating the projectile
    projectileGroup.add(projectile2); //Adding it to its group

    projectile3 = createSprite(200, 100, 10, 40); //Creating the projectile
    projectileGroup.add(projectile3); //Adding it to its group

    projectile4 = createSprite(400, 360, 10, 40); //Creating the projectile
    projectileGroup.add(projectile4); //Adding it to its group

    playerAttack = createSprite(-100, -100, 30, 5); //Creating the sprite for the player's attack
    playerAttack.shapeColor = "purple"; //Making the attack purple

    endPoint = createSprite(798, 60, 20, 5); //Creating the tile for the end point
    endPoint.shapeColor = "orange"; //Making the tile orange

    soundButton = createButton('SOUND'); //Making a button with the label SOUND
    soundButton.position(1367, 113); //Setting its position
    soundButton.mousePressed(playBgMusic); //Making it call the playBgMusic function when pressed

    cookieButton = createButton('SAVE'); //Making a button with the label SAVE
    cookieButton.position(1381, 143); //Setting its position
    cookieButton.mousePressed(savePosition); //Making it call the savePosition function when pressed

    loadButton = createButton('LOAD'); //Making a button with the label LOAD
    loadButton.position(1379, 173); //Setting its position
    loadButton.mousePressed(loadSave); //Making it call the loadSave function when pressed

    image(soundIcon, 1367, 113); //Adding an image over the SOUND button. DOES NOT WORK
}


function draw() { //Draw function creates all the elements which will be updated as the player plays the game. The function will loop through all lines continuously

    background(0, 150, 200); //Making the background's colour into a blue with some green

    player.velocityX = 0; //Setting the players X velocity to 0, important for making movement work later

    //This is the section to map certain keys to actions which the player can perform

    if (keyWentDown("up")) { //Checks if the up arrow key was pressed, if it was pressed it will continue to the next line. Otherwise it will go to the else if statement. All if and else if statements will work this way

        player.velocityY = -10; //Setting the player's Y velocity to -10, the number is negative because pressing up should make the player go up and the Y value increases from top to bottom
        player.velocityY = player.velocityY + 0.8; //Makes the players Y velocity increase by 0.8, this makes the player slowly fall down, essentially gravity
        console.log("UP"); //Prints UP to the console. Doesn't affect gameplay, just keeps a log of all of the players moves
    }

    else if (keyDown("left")) { //Checks if the left arrow key is pressed. keyDown and keyWentDown act very differently. keyWentDown was used earlier to check for the up arrow key. It only logs the key when it is pressed. keyDown will log the key until the user releases the key. keyWentDown is used for the up arrow to prevent the user from floating, but for the X axis movement keyDown is preferred as it allow the player to hold down the key to move

        player.velocityX = -5; //Sets the player's X velocity to -5. X values increase from left to right, so to move left you need a negative X velocity. Earlier the player's x velocity was set to 0. This comes into effect here because once the player releases the left arrow the player's velocity will be set back to 0 
        lastMove = "left"; //This sets the lastMove variable to the value left. This will matter later
        console.log("LEFT"); //Prints LEFT to the console. No effect on gameplay
    }

    else if (keyDown("right")) { //This section works identically to the else if statement above, but the values used are the opposite as this is to make the player move right instead of moving left

        player.velocityX = 5; //Setting the player's X velocity to 5 to allow the player to move to the right of the screen
        lastMove = "right"; //Sets the lastMove variable to right. Comes into effect later
        console.log("RIGHT"); //Prints RIGHT to the console. No effect on gameplay
    }

    //This else if statement is to check if the player presses shift and then to make them dash in a certain direction

    else if (keyWentDown("shift") && uses == 1) { //Checking if the shift key has been pressed and if the player still has 1 use left
        if (lastMove == "right") { //Checks for the value of the lastMove variable. If it is right it continues, if it is left it goes to the else if statement. Otherwise nothing will happen
            player.velocityX = 12.5; //Gives the player a large X velocity allowing them to quickly travel a distance
            player.velocityY = -17.5; //Gives the player a large Y velocity allowing them to jump higher than usual
            uses = 0; //Sets the uses to 0 so they player can use this ability anymore
            console.log("SHIFT"); //Prints SHIFT to the console. No effect on gameplay
        }
        else if (lastMove == "left") { //Nearly identical to the if statement but the opposite X value to make the player go left
            player.velocityX = -12.5; //Large X velocity to quickly travel a distance
            player.velocityY = -17.5; //Large Y velocity to jump high
            uses = 0; //Sets the uses to 0
            console.log("SHIFT") //Prints SHIFT to the console
        }
    }

    //Player attack

    if (keyWentDown("w")) { //Checks if the w key has been pressed, uses keyWentDown just like when checking for the up key

        attackPlayer(playerAttack); //Calls the player attack function, defined around line 400
        console.log("W") //Prints W to the console, no effect on gameplay
        //This section is to randomly place the red enemy on the 1st or 2nd layer at a random x position
        var xPos = Math.floor(Math.random() * 1000); //Creates a variable for x position and gives it a value using Math.random
        var yPos = 0; //Creates a variable for y position and gives it a value of 0
        var randNum = numGen(1, 2); //Makes a random number using the numGen function defined around line 450
        if (randNum == 1) { //Checks the value of the randNum if it is 1 it continues otherwise it goes to the else statement
            yPos = 330; //Sets the yPos variable to 330
        }
        else { //Goes here if randNum is not 1
            yPos = 430; //Sets the yPos variable to 430
        }
        enemy1.position.x = xPos; //Makes the large red enemy's x position equal to xPos
        enemy1.position.y = yPos; //Makes the large red enemy's y position equal to yPos

    }


    //This section is to stop the player from leaving the boundaries of the game
    if (player.position.x < 0 || player.position.x > 800) { //Checks if the player's x value is outside of the borders
        player.position.x = 100; //Sets the x position to the spawn position
        player.position.y = 480; //Sets the y position to the spawn position
    }

    if (player.position.y < 0 || player.position.y > 480) { //Checks if the player's y value is outside of the borders
        player.position.x = 100; //Sets the x position to the spawn position
        player.position.y = 480; //Sets the y position to the spawn position
    }

    player.velocityY = player.velocityY + 0.8; //Constantly increases the player's Y velocity to act as gravity

    //Calling functions to move the projectiles across the screen
    moveProjectileLeft(projectile1); //Calls the moveProjectileLeft function on projectile1
    moveProjectileRight(projectile2); //Calls the moveProjectileRight function on projectile2
    moveProjectileDown(projectile3); //Calls the moveProjectileDown function on projectile3
    moveProjectileUp(projectile4); //Calls the moveProjectileUp function on projectile4


    //Setting collision for the player, the player's attack and enemies
    player.collide(obstacleGroup); //Makes the player collide with the obstacleGroup
    player.collide(leftBorder, stopPlayer); //Makes the player collide with the left border and calls the stopPlayer function 
    player.collide(rightBorder, stopPlayer); //Makes the player collide with the right border and calls the stopPlayer function
    player.collide(padGroup, bouncePlayer); //Makes the player collide with the padGroup and calls the bouncePlayer function
    player.collide(spikeGroup, removePlayer); //Makes the player collide with the spikeGroup and calls the removePlayer function
    player.collide(projectileGroup, removePlayer); //Makes the player collide with the projectileGroup and calls the removePlayer function
    player.collide(enemyGroup, removePlayer); //Makes the player collide with the enemyGroup and calls the removePlayer function
    player.collide(endPoint, reachEnd); //Makes the player collide with the endPoint and calls the reachEnd function

    playerAttack.collide(obstacleGroup, removeAttack); //Makes the attack collide with the obstacleGroup and calls the removeAttack function
    playerAttack.collide(leftBorder, removeAttack); //Makes the attack collide with the left border and calls the removeAttack function
    playerAttack.collide(rightBorder, removeAttack); //Makes the attack collide with the right border and calls the removeAttack function
    playerAttack.collide(enemyGroup, removeEnemy); //Makes the attack collide with the enemyGroup and calls the removeEnemy function

    enemyGroup.collide(obstacleGroup); //Makes the enemyGroup collide with the obstacleGroup
    enemyGroup.collide(leftBorder); //Makes the enemyGroup collide with the left border
    enemyGroup.collide(rightBorder); //Makes the enemyGroup collide with the right border

    enemy2.collide(projectileGroup); //Makes the smaller black enemy collide with the projectileGroup


    followPlayer(enemy2); //Makes the smaller black enemy follow the player, the function followPlayer is defined later


    console.log(enemy1.position.x); //Constantly logs the x position of the large red enemy

    drawSprites(); //Creates all the sprites on the screen
}

//Below are all of the functions which I have made for this game


//Function to stop the player by setting their x and y velocities to 0, used when the player collides with the borders
function stopPlayer() {

    player.velocityX = 0;
    player.velocityY = 0;
}

//Function to bounce the player off of the padGroup, works more like a teleport
function bouncePlayer(target, pad) {

    if (padsUsed % 2 == 0) { //Checks if the pads used is a multiple of 2 and makes the player go up and increases the pads used by 1

        target.position.y -= 160;
        target.velocityX = 0;
        target.velocityY = 0;
        padsUsed += 1;
    }

    else if (padsUsed % 2 !== 0 && target.position.y + 80 < 481) { //If the pads used is not a multiple of 2 the player is sent down and the pads used increases by 1

        target.position.y += 80;
        target.velocityX = 0;
        target.velocityY = 0;
        padsUsed += 1;
    }


}

//Function to send player to the start if they collide with something dangerous, sets the variables to their initial state as if the hasn't started yet
function removePlayer(target, spike) {

    target.velocityX = 0;
    target.velocityY = 0;
    target.position.x = 100;
    target.position.y = 480;
    padsUsed = 0;

}

//Function to "remove" the player's attack. Does this by hiding it off screen so it can be used again when needed
function removeAttack(attack, target) {
    attack.position.x = -25;
}
//Function to "remove" the enemy and the player's attack. Hides both off screen
function removeEnemy(attack, target) {
    attack.position.x = -25;
    target.position.x = -25;
}


//Functions to move projectiles across screen, each of the 4 moveProjectile functions move the projectile in a certain direction
//The differences between the functions are the X or Y velocities and the point where the projectile is sent back to its starting point
function moveProjectileLeft(projectile) {

    projectile.velocityX = -12.5;

    if (projectile.position.x < 1) {

        projectile.position.x = 1000;
    }
}

function moveProjectileRight(projectile) {

    projectile.velocityX = 12.5;

    if (projectile.position.x > 900) {

        projectile.position.x = -100;
    }
}

function moveProjectileDown(projectile) {

    projectile.velocityY = 6.25;

    if (projectile.position.y > 350) {

        projectile.position.y = -100;
    }
}

function moveProjectileUp(projectile) {

    projectile.velocityY = -6.25;

    if (projectile.position.y < 0) {

        projectile.position.y = 340;
    }
}

//Function to end the game. Used in the collision between the player and the end point. Sets variables back to their initial values and logs Game End in the console
function reachEnd(target) {

    console.log("Game End");
    target.position.x = 100;
    target.position.y = 480;
    enemy1.position.x = 500;
    padsUsed = 0;
}


//Function to play the background music
function playBgMusic() {

    if (timesPressed % 2 == 0) { //Checks if the button was pressed an even number of times, if it has the music is played and the timesPressed is increase by 1

        bgMusic.loop();
        bgMusic.play();
        timesPressed += 1;
    }

    else { //The music is stopped and timesPressed is increased by 1 if the timesPressed was an odd number

        bgMusic.stop();
        timesPressed += 1;
    }


}

//Function to move the player's attack
function attackPlayer(attack) {

    if (lastMove == "right") { //Checks if the right arrow was pressed and makes the attack move to the right of the player

        attack.position.x = player.position.x;
        attack.position.y = player.position.y;
        attack.velocityX = 15;
        player.velocityX = player.velocityX - 12.5;
    }

    else if (lastMove == "left") { //Checks if the left arrow was pressed and makes the attack move to the left of the player

        attack.position.x = player.position.x;
        attack.position.y = player.position.y;
        attack.velocityX = -15;
        player.velocityX = player.velocityX + 12.5;
    }

    else { //If no key has been pressed the attack goes to the right of the player

        attack.position.x = player.position.x;
        attack.position.y = player.position.y;
        attack.velocityX = 15;
        player.velocityX = player.velocityX - 12.5;
    }



}

//Function to move the enemy. Unused in the game
function moveEnemy(enemy) {

    move1 = Math.floor(Math.random()) //Making move 1 a random number


    move2 = Math.floor(Math.random()) * 10; //Making move to a random number and multiplying it by 10

    //Adds move 2 to the enemy's x position if move 1 is even, otherwise subtracts move 2 from the enemy's x position
    if (move1 % 2 == 0) {

        enemy.position.x += move2;
    }
    else {

        enemy.position.x -= move2;
    }
}

//Function to generate a random number between to numbers
function numGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Function to save the state of the game by assigning the current values to the saved version of the value
function savePosition() {
    playerSavedX = player.position.x;
    playerSavedY = player.position.y;
    enemy1SavedX = enemy1.position.x;
    enemy1SavedY = enemy1.position.y;
    enemy2SavedX = enemy2.position.x;
    enemy2SavedY = enemy2.position.y;
    savedPadsUsed = padsUsed;
}

//Makes the current values of the game variables into the saved version to restore the save game state
function loadSave() {
    player.position.x = playerSavedX;
    player.position.y = playerSavedY;
    enemy1.position.x = enemy1SavedX;
    enemy1.position.y = enemy1SavedY;
    enemy2.position.x = enemy2SavedX;
    enemy2.position.y = enemy2SavedY;
    lastMove = ""
    padsUsed = savedPadsUsed;
}

//Function to make an enemy follow the player, does this by moving the enemy towards the player depending on the difference between their x and y values
function followPlayer(enemy) {
    if (player.position.x - enemy.position.x > 0) {
        enemy.velocityX = 3.8;
    }
    else if (player.position.x - enemy.position.x < 0) {
        enemy.velocityX = -3.8;
    }
    if (player.position.y - enemy.position.y > 0) {
        enemy.velocityY = 2;
    }
    else if (player.position.y - enemy.position.y < 0) {
        enemy.velocityY = -2;
    }
}
