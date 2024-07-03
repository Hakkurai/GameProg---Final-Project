class MiniGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MiniGameScene' })
  }

  preload() {
    // Load assets needed for the mini-game
        this.load.image('miniPlayer', 'assets/character/pinkguy.jpg');
        this.load.image('background', 'assets/background/bg.jpg'); // Replace with your actual path
  }

  create() {
    // Create background image and set its size to cover the game world
    this.add.image(400, 300, 'background').setOrigin(0.5).setDisplaySize(800, 600); 

    // Set up your mini-game objects and logic
    this.miniPlayer = this.physics.add.sprite(400, 300, 'miniPlayer')

    // Enable collision detection for the player
    this.miniPlayer.setCollideWorldBounds(true)

    // Set camera to follow the player
    this.cameras.main.startFollow(this.miniPlayer)
    this.cameras.main.setZoom(2)

    // Example input to move the player
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    // Update the player's movement based on cursor input
    let velocityX = 0
    let velocityY = 0

    if (this.cursors.left.isDown) {
      velocityX = -160
      this.miniPlayer.flipX = true
    } else if (this.cursors.right.isDown) {
      velocityX = 160
      this.miniPlayer.flipX = false
    }

    if (this.cursors.up.isDown) {
      velocityY = -160
    } else if (this.cursors.down.isDown) {
      velocityY = 160
    }

    this.miniPlayer.setVelocity(velocityX, velocityY)
  }
}

export default MiniGameScene
