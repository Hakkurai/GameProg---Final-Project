import GameScene from './scenes/GameScene.js'
import MainMenuScene from './scenes/MainMenuScene.js'
import MiniGameScene from './scenes/MiniGameScene.js'
import DiaryUI from './scenes/DiaryUI.js'

var config = {
  type: Phaser.AUTO,
  width: 1300,
  height: 720,
  scene: [MainMenuScene, GameScene, MiniGameScene, DiaryUI],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
}
  
var game = new Phaser.Game(config)
