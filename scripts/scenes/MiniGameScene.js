class MiniGameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MiniGameScene' })
    }
  
    preload() {
      this.load.image('background2', 'assets/background/bg2.png')
      this.load.image('soysauce', 'assets/minigameObjects/soysauce.png')
      this.load.image('vinegar', 'assets/minigameObjects/vinegar.png')
      this.load.image('mgCauldron', 'assets/minigameObjects/mgCauldron.png')
      this.load.image('salt', 'assets/minigameObjects/salt.png')
      this.load.image('sugar', 'assets/minigameObjects/sugar.png')
      this.load.image('pepper', 'assets/minigameObjects/pepper.png')
      this.load.image('oil', 'assets/minigameObjects/oil.png')
      this.load.image('meat', 'assets/minigameObjects/meat.png')
      this.load.image('chicken', 'assets/minigameObjects/chicken.png')
      this.load.image('rice', 'assets/minigameObjects/rice.png')
      this.load.image('garlic', 'assets/minigameObjects/garlic.png')
      this.load.image('onion2', 'assets/minigameObjects/onion2.png')
      this.load.image('eggplant', 'assets/minigameObjects/eggplant.png')
      this.load.image('squash', 'assets/minigameObjects/pumpkin.png')
      this.load.image('cursor', 'assets/images/cursor.png');
      this.load.image('dragCursor', 'assets/images/drag.png'); 
      this.load.audio('miniGameMusic', 'assets/audio/miniGameMusic.mp3');
      
    }
  
    create() {
      // this.customCursor = this.add.image(0, 0, 'cursor').setScale(0.05).setOrigin(0.2).setDepth(10);
      this.input.setDefaultCursor('none');
      this.add.image(520, 288, 'background2').setOrigin(0.4).setDisplaySize(1300, 720)

      //bgm
      this.miniGameMusic = this.sound.add('miniGameMusic', { loop: true, volume: 0.5 });
        this.miniGameMusic.play(); 
  
      // Add cauldron
      this.cauldron = this.add.image(650, 450, 'cauldron')
        .setOrigin(0.5)
        .setScale(1)
  
      // Add soysauce
      this.soysauce = this.add.image(1020, 115, 'soysauce')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1020, y: 115 })
  
      // Add vinegar
      this.vinegar = this.add.image(1105, 113, 'vinegar')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1105, y: 113 })
  
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
      this.oil = this.add.image(1180, 115, 'oil')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1180, y: 115 })
  
      // Add meat
      this.meat = this.add.image(1160, 540, 'meat')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1160, y: 540 })
  
      // Add chicken
      this.chicken = this.add.image(1020, 540, 'chicken')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 1020, y: 540 })

      // Add rice
      this.rice = this.add.image(160, 490, 'rice')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 160, y: 490 })
      
      // Add garlic
      this.garlic = this.add.image(120, 540, 'garlic')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 120, y: 540 }) 

      // Add onion
      this.onion2 = this.add.image(80, 540, 'onion2')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 80, y: 540 })

      // Add eggplant
      this.eggplant = this.add.image(200, 540, 'eggplant')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 200, y: 540 })

      // Add squash
      this.squash = this.add.image(290, 550, 'squash')
        .setOrigin(0.5)
        .setScale(0.9)
        .setInteractive()
        .setData('initialPosition', { x: 290, y: 550 })


        //cursor
        this.customCursor = this.add.image(0, 0, 'cursor').setScale(0.05).setOrigin(0.2).setDepth(10);
    this.input.setDefaultCursor('none');

    this.dragCursor = this.add.image(0, 0, 'dragCursor').setScale(0.05).setOrigin(0.2).setDepth(11);
    this.dragCursor.setVisible(false);

    this.input.on('pointerdown', () => { 
      this.customCursor.setVisible(false);
      this.dragCursor.setVisible(true);
    });

    this.input.on('pointerup', () => {
      this.customCursor.setVisible(true);
      this.dragCursor.setVisible(false);
    });

    this.ingredientsInCauldron = [];
    
  
      // Enable drag and drop
      this.input.setDraggable([this.soysauce, this.vinegar, this.salt, this.sugar, this.pepper, this.oil, this.meat, this.chicken,
        this.rice, this.garlic, this.onion2, this.eggplant, this.squash])
  
      // Add drag event listeners
      this.input.on('dragstart', (pointer, gameObject) => {
        gameObject.setTint(0xaaaaaa)
      })
  
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX
        gameObject.y = dragY
      })
  
      this.input.on('dragend', (pointer, gameObject) => {
        gameObject.clearTint();
  
        // Check if the object is dropped on the cauldron
        if (this.checkOverlap(gameObject, this.cauldron)) {
          // Remove from draggable list
          this.input.setDraggable(gameObject, false);
  
          // Add to the ingredientsInCauldron array
          this.ingredientsInCauldron.push(gameObject.texture.key);
  
          // Emit an event to notify other parts of your game (optional)
          this.events.emit('ingredient-added', gameObject.texture.key);
  
          // Remove the object from the scene
          gameObject.destroy();
        } else {
          // Add a tween for the falling effect (if not on cauldron)
          this.tweens.add({
            targets: gameObject,
            y: this.game.config.height + 100,  
            duration: 1000, 
            ease: 'Bounce',
            onComplete: () => {
              const initialPosition = gameObject.getData('initialPosition');
              gameObject.x = initialPosition.x;
              gameObject.y = initialPosition.y;
            }
          });
        }
      });
     
  
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
      if (this.dragCursor.visible) {
        this.dragCursor.setPosition(pointer.x, pointer.y);
      } else {
        this.customCursor.setPosition(pointer.x, pointer.y);
    }
  }
  }
  
  export default MiniGameScene
  