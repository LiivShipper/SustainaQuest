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
            spacing: 0,
            margin: 0
        });
    }

    create() {
        this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);

        const mapa = this.make.tilemap({ key: 'mapa' });
        mapa.setRenderOrder('right-down');
        const elementos = mapa.addTilesetImage('tilesets', 'tiles');  

        const grama = mapa.createLayer('grama', elementos, 0, 0);
        const agua = mapa.createLayer('agua', elementos, 0, 0);
        const vila = mapa.createLayer('vila', elementos, 0, 0);
        const energiaEolica = mapa.createLayer('energiaEolica', elementos, 0, 0);
        const energiaHidreletrica = mapa.createLayer('energiaHidreletrica', elementos, 0, 0);
        const energiaMaremotriz = mapa.createLayer('energiaMaremotriz', elementos, 0, 0);
        const energiaBiomassa = mapa.createLayer('energiaBiomassa', elementos, 0, 0);
        const energiaHidrogenio = mapa.createLayer('energiaHidrogenio', elementos, 0, 0);
        const energiaSolar = mapa.createLayer('energiaSolar', elementos, 0, 0);
        const energiaGeotermica = mapa.createLayer('energiaGeotermica', elementos, 0, 0);
        const porBaixo = mapa.createLayer('porBaixo', elementos, 0, 0);
        porBaixo.setDepth(10);

        const camadas = [
            grama,
            agua,
            vila,
            energiaEolica,
            energiaHidreletrica,
            energiaMaremotriz,
            energiaBiomassa,
            energiaHidrogenio,
            energiaSolar,
            energiaGeotermica,
            porBaixo
        ];

        this.player = this.physics.add.sprite(70, 810, "player");
        this.player.setScale(1.2);
        this.player.body.setSize(20, 32);
        this.player.body.setOffset(6, 32);
        this.cursors = this.input.keyboard.createCursorKeys();

        camadas.forEach(camadas => {
            camadas.setCollisionByProperty({ colider: true });
            this.physics.add.collider(this.player, camadas);
        })

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

        const camera = this.cameras.main;
        camera.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        camera.startFollow(this.player);
        camera.setZoom(1.5);
    }

    update() {
        if (!this.cursors || !this.player) return;

        const prevVelocity = this.player.body.velocity.clone();
        this.player.body.setVelocity(0);

        // Movimentação
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-150);
            this.player.anims.play('esquerda', true);
            this.player.setFlipX(false);
        }
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(150);
            this.player.anims.play('direita', true);
            this.player.setFlipX(false);
        }
        else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-150);
            this.player.anims.play('tras', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(150);
            this.player.anims.play('frente', true);
        }
        else {
            this.player.anims.stop();

            if (prevVelocity.x < 0) {
                this.player.setFrame(30); // parado virado para esquerda
            } else if (prevVelocity.x > 0) {
                this.player.setFrame(20); // parado virado para direita
            } else if (prevVelocity.y < 0) {
                this.player.setFrame(10); // parado virado para cima
            } else if (prevVelocity.y > 0) {
                this.player.setFrame(0);  // parado virado para baixo
            }
        }
    }
}
