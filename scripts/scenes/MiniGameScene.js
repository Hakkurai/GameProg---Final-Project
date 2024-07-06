class MiniGameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MiniGameScene' })
    }
  
    preload() {
      this.load.image('background2', 'assets/background/bg2.png')
      this.load.image('soysauce', 'assets/minigameObjects/soysauce.png')
      this.load.image('vinegar', 'assets/minigameObjects/vinegar.png')
      this.load.image('cauldron', 'assets/minigameObjects/mgCauldron.png')
      this.load.image('salt', 'assets/minigameObjects/salt.png')
      this.load.image('sugar', 'assets/minigameObjects/sugar.png')
      this.load.image('pepper', 'assets/minigameObjects/pepper.png')
      this.load.image('oil', 'assets/minigameObjects/oil.png')
      this.load.image('meat', 'assets/minigameObjects/meat.png')
      this.load.image('chicken', 'assets/minigameObjects/chicken.png')
      this.load.image('wand', 'assets/images/wand.webp');
      this.load.audio('miniGameMusic', 'assets/audio/miniGameMusic.mp3');
    }
  
    create() {
      this.customCursor = this.add.image(0, 0, 'wand').setScale(0.45).setOrigin(0.15).setDepth(10);
      this.input.setDefaultCursor('none');
      this.add.image(520, 285, 'background2').setOrigin(0.4).setDisplaySize(1300, 720)

      //bgm
      this.miniGameMusic = this.sound.add('miniGameMusic', { loop: true, volume: 0.5 });
        this.miniGameMusic.play(); 
  
      // Add cauldron
      this.cauldron = this.add.image(650, 450, 'cauldron')
        .setOrigin(0.5)
        .setScale(0.5)
  
      // Add soysauce
      this.soysauce = this.add.image(1020, 110, 'soysauce')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1020, y: 110 })
  
      // Add vinegar
      this.vinegar = this.add.image(1105, 110, 'vinegar')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1105, y: 110 })
  
      // Add salt
      this.salt = this.add.image(1020, 310, 'salt')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1020, y: 310 })
  
      // Add sugar
      this.sugar = this.add.image(1105, 325, 'sugar')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1105, y: 325 })
  
      // Add pepper
      this.pepper = this.add.image(1190, 325, 'pepper')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1190, y: 325 })
  
      // Add oil
      this.oil = this.add.image(1180, 110, 'oil')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1180, y: 110 })
  
      // Add meat
      this.meat = this.add.image(1190, 400, 'meat')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 900, y: 150 })
  
      // Add chicken
      this.chicken = this.add.image(1020, 540, 'chicken')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1020, y: 540 })
  
      // Enable drag and drop
      this.input.setDraggable([this.soysauce, this.vinegar, this.salt, this.sugar, this.pepper, this.oil, this.meat, this.chicken])
  
      // Add drag event listeners
      this.input.on('dragstart', (pointer, gameObject) => {
        gameObject.setTint(0xaaaaaa)
      })
  
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX
        gameObject.y = dragY
      })
  
      this.input.on('dragend', (pointer, gameObject) => {
        gameObject.clearTint()
  
        // Check if the object is dropped on the cauldron
        if (this.checkOverlap(gameObject, this.cauldron)) {
          // Reset position if dropped on cauldron
          const initialPosition = gameObject.getData('initialPosition')
          gameObject.x = initialPosition.x
          gameObject.y = initialPosition.y
        }
      })
  
      this.cursors = this.input.keyboard.createCursorKeys()
  
      // Back button logic (example)
      this.input.keyboard.on('keydown-B', () => {
        this.scene.stop()
        this.scene.resume('GameScene')
      })
  
      // Minigame completion logic (example)
      // Replace this with your actual minigame completion condition
      // setTimeout(() => {
      //   this.events.emit('minigame-finished', { pointsEarned: 100 })
      //   this.scene.stop()
      //   this.scene.resume('GameScene')
      // }, 5000) // Simulate minigame ending after 5 seconds
    }
  
    checkOverlap(spriteA, spriteB) {
      const boundsA = spriteA.getBounds()
      const boundsB = spriteB.getBounds()
      return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)
    }
  
    update() {
      const pointer = this.input.activePointer;
      this.customCursor.setPosition(pointer.x, pointer.y);
    }
  }
  
  export default MiniGameScene
  