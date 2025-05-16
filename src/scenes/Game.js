import { Scene } from 'phaser';
import { quizData } from './quizData.js';     
import { QuizModal } from './QuizModal.js';   

export class Game extends Scene {
    constructor() {
        super('Game');
        this.player = null;
        this.cursors = null;
    }

    preload() {
        this.load.image('tiles', 'assets/tilesets.png');
        this.load.tilemapTiledJSON('mapa', 'assets/sustainaQuest.json');
        this.load.spritesheet('player', 'assets/player22.png', {
            frameWidth: 32,
            frameHeight: 32,
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
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player").setScale(2);
        this.player.body.setSize(14, 12);
        this.player.body.setOffset(9, 20);

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

         
        const energias = [
            'energiaEolica',
            'energiaHidreletrica',
            'energiaMaremotriz',
            'energiaBiomassa',
            'energiaHidrogenio',
            'energiaSolar',
            'energiaGeotermica',
        ];

       
        this.input.on('pointerdown', pointer => {
            for (const nome of energias) {
                const camadaEnergia = camadas.find(layer => layer.layer.name === nome);
                if (!camadaEnergia) continue;

            
                const tile = camadaEnergia.getTileAtWorldXY(pointer.worldX, pointer.worldY);
                if (tile) {
                    
                    this.mostrarInfoEnergia(nome);
                    break; 
                }
            }
        });
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
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tras',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
    }

    definirFrameParado(velocidade) {
        if (velocidade.x < 0) {
            this.player.setFrame(18);
        } else if (velocidade.x > 0) {
            this.player.setFrame(12);
        } else if (velocidade.y < 0) {
            this.player.setFrame(6);
        } else if (velocidade.y > 0) {
            this.player.setFrame(0);
        }
    }

    mostrarInfoEnergia(nome) {
        const mapa = {
            energiaEolica:    'energiaEolica',
            energiaHidreletrica: 'hidreletrica',
            energiaMaremotriz:   'maremotriz',
            energiaBiomassa:     'biomassa',
            energiaHidrogenio:   'hidrogenio',
            energiaSolar:        'energiaSolar',
            energiaGeotermica:   'geotermica'
        };

        const chaveQuiz = mapa[nome];
        if (!chaveQuiz) {
            console.warn('Quiz não encontrado para', nome);
            return;
        }

        const preguntas = quizData[chaveQuiz];

        new QuizModal(preguntas, () => {
            console.log('Quiz finalizado');
        });
    }
}
