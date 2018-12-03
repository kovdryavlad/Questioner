'use strict';

require('phaser');



//game 
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let player;

function preload ()
{
    this.load.image('sky', './sky.png');
    this.load.image('ground', './platform.png');
    this.load.image('star', './star.png');
    this.load.image('bomb', './bomb.png');
    this.load.spritesheet('dude','./dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

let platforms;
let cursors;

let stars;
let bombs;

let score = 0;
let scoreText;

let name;
let age

let gameOver = false;

let setUserInfo;

function create ()
{
    this.add.image(400, 300, 'sky');
    
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    //player
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    //adding a colider player with platforms
    this.physics.add.collider(player, platforms);

    //animations
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //creating cursors object
    cursors = this.input.keyboard.createCursorKeys();

    //stars
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });

    //adding a colider for stars and platforms
    this.physics.add.collider(stars, platforms);

    //collecting stars
    this.physics.add.overlap(player, stars, collectStar, null, this);

    //score text setting
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    name = this.add.text(650, 20, 'gamer: '+ name, { fontSize: '14px', fill: '#000' });
    age = this.add.text(650, 40, 'age: '+ age, { fontSize: '12px', fill: '#000' });

    ////bombs
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //incrementing score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

function update ()
{
    if (cursors.left.isDown){
        player.setVelocityX(-160);

        if(!gameOver){
            player.anims.play('left', true);
        }
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        if(!gameOver){
            player.anims.play('right', true);
        }
    }
    else{
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    }
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
    console.log(event.data);

    let arr = event.data.split(',')

    name.setText("name:" + arr[0]);
    age.setText("age:" + arr[1]);
    
}