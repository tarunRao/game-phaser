import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

export class DemoGame {
    
    game: Phaser.Game;
    platforms: any;
    hitPlatform: any;
    player: any;
    cursors: any;   
    stars: any;
    score: number;
    scoreText: any;

    constructor() {
        this.game = new Phaser.Game(
            500,
            400,
            Phaser.AUTO,
            'content',
            {
                preload: this.preload,
                create: this.create,
                update: this.update,
                collectStar: this.collectStar
            }
        );
    }

    preload() {
        this.game.load.image('sky', 'sky.png');
        this.game.load.image('ground', 'platform.png');
        this.game.load.image('star', 'star.png');
        this.game.load.spritesheet('dude', 'dude.png', 32, 48);
    }

    create() {
        /*
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);

        this.game.add.tween(logo.scale).to({x: 1, y: 1}, 2000, Phaser.Easing.Bounce.Out, true);
        */
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        let sky = this.game.add.sprite(0, 0, 'sky');
        sky.scale.setTo(0.7, 0.7);

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        let ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        let ledge = this.platforms.create(300, 250, 'ground');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;
        
        ledge = this.platforms.create(0, 200, 'ground');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        this.game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.stars = this.game.add.group();
        this.stars.enableBody = true;

        for(let i = 0; i < 12; i++) {
            let star = this.stars.create(i * 42, 0, 'star');
            star.body.gravity.y = 6;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        this.score = 0;
        this.scoreText = this.game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.stars, this.platforms);
        
        this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);        

        this.player.body.velocity.x = 0;

        if(this.cursors.left.isDown) {
            this.player.body.velocity.x = -100;
            this.player.animations.play('left');
        } else if(this.cursors.right.isDown) {
            this.player.body.velocity.x = 100;
            this.player.animations.play('right');
        } else {
            this.player.animations.stop();
            this.player.frame = 4;
        }

        if(this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -250;
        }
    }

    collectStar(player, star) {
        star.kill();

        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
    }
}