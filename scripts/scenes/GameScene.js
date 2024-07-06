class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.spritesheet('player', 'assets/character/character.png', { frameWidth: 2048, frameHeight: 2048 });
    this.load.image('tree', 'assets/objects/tree.png');
    this.load.image('tree2', 'assets/objects/tree.png');
    this.load.image('grass', 'assets/objects/grass.png');
    this.load.image('grass2', 'assets/objects/grass.png');
    this.load.image('grass3', 'assets/objects/grass.png');
    this.load.image('fence', 'assets/objects/fence.png');
    this.load.image('fence2', 'assets/objects/fence.png');
    this.load.image('fence3', 'assets/objects/fence.png');
    this.load.image('fence4', 'assets/objects/fence.png');
    this.load.image('fence5', 'assets/objects/fence.png');
    this.load.image('fence6', 'assets/objects/fence.png');
    this.load.image('fence7', 'assets/objects/fence.png');
    this.load.image('fence8', 'assets/objects/fence.png');
    this.load.image('cauldron', 'assets/minigameObjects/mgCauldron.png');
    this.load.image('pumpkin', 'assets/objects/pumpkin.png');
    this.load.image('onion', 'assets/objects/onion1.png');
    this.load.image('beetroot', 'assets/objects/beetroot.png');
    this.load.image('background', 'assets/background/bg.png');
    this.load.audio('backgroundMusic', 'assets/audio/backgroundMusic.mp3');
    this.load.image('customCursor', 'assets/images/wand.webp'); 
    this.load.audio('walk', 'assets/audio/walk.mp3'); 
  }

  create() {
    //cursor
    this.customCursor = this.add.image(0, 0, 'customCursor').setOrigin(0.5).setDepth(100).setScale(0.2); // High depth for visibility
    this.input.setDefaultCursor('none'); // Hide the default cursor
    //bgm
    this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
    this.backgroundMusic.play(); 
    // Physics and World Setup
    this.physics.world.gravity.y = 0;
    this.physics.world.setBounds(0, 0, 1200, 600); 

    // Background
    this.add.image(400, 300, 'background').setOrigin(0.5).setDisplaySize(1300, 700);

    // Player
    this.player = this.physics.add.sprite(400, 300, 'player').setDisplaySize(84, 84).setDepth(1).setOrigin(0.5, 0.5);
    this.player.setCollideWorldBounds(true);
    //walk
    this.walkSound = this.sound.add('walk', { loop: true, volume: 0.5 });

    // Player animations 
    this.anims.create({ key: 'down',  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
    this.anims.create({ key: 'left',  frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }), frameRate: 5, repeat: -1 });
    this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }), frameRate: 5, repeat: -1 });
    this.anims.create({ key: 'up', frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }), frameRate: 5, repeat: -1 });
    this.anims.create({ key: 'turn',  frames: [{ key: 'player', frame: 0 }], frameRate: 20 }); 

    // Objects (cauldron, vegetables, objects)
    this.tree = this.physics.add.sprite(100, 50, 'tree').setScale(0.2).setDepth(0).setCollideWorldBounds(true);
    this.tree = this.physics.add.sprite(700, 305, 'tree2').setScale(0.2).setDepth(0).setCollideWorldBounds(true);
    this.grass = this.physics.add.sprite(105, 300, 'grass').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.grass = this.physics.add.sprite(650, 400, 'grass2').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.grass = this.physics.add.sprite(420, 200, 'grass3').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence = this.physics.add.sprite(100, 600, 'fence').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence2 = this.physics.add.sprite(205, 600, 'fence2').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence3 = this.physics.add.sprite(310, 600, 'fence3').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence3 = this.physics.add.sprite(410, 600, 'fence4').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence3 = this.physics.add.sprite(510, 600, 'fence5').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence3 = this.physics.add.sprite(610, 600, 'fence6').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence3 = this.physics.add.sprite(710, 600, 'fence7').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.fence3 = this.physics.add.sprite(810, 600, 'fence8').setScale(0.05).setDepth(0).setCollideWorldBounds(true);
    this.cauldron = this.physics.add.sprite(250, 270, 'cauldron').setScale(0.3).setDepth(0).setCollideWorldBounds(true);
    this.pumpkin = this.physics.add.sprite(610, 430, 'pumpkin').setScale(0.03).setCollideWorldBounds(true);
    this.onion = this.physics.add.sprite(100, 290, 'onion').setScale(0.03).setCollideWorldBounds(true);
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

    // Event Listener for 'E' key press
    this.input.keyboard.on('keydown-E', () => {
      if (this.checkOverlap(this.player, this.pumpkin) && !this.pumpkinCollected) {
        console.log('Player collected the pumpkin');
        this.pumpkinCollected = true;
        this.pumpkin.disableBody(true, true);
      } else if (this.checkOverlap(this.player, this.onion) && !this.onionCollected) {
        console.log('Player collected the onion');
        this.onionCollected = true;
        this.onion.disableBody(true, true);
      } else if (this.checkOverlap(this.player, this.beetroot) && !this.beetrootCollected) {
        console.log('Player collected the beetroot');
        this.beetrootCollected = true;
        this.beetroot.disableBody(true, true);
      } else if (this.checkOverlap(this.player, this.cauldron)) {
        if (this.pumpkinCollected && this.onionCollected && this.beetrootCollected) {
          this.stopAudio(); // Stop GameScene's audio
          this.player.setVisible(false);
          this.scene.pause();
          this.scene.launch('MiniGameScene');
        } else {
          console.log('Player needs to collect all vegetables first');
        }
      }
    });

    // Minigame Finished Event Listener
    this.events.on('minigame-finished', (data) => {
      console.log("Player earned", data.pointsEarned, "points!");
      this.player.setVisible(true); 
      // Update your game state based on the minigame results
    });
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
    });
  }

  update() {
    const sprintSpeed = 160;
    const baseSpeed = 80; 
    const sprintFrameRate = 10;
    const baseFrameRate = 5;

    let velocityX = 0;
    let velocityY = 0;
     const pointer = this.input.activePointer;
    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y); // Get world position under cursor
    this.customCursor.setPosition(worldPoint.x, worldPoint.y);

    const isSprinting = this.cursors.shift.isDown;

     // Movement based on WASD keys
     if (this.cursors.left.isDown) {
      velocityX = -(isSprinting ? sprintSpeed : baseSpeed);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      velocityX = isSprinting ? sprintSpeed : baseSpeed;
      this.player.setFlipX(false);
    }

    if (this.cursors.up.isDown) {
      velocityY = -(isSprinting ? sprintSpeed : baseSpeed);
    } else if (this.cursors.down.isDown) {
      velocityY = isSprinting ? sprintSpeed : baseSpeed;
    }

    // Play the appropriate animation based on movement
    if (velocityY < 0) { // Up
      this.player.anims.play('up', true);
      this.player.anims.msPerFrame = isSprinting ? 1000 / sprintFrameRate : 1000 / baseFrameRate; // Adjust frame rate
    } else if (velocityY > 0) { // Down
      this.player.anims.play('down', true);
      this.player.anims.msPerFrame = isSprinting ? 1000 / sprintFrameRate : 1000 / baseFrameRate; // Adjust frame rate
    } else if (velocityX !== 0) { // Left or Right
      this.player.anims.play(this.player.flipX ? 'left' : 'right', true);
      this.player.anims.msPerFrame = isSprinting ? 1000 / sprintFrameRate : 1000 / baseFrameRate; // Adjust frame rate
    } else { // No movement
      this.player.anims.play('turn', true);
      this.player.anims.msPerFrame = 1000 / baseFrameRate; // Reset to base frame rate for idle animation
    }
  
    this.player.setVelocity(velocityX, velocityY);

    if (velocityX !== 0 || velocityY !== 0) {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play();
      }
      this.walkSound.setRate(isSprinting ? 1.5 : 1.0); // 1.5x faster when sprinting
    } else {
      this.walkSound.stop();
    }
  }
  stopAudio() {
    this.backgroundMusic.stop(); // Stop the background music
    this.walkSound.stop(); // Stop the walking sound
}

  checkOverlap(spriteA, spriteB) {
    const boundsA = spriteA.getBounds();
    const boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }
}

export default GameScene;
