class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' })
    }
  
    preload() {
      this.load.image('player', 'assets/character/pinkguy.jpg')
      this.load.image('cauldron', 'assets/objects/cauldron.png') // Load cauldron image
      this.load.image('pumpkin', 'assets/objects/pumpkin.png') // Load pumpkin image
      this.load.image('background', 'assets/background/bg.png')
    }
  
    create() {
      // Set gravity for the world
      this.physics.world.gravity.y = 0
  
      // Add background
      this.add.image(400, 300, 'background').setOrigin(0.5).setDisplaySize(1300, 720)
  
      // Add player
      this.player = this.physics.add.sprite(400, 300, 'player')
  
      // Add cauldron
      this.cauldron = this.physics.add.sprite(200, 150, 'cauldron')
      this.cauldron.setScale(0.3)
      this.cauldron.setCollideWorldBounds(true)
  
      // Add pumpkin
      this.pumpkin = this.physics.add.sprite(600, 450, 'pumpkin') // Use pumpkin image
      this.pumpkin.setScale(0.04)
      this.pumpkin.setCollideWorldBounds(true)
  
      // Set camera to follow the player
      this.cameras.main.startFollow(this.player)
      this.cameras.main.setZoom(2)
  
      // Set world bounds
      this.physics.world.setBounds(0, 0, 800, 600)
      this.player.setCollideWorldBounds(true)
  
      // Create cursor keys input
      this.cursors = this.input.keyboard.createCursorKeys()
  
      // Flag to check if pumpkin is collected
      this.pumpkinCollected = false
  
      // Event listener for 'E' key press
      this.input.keyboard.on('keydown-E', () => {
        if (this.checkOverlap(this.player, this.pumpkin) && !this.pumpkinCollected) {
          console.log('Player is near the pumpkin and pressed E')
          this.pumpkin.disableBody(true, true)
          this.pumpkinCollected = true
        } else if (this.checkOverlap(this.player, this.cauldron) && this.pumpkinCollected) {
          console.log('Player is near the cauldron and pressed E')
          this.player.setVisible(false) // Hide player before entering MiniGameScene
          this.scene.pause()
          this.scene.launch('MiniGameScene')
        } else if (this.checkOverlap(this.player, this.cauldron) && !this.pumpkinCollected) {
          console.log('Player needs to collect the pumpkin first')
        }
      })
  
      // Example: Listen for minigame-finished event
      this.events.on('minigame-finished', (data) => {
        console.log("Player earned", data.pointsEarned, "points!")
        this.player.setVisible(true) // Show player when returning from MiniGameScene
        // Update your game state based on the data received from the minigame
      })
    }
  
    checkOverlap(spriteA, spriteB) {
      const boundsA = spriteA.getBounds()
      const boundsB = spriteB.getBounds()
      return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)
    }
  
    update() {
      let velocityX = 0
      let velocityY = 0
  
      if (this.cursors.left.isDown) {
        velocityX = -160
        this.player.flipX = true
      } else if (this.cursors.right.isDown) {
        velocityX = 160
        this.player.flipX = false
      }
  
      if (this.cursors.up.isDown) {
        velocityY = -160
      } else if (this.cursors.down.isDown) {
        velocityY = 160
      }
  
      this.player.setVelocity(velocityX, velocityY)
    }
  }
  
  export default GameScene
  