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

var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/jamesBond.gif");
    game.load.audio ("score", "assets/Youre-a-wizard-Harry.mp3");
    game.load.image ("pipe", "assets/pipe.png");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#66FF66")
    game.add.text(260, 200, "Let the games begin!", {font: "30px Arial", fill: "#CC0099"})
    game.add.sprite(20, 50, "playerImg");
    //game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
    label_score = game.add.text (20, 20, "0");
    player = game.add.sprite(100, 200, "playerImg");
    game.input.keyboard.addKey (Phaser.Keyboard.L) .onDown.add(moveRight);
    game.input.keyboard.addKey (Phaser.Keyboard.J).onDown.add(moveLeft);
    game.input.keyboard.addKey (Phaser.Keyboard.K).onDown.add(moveDown);
    game.input.keyboard.addKey (Phaser.Keyboard.I).onDown.add(moveUp);
    /*for (var count = 0; count < 3; count++) {
        game.add.sprite(20, 250+(50 * count), "pipe");
        game.add.sprite(140, 50 * count, "pipe");
    }

    for (var count = 0; count < 4; count++) {
        game.add.sprite(540, 50 * count, "pipe");
        game.add.sprite(700, 200+(50 * count), "pipe");
        game.add.sprite(350, 200+(50 * count), "pipe");
    }

    for (var count = 0; count < 8; count++){
        if(count != 4){
            game.add.sprite(400, 50 * count, "pipe");
        }
    }*/
    pipes = game.add.group();
    generate_pipe();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.gravity.y = 350;
    pipe_interval = 1.5;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe)
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);

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
    player.x = player.x + 5
}
function moveLeft() {
    player.x = player.x - 5
}
function moveDown() {
    player.y = player.y + 10
}
function moveUp() {
    player.y = player.y - 10
}

function generate_pipe (){
    var gap = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count++) {
        if(count != gap && count != gap+1){
           // game.add.sprite(0, count * 50, "pipe");
            add_pipe_block(800, count * 50);
            changeScore();

        }
    }
}
function add_pipe_block(x, y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = - 230;
}
function player_jump() {
    player.body.velocity.y = -190;
}
function game_over(){
    game.destroy();

}
