import { Game } from './scenes/Game';
import { Finaljogo } from './scenes/FinalJogo';
import { MainMenu } from './scenes/MainMenu';
import { atualizarXP } from './scenes/barraXP';
import { FeedbackScene } from './scenes/FeedbackScene';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  pixelart: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    MainMenu,
    Game,
    Finaljogo,
    FeedbackScene
  ]
};


export default new Phaser.Game(config);
