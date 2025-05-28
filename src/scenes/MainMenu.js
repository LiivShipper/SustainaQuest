import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    preload () {
        this.load.image('fundoMainMenu', 'assets/fundoMainMenu.png');
        this.load.image('logoSustainaQuest', 'assets/logoSustainaQuest.png');
    }

    create () {
        this.add.image(512, 384, 'fundoMainMenu');
        this.add.image(512, 300, 'logoSustainaQuest');

         document.fonts.load('10pt "Equestria"').then(() => {
            const menuTexto = this.add.text(512, 600, 'Main Menu', {
                fontFamily: 'Equestria',
                fontSize: 50,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5);

            menuTexto.setInteractive();

            menuTexto.on('pointerdown', () => {
                this.scene.start('Game');
            });

            menuTexto.on('pointerover', () => {
                this.input.setDefaultCursor('pointer');
            });

            menuTexto.on('pointerout', () => {
                this.input.setDefaultCursor('default');
            });
        });
    }
}