import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

export class DemoGame {
    
    game: Phaser.Game;
    
    constructor() {
        this.game = new Phaser.Game(
            500,
            400,
            Phaser.AUTO,
            'content',
            {
                preload: this.preload,
                create: this.create
            }
        );
    }

    preload() {
        this.game.load.image('logo', 'phaser2.png');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }
}