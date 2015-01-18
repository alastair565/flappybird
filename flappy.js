// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;

var label_score;

var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/jamesBond.gif");
    game.load.audio ("score", "assets/Youre-a-wizard-Harry.mp3");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#66FF66")
    game.add.text(260, 200, "Let the games begin!", {font: "30px Arial", fill: "#CC0099"})
    game.add.sprite(20, 50, "playerImg");
    //game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeScore);
    label_score = game.add.text (20, 20, "0");
    player = game.add.sprite(100, 200, "playerImg");
    game.input.keyboard.addKey (Phaser.Keyboard.RIGHT) .onDown.add(moveRight);
    game.input.keyboard.addKey (Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keybpard.addKey (Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.input.keyboard.addKey (Phaser.Keyboard.UP).onDown.add(moveUp);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}

function changeScore() {
    score = score + 1;
   label_score.setText (score.toString()) ;
    
}

function clickHandler(event){
    //alert(event.x + ":" + event.y);
    //game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler(){
    game.sound.play("score");
}

function moveRight() {
    player.x = player.x + 1
}
function moveLeft() {
    player.x = player.x - 1
}
function moveDown() {
    player.y = player.y + 1
}
function moveUp() {
    player.y = player.y - 1
}