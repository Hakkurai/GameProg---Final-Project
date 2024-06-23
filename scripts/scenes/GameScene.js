class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' })
    }
  
    preload() {
      // Load assets needed for the game
      this.load.image('player', 'path/to/player/image.png') // Replace with the actual path to your player image
    }
  
    create() {
      // Set up your game objects and logic
      this.player = this.physics.add.sprite(400, 300, 'player')
  
      // Set camera to follow the player
      this.cameras.main.startFollow(this.player)
  
      // Example input to move the player
      this.cursors = this.input.keyboard.createCursorKeys()
    }
  
    update() {
      // Update the player's movement based on cursor input
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160)
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160)
      } else {
        this.player.setVelocityX(0)
      }
  
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160)
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160)
      } else {
        this.player.setVelocityY(0)
      }
    }
  }
  
  export default GameScene
  