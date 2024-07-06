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
    this.load.image('customCursor', 'assets/images/wand.webp');
    this.load.audio('menuMusic', 'assets/audio/mainMenuMusic.mp3');
  }

  create() {

    //music
    this.menuMusic = this.sound.add('menuMusic', { loop: true, volume: 0.5 }); // Adjust volume as needed
  this.menuMusic.play();
    // Add background image
    this.add.image(650, 360, 'menuBG')
    .setScale(0.664)
    this.customCursor = this.add.image(0, 0, 'customCursor').setOrigin(0.5).setDepth(100).setScale(0.3); // High depth for visibility
    this.input.setDefaultCursor('none'); // Hide the default cursor

  // Create Play button
  const playButton = this.add.image(650, 490, 'playBTN')
  .setOrigin(0.5)
  .setScale(0.5) // Adjust the scale as needed
  .setInteractive()
  .on('pointerdown', () => this.startGame())
  .on('pointerover', () => playButton.setScale(0.55)) // Adjust scale for hover effect
  .on('pointerout', () => playButton.setScale(0.5)) // Adjust scale for hover out effect

  // Create Quit button
  const quitButton = this.add.image(650, 590, 'quitBTN')
  .setOrigin(0.5)
  .setScale(0.5) // Adjust the scale as needed
  .setInteractive()
  .on('pointerdown', () => this.quitGame())
  .on('pointerover', () => quitButton.setScale(0.55)) // Adjust scale for hover effect
  .on('pointerout', () => quitButton.setScale(0.5)) // Adjust scale for hover out effect\

  }
  update(){
    const pointer = this.input.activePointer;
    this.customCursor.setPosition(pointer.x, pointer.y);
  

  }
  startGame() {
    this.scene.start('MiniGameScene')
    this.menuMusic.stop(); // Stop menu music
    this.scene.start('MiniGameScene');
  }

  quitGame() {
    window.close()
  }
}

export default MainMenuScene
