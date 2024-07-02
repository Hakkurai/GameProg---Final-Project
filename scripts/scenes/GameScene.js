class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    // Load assets needed for the game
    this.load.image('player', 'assets/character/pinkguy.jpg') // Replace with the actual path to your player image
  }

  create() {
    // Set up your game objects and logic
    this.player = this.physics.add.sprite(400, 300, 'player')

    // Set camera to follow the player
    this.cameras.main.startFollow(this.player)
    this.cameras.main.setZoom(2)
    this.cameras.main.setBackgroundColor('#87CEEB')

    // Example input to move the player
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    // Update the player's movement based on cursor input
    let velocityX = 0
    let velocityY = 0
  
    if (this.cursors.left.isDown) {
      velocityX = -160
      this.player.flipX = true
      console.log('Left key pressed')
    } else if (this.cursors.right.isDown) {
      velocityX = 160
      this.player.flipX = false
      console.log('Right key pressed')
    }
  
    if (this.cursors.up.isDown) {
      velocityY = -160
      console.log('Up key pressed')
    } else if (this.cursors.down.isDown) {
      velocityY = 160
      console.log('Down key pressed')
    }
  
    this.player.setVelocity(velocityX, velocityY)
  }  
}

export default GameScene
