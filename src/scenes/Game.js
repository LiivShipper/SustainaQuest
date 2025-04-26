import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.player = null;
        this.cursors = null;
    }

    preload() {
        this.load.image('tiles', 'assets/tilesets.png');
        this.load.tilemapTiledJSON('mapa', 'assets/sustainaQuest.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 198, frameHeight: 293 }); 
    }

    create() {
        const mapa = this.make.tilemap({ key: 'mapa' });
        const elementos = mapa.addTilesetImage('tilesets', 'tiles');

        mapa.createLayer('grama', elementos, 0, 0);
        mapa.createLayer('agua', elementos, 0, 0);
        mapa.createLayer('vila', elementos, 0, 0);
        mapa.createLayer('energiaEolica', elementos, 0, 0);
        mapa.createLayer('energiaHidreletrica', elementos, 0, 0);
        mapa.createLayer('energiaMaremotriz', elementos, 0, 0);
        mapa.createLayer('energiaBiomassa', elementos, 0, 0);
        mapa.createLayer('energiaHidrogenio', elementos, 0, 0);
        mapa.createLayer('energiaSolar', elementos, 0, 0);
        mapa.createLayer('energiaGeotermica', elementos, 0, 0);

        this.cameras.main.setZoom(0.8);
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);

        this.player = this.physics.add.sprite(100, 300, "player"); 
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (!this.cursors || !this.player) return;

        this.player.body.setVelocity(0); 
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(100);
        }

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(100);
        }
    }
}

