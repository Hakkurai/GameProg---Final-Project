import GameScene from './scenes/GameScene.js'
import MainMenuScene from './scenes/MainMenuScene.js'
import MiniGameScene from './scenes/MiniGameScene.js'

var config = {
  type: Phaser.AUTO,
  width: 1300,
  height: 720,
  scene: [MainMenuScene, GameScene, MiniGameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  pixelArt: true, 
  roundPixels: true // Round pixels to avoid sub-pixel rendering
}

var game = new Phaser.Game(config)
