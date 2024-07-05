class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  preload() {
    // Load background image for the menu
    this.load.image('menuBG', 'assets/background/menuBG.png')
    // Load button images
    this.load.image('playBTN', 'assets/menuButtons/playBTN.png')
    this.load.image('quitBTN', 'assets/menuButtons/quitBTN.png')
  }

  create() {
    // Add background image
    this.add.image(650, 350, 'menuBG').setOrigin(0.5)

  // Create Play button
  const playButton = this.add.image(1000, 200, 'playBTN')
  .setOrigin(0.5)
  .setScale(0.5) // Adjust the scale as needed
  .setInteractive()
  .on('pointerdown', () => this.startGame())
  .on('pointerover', () => playButton.setScale(0.55)) // Adjust scale for hover effect
  .on('pointerout', () => playButton.setScale(0.5)) // Adjust scale for hover out effect

  // Create Quit button
  const quitButton = this.add.image(1000, 350, 'quitBTN')
  .setOrigin(0.5)
  .setScale(0.5) // Adjust the scale as needed
  .setInteractive()
  .on('pointerdown', () => this.quitGame())
  .on('pointerover', () => quitButton.setScale(0.55)) // Adjust scale for hover effect
  .on('pointerout', () => quitButton.setScale(0.5)) // Adjust scale for hover out effect\

  }
  startGame() {
    this.scene.start('GameScene')
  }

  quitGame() {
    window.close()
  }
}

export default MainMenuScene
