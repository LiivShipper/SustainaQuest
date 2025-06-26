import { Scene } from 'phaser';
import { atualizarVisibilidadeXP } from './barraXP.js';

export class Finaljogo extends Scene {
    constructor() {
        super('FinalJogo');
    }

    preload() {
        this.load.image('finalGame', 'assets/finalGame.png');
    }

    create() {
        atualizarVisibilidadeXP('final');
        this.add.image(512, 384, 'finalGame');

        document.fonts.load('10pt "Equestria"').then(() => {
            const finalTexto = this.add.text(512, 600, 'Novo jogo', {
                fontFamily: 'Equestria',
                fontSize: 60,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5);

            finalTexto.setInteractive();

            finalTexto.on('pointerdown', () => {
                this.scene.start('MainMenu'); // ou 'Game'
            });

            finalTexto.on('pointerover', () => {
                this.input.setDefaultCursor('pointer');
            });

            finalTexto.on('pointerout', () => {
                this.input.setDefaultCursor('default');
            });
        });
    }
}