class MiniGameScene extends Phaser.Scene {
  constructor() {
      super({ key: 'MiniGameScene' });
  }

  preload() {
      this.load.image('background2', 'assets/background/bg2.png');
      this.load.image('soysauce', 'assets/minigameObjects/soysauce.png');
      this.load.image('vinegar', 'assets/minigameObjects/vinegar.png');
      this.load.image('mgCauldron', 'assets/minigameObjects/mgCauldron.png');
      this.load.image('salt', 'assets/minigameObjects/salt.png');
      this.load.image('sugar', 'assets/minigameObjects/sugar.png');
      this.load.image('pepper', 'assets/minigameObjects/pepper.png');
      this.load.image('oil', 'assets/minigameObjects/oil.png');
      this.load.image('meat', 'assets/minigameObjects/meat.png');
      this.load.image('chicken', 'assets/minigameObjects/chicken.png');
      this.load.image('rice', 'assets/minigameObjects/rice.png');
      this.load.image('garlic', 'assets/minigameObjects/garlic.png');
      this.load.image('onion2', 'assets/minigameObjects/onion2.png');
      this.load.image('eggplant', 'assets/minigameObjects/eggplant.png');
      this.load.image('squash', 'assets/minigameObjects/pumpkin.png');
      this.load.image('cursor', 'assets/images/cursor.png');
      this.load.image('dragCursor', 'assets/images/drag.png');
      this.load.audio('miniGameMusic', 'assets/audio/miniGameMusic.mp3');
      this.load.audio('dropSound', 'assets/audio/ingredientadd.mp3');
      this.load.audio('successSound', 'assets/audio/successSound.mp3');
      this.load.image('diaryBTN', 'assets/menuButtons/diaryBTN.png');
      const recipeImages = [
        'Adobo', 'Pastil', 'Pinakbet', 'Arrozcaldo', 'LechonManok'
    ];

    recipeImages.forEach(recipeName => {
        this.load.image(recipeName, `assets/recipeImages/${recipeName}.png`); // Adjust path if needed
    });
  }

  create() {
      this.input.setDefaultCursor('none');
      this.add.image(520, 288, 'background2').setOrigin(0.4).setDisplaySize(1300, 720);
      this.miniGameMusic = this.sound.add('miniGameMusic', { loop: true, volume: 0.5 });
      this.miniGameMusic.play();
      this.successSound = this.sound.add('successSound');
      this.cauldron = this.add.image(650, 450, 'cauldron').setOrigin(0.5).setScale(1);
      this.ingredientsInCauldron = [];
      const ingredientsData = [
          { name: 'soysauce', x: 1020, y: 115 },
          { name: 'vinegar', x: 1105, y: 113 },
          { name: 'salt', x: 1020, y: 310 },
          { name: 'sugar', x: 1105, y: 325 },
          { name: 'pepper', x: 1190, y: 325 },
          { name: 'oil', x: 1180, y: 115 },
          { name: 'meat', x: 1160, y: 540 },
          { name: 'chicken', x: 1020, y: 540 },
          { name: 'rice', x: 160, y: 490 },
          { name: 'garlic', x: 120, y: 540 },
          { name: 'onion2', x: 80, y: 540 },
          { name: 'eggplant', x: 200, y: 540 },
          { name: 'squash', x: 290, y: 550 }
      ];
      this.ingredients = ingredientsData.map(data => {
          const ingredient = this.add.image(data.x, data.y, data.name)
              .setOrigin(0.5)
              .setScale(0.9)
              .setInteractive()
              .setData('initialPosition', { x: data.x, y: data.y });
          this.input.setDraggable(ingredient);
          return ingredient;
      });
      this.customCursor = this.add.image(0, 0, 'cursor').setScale(0.05).setOrigin(0.2).setDepth(10);
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
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
      });
      


      this.dropSound = this.sound.add('dropSound');

      this.input.on('dragend', (pointer, gameObject) => {
          gameObject.clearTint();
          if (this.checkOverlap(gameObject, this.cauldron)) {
              this.ingredientsInCauldron.push(gameObject.texture.key);
              gameObject.destroy();
              this.dropSound.play();
          } else {
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

      this.discoveredRecipes = [];
      this.cauldron.setInteractive();
      
      this.cauldron.on('pointerdown', () => {
          this.checkRecipe();
          console.log("Ingredients in cauldron:", this.ingredientsInCauldron);
          this.resetIngredients();
      });
      this.cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on('keydown-B', () => {
          this.scene.stop();
          this.scene.resume('GameScene');
      });

      const diaryButton = this.add.image(50, 50, 'diaryBTN') // Adjust position as needed
            .setInteractive()
            .setScale(0.3); // Or any scale you prefer

            diaryButton.on('pointerdown', () => {
              this.scene.pause(); 
              this.scene.launch('DiaryUI'); 
  
              // Get the DiaryUI scene after launch
              this.time.delayedCall(100, () => {
                  const diaryUI = this.scene.get('DiaryUI');
                  if (diaryUI) {
                      diaryUI.events.on('diary-opened', () => {
                          this.scene.pause();
                      });
                  }
              });
          });
  }

  checkOverlap(spriteA, spriteB) {
      const boundsA = spriteA.getBounds();
      const boundsB = spriteB.getBounds();
      return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }

  checkRecipe() {
    const recipes = {
        Adobo: ['soysauce', 'vinegar', 'garlic', 'onion2', 'meat'],
        Pastil: ['soysauce', 'salt', 'pepper', 'oil', 'chicken', 'rice', 'garlic'],
        Pinakbet: ['soysauce', 'salt', 'pepper', 'oil', 'meat', 'garlic', 'onion2', 'eggplant', 'squash'],
        Arrozcaldo: ['soysauce', 'salt', 'pepper', 'oil', 'chicken', 'rice', 'garlic', 'onion2'],
        LechonManok: ['soysauce', 'salt', 'pepper', 'oil', 'chicken', 'garlic', 'onion2']
    };

    const foundRecipe = Object.keys(recipes).find(recipeName =>
        recipes[recipeName].every(ingredient => this.ingredientsInCauldron.includes(ingredient))
    );

    // Load the font and handle the message display
    WebFont.load({
        custom: {
            families: ['Starborn']
        },
        active: () => {
            let message = foundRecipe ? `You've Cooked ${foundRecipe}!` : "This is a mess!";
            let messageColor = foundRecipe ? '#ffffff' : '#ff0000';

            const feedbackText = this.add.text(650, 200, message, {
                fontFamily: 'Starborn',
                fontSize: '32px',
                color: messageColor,
                align: 'center'
            })
            .setOrigin(0.5)
            .setAlpha(0);

            let recipeImage = null;
            if (foundRecipe) {
                const recipeImageKey = foundRecipe.replace(/\s+/g, '_');
                recipeImage = this.add.image(650, 288, recipeImageKey)
                    .setOrigin(0.5)
                    .setScale(0.15)
                    .setAlpha(0);
            }

            this.tweens.add({
                targets: [recipeImage, feedbackText].filter(item => item !== null),
                alpha: 1,
                duration: 1000,
                onComplete: () => {
                    this.tweens.add({
                        targets: [recipeImage, feedbackText].filter(item => item !== null),
                        alpha: 0,
                        duration: 1000,
                        delay: 4000,
                        onComplete: () => {
                            if (recipeImage) recipeImage.destroy();
                            feedbackText.destroy();
                        }
                    });
                }
            });

            this.ingredientsInCauldron = [];
            if (foundRecipe) {
                this.successSound.play();

                // Get or launch the DiaryUI scene
                const diaryUI = this.scene.get('DiaryUI') || this.scene.launch('DiaryUI'); 
                if (!this.discoveredRecipes.includes(foundRecipe)) {
                    this.discoveredRecipes.push(foundRecipe);
                    diaryUI.events.emit('recipe-discovered', foundRecipe); 
                }
            }
        }
    });
}
  resetIngredients() {
    const ingredientsData = [
        { name: 'soysauce', x: 1020, y: 115 },
        { name: 'vinegar', x: 1105, y: 113 },
        { name: 'salt', x: 1020, y: 310 },
        { name: 'sugar', x: 1105, y: 325 },
        { name: 'pepper', x: 1190, y: 325 },
        { name: 'oil', x: 1180, y: 115 },
        { name: 'meat', x: 1160, y: 540 },
        { name: 'chicken', x: 1020, y: 540 },
        { name: 'rice', x: 160, y: 490 },
        { name: 'garlic', x: 120, y: 540 },
        { name: 'onion2', x: 80, y: 540 },
        { name: 'eggplant', x: 200, y: 540 },
        { name: 'squash', x: 290, y: 550 }
    ];

    ingredientsData.forEach((data, index) => {
        let ingredient = this.ingredients[index];

        if (!ingredient || !ingredient.scene) {
            ingredient = this.add.image(data.x, data.y, data.name)
                .setOrigin(0.5)
                .setScale(0.9)
                .setInteractive()
                .setData('initialPosition', { x: data.x, y: data.y });

            this.input.setDraggable(ingredient); 
            this.ingredients[index] = ingredient; 
        } else {
            ingredient.x = data.x;
            ingredient.y = data.y;
        }
    });

    this.ingredientsInCauldron = []; 
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
export default MiniGameScene;