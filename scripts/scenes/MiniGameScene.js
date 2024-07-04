class MiniGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MiniGameScene' })
  }

  preload() {

    this.load.image('background2', 'assets/background/bg2.png') // Replace with your actual path
  }

  create() {
    // Set gravity for the world
    this.physics.world.gravity.y = 0

    this.add.image(400, 300, 'background2').setOrigin(0.5).setDisplaySize(800, 600)

    this.miniPlayer.setCollideWorldBounds(true)

    this.cursors = this.input.keyboard.createCursorKeys()

    // Back button logic (example)
    this.input.keyboard.on('keydown-B', () => {
      this.scene.stop()
      this.scene.resume('GameScene')
    })

    // Minigame completion logic (example)
    // Replace this with your actual minigame completion condition
    setTimeout(() => {
      this.events.emit('minigame-finished', { pointsEarned: 100 })
      this.scene.stop()
      this.scene.resume('GameScene')
    }, 5000) // Simulate minigame ending after 5 seconds
  }

  update() {
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
