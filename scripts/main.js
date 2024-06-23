import GameScene from './scenes/GameScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainMenuScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    pixelArt: true, 
    roundPixels: true // Round pixels to avoid sub-pixel rendering
    
};

var game = new Phaser.Game(config);