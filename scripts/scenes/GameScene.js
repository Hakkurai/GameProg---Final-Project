
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.spritesheet('player', 'assets/character/character.png', { frameWidth: 2048, frameHeight: 2048 });
    this.load.image('cauldron', 'assets/objects/cauldron.png');
    this.load.image('pumpkin', 'assets/objects/pumpkin.png');
    this.load.image('onion', 'assets/objects/onion.png');
    this.load.image('beetroot', 'assets/objects/beetroot.png');
    this.load.image('background', 'assets/background/bg.png');
  }

  create() {
    // Physics and World Setup
    this.physics.world.gravity.y = 0;
    this.physics.world.setBounds(0, 0, 800, 600); 

    // Background
    this.add.image(400, 300, 'background').setOrigin(0.5).setDisplaySize(1300, 720);

    // Player
    this.player = this.physics.add.sprite(400, 300, 'player').setScale(0.03).setOrigin(0.5, 0.5);
    this.player.setCollideWorldBounds(true);

    // Player animations 
    this.anims.create({ key: 'down',  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'left',  frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'up', frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'turn',  frames: [{ key: 'player', frame: 0 }], frameRate: 20 }); 

    // Objects (cauldron, vegetables)
    this.cauldron = this.physics.add.sprite(200, 150, 'cauldron').setScale(0.1).setCollideWorldBounds(true);
    this.pumpkin = this.physics.add.sprite(600, 450, 'pumpkin').setScale(0.03).setCollideWorldBounds(true);
    this.onion = this.physics.add.sprite(400, 450, 'onion').setScale(0.03).setCollideWorldBounds(true);
    this.beetroot = this.physics.add.sprite(400, 200, 'beetroot').setScale(0.03).setCollideWorldBounds(true);

    // Camera & Zoom
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);

    // Cursor Keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Item Collection Flags
    this.pumpkinCollected = false;
    this.onionCollected = false;
    this.beetrootCollected = false;

    // Event Listener for 'E' key press (your existing interaction logic)
    this.input.keyboard.on('keydown-E', () => { /* ... your existing interaction code ... */ });

    // Minigame Finished Event Listener (your existing code)
    this.events.on('minigame-finished', (data) => {
      console.log("Player earned", data.pointsEarned, "points!");
      this.player.setVisible(true); 
      // ... (update your game state based on the minigame results)
    });
  }

  update() {
    let velocityX = 0;
    let velocityY = 0;

    // Movement based on cursor keys (your existing code)
    if (this.cursors.left.isDown) {
      velocityX = -160;
    } else if (this.cursors.right.isDown) {
      velocityX = 160;
    }
    if (this.cursors.up.isDown) {
      velocityY = -160;
    } else if (this.cursors.down.isDown) {
      velocityY = 160;
    }

    // Handle player animation and flipping
    if (this.cursors.left.isDown) {
      this.player.setFlipX(true); // Ensure player faces left
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(false);  // Flip player to face right
    }

    // Play the appropriate animation based on movement
    if (velocityY < 0) { // Up
      this.player.anims.play('up', true);
    } else if (velocityY > 0) { // Down
      this.player.anims.play('down', true);
    } else if (velocityX !== 0) { // Left or Right (use flipX to decide)
      this.player.anims.play(this.player.flipX ? 'right' : 'left', true);
    } else { // No movement
      this.player.anims.play('turn', true);
    }
  
    this.player.setVelocity(velocityX, velocityY);

  }

 checkOverlap(spriteA, spriteB) {

 const boundsA = spriteA.getBounds()
    
const boundsB = spriteB.getBounds()
    
return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)
    
 }
    
    
 
}

export default GameScene;
