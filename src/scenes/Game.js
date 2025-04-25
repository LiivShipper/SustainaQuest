import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('tiles', 'assets/tilesets.png');
        this.load.tilemapTiledJSON('mapa', 'assets/sustainaQuest.json');
        //this.load.image('player', 'assets/player.png');
    }

    create() {
        const mapa = this.make.tilemap({ key: 'mapa' });
        const elementos = mapa.addTilesetImage('tilesets', 'tiles');

        const camadaGrama = mapa.createLayer('grama', elementos, 0, 0);
        const camadaAgua = mapa.createLayer('agua', elementos, 0, 0);
        const camadaVila = mapa.createLayer('vila', elementos, 0, 0);
        const camadaEnergiaEolica = mapa.createLayer('energiaEolica', elementos, 0, 0);
        const camadaEnergiaHidreletrica = mapa.createLayer('energiaHidreletrica', elementos, 0, 0);
        const camadaEnergiaMaremotriz = mapa.createLayer('energiaMaremotriz', elementos, 0, 0);
        const camadaEnergiaBiomassa = mapa.createLayer('energiaBiomassa', elementos, 0, 0);
        const camadaEnergiaHidrogenio = mapa.createLayer('energiaHidrogenio', elementos, 0, 0);
        const camadaEnergiaSolar = mapa.createLayer('energiaSolar', elementos, 0, 0);
        const camadaEnergiaGeotermica = mapa.createLayer('energiaGeotermica', elementos, 0, 0);

        this.cameras.main.setZoom(0.8);
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);


        //player = this.physics.add.sprite(100, 300, "player");
    }

    /*update() {
        cursors = this.input.keyboard.createCursorKeys()

        if(cursors.left.isDown) {
            player.body.setVelocityX(-100)
        } else if (cursors.right.isDown) {
            player.body.setVelocityX(100)
        } else if (cursors.up.isDown) {
            player.body.setVelocityY(-100) 
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(100)
        }
    }*/
}