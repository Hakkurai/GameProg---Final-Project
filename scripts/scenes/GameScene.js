class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', 'assets/character/pinkguy.jpg');
        this.load.image('apple', 'assets/objects/apple.jpg');
        this.load.image('orange', 'assets/objects/orange.jpg');
        this.load.image('background', 'assets/background/bg.png'); 
    }

    create() {
        // Set gravity for the world
        this.physics.world.gravity.y = 0
      
        // Add background
        this.add.image(400, 300, 'background').setOrigin(0.5).setDisplaySize(1300, 720)
        
        // Add player
        this.player = this.physics.add.sprite(400, 300, 'player')
        
        // Add apple
        this.apple = this.physics.add.sprite(200, 150, 'apple')
        this.apple.setCollideWorldBounds(true)
        
        // Add orange
        this.orange = this.physics.add.sprite(600, 450, 'orange')
        this.orange.setCollideWorldBounds(true)
        
        // Set camera to follow the player
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(1.5)
        
        // Set world bounds
        this.physics.world.setBounds(0, 0, 800, 600)
        this.player.setCollideWorldBounds(true)
        
        // Create cursor keys input
        this.cursors = this.input.keyboard.createCursorKeys()
      
        // Flag to check if orange is collected
        this.orangeCollected = false
        
        // Event listener for 'E' key press
        this.input.keyboard.on('keydown-E', () => {
          if (this.checkOverlap(this.player, this.orange) && !this.orangeCollected) {
            console.log('Player is near the orange and pressed E')
            this.orange.disableBody(true, true)
            this.orangeCollected = true
          } else if (this.checkOverlap(this.player, this.apple) && this.orangeCollected) {
            console.log('Player is near the apple and pressed E')
            this.scene.pause()
            this.scene.launch('MiniGameScene')
          } else if (this.checkOverlap(this.player, this.apple) && !this.orangeCollected) {
            console.log('Player needs to collect the orange first')
          }
        })
        
        // Example: Listen for minigame-finished event
        this.events.on('minigame-finished', (data) => {
          console.log("Player earned", data.pointsEarned, "points!")
          // Update your game state based on the data received from the minigame
        })
      }
      
      checkOverlap(spriteA, spriteB) {
        const boundsA = spriteA.getBounds()
        const boundsB = spriteB.getBounds()
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)
      }

    update() {
        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.left.isDown) {
            velocityX = -160;
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            velocityX = 160;
            this.player.flipX = false;
        }

        if (this.cursors.up.isDown) {
            velocityY = -160;
        } else if (this.cursors.down.isDown) {
            velocityY = 160;
        }

        this.player.setVelocity(velocityX, velocityY);
    }
}

export default GameScene;

// sample