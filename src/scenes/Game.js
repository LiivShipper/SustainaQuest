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
        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 32,
            frameHeight: 64,
        });
    }

    create() {
        this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);

        const mapa = this.make.tilemap({ key: 'mapa' });
        mapa.setRenderOrder('right-down');
        const tileset = mapa.addTilesetImage('tilesets', 'tiles');

        const nomesCamadas = [
            'grama',
            'agua',
            'vila',
            'energiaEolica',
            'energiaHidreletrica',
            'energiaMaremotriz',
            'energiaBiomassa',
            'energiaHidrogenio',
            'energiaSolar',
            'energiaGeotermica',
            'porBaixo'
        ];

        const camadas = nomesCamadas.map(nome => mapa.createLayer(nome, tileset, 0, 0));
        const camadaPorBaixo = camadas.find(layer => layer.layer.name === 'porBaixo');
        if (camadaPorBaixo) camadaPorBaixo.setDepth(10);

        const spawnPoint = mapa.findObject('player', obj => obj.name === 'spawnPoint');
        console.log(spawnPoint);

        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player").setScale(1.2);
        this.player.body.setSize(20, 32);
        this.player.body.setOffset(6, 32);

        this.cursors = this.input.keyboard.createCursorKeys();

        camadas.forEach(camada => {
            camada.setCollisionByProperty({ colider: true });
            this.physics.add.collider(this.player, camada);
        });

        this.criarAnimacoes();

        const camera = this.cameras.main;
        camera.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        camera.startFollow(this.player);
        camera.setZoom(1.5);
    }

    update() {
        if (!this.cursors || !this.player) return;

        const prevVelocity = this.player.body.velocity.clone();
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-150);
            this.player.anims.play('esquerda', true);
            this.player.setFlipX(false);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(150);
            this.player.anims.play('direita', true);
            this.player.setFlipX(false);
        } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-150);
            this.player.anims.play('tras', true);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(150);
            this.player.anims.play('frente', true);
        } else {
            this.player.anims.stop();
            this.definirFrameParado(prevVelocity);
        }
    }

    criarAnimacoes() {
        this.anims.create({
            key: 'frente',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tras',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('player', { start: 30, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
    }

    definirFrameParado(velocidade) {
        if (velocidade.x < 0) {
            this.player.setFrame(30);
        } else if (velocidade.x > 0) {
            this.player.setFrame(20);
        } else if (velocidade.y < 0) {
            this.player.setFrame(10);
        } else if (velocidade.y > 0) {
            this.player.setFrame(0);
        }
    }
}
