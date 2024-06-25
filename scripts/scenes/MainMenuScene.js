class MainMenuScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainMenuScene' })
    }
  
    preload() {
      // Load any assets needed for the menu
    }
  
    create() {
      // Create Play button
      const playButton = this.add.text(400, 300, 'Play', { fill: '#0f0' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.startGame())
  
      // Create Quit button
      const quitButton = this.add.text(400, 400, 'Quit', { fill: '#f00' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.quitGame())
    }
  
    startGame() {
      this.scene.start('GameScene')
    }
  
    quitGame() {
      window.close()
    }
  }
  
  export default MainMenuScene
  