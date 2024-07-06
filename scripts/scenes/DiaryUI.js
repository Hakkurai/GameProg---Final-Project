class DiaryUI extends Phaser.Scene {
    constructor() {
        super({ key: 'DiaryUI' });
    }

    preload() {
        this.load.image('diaryUI', 'assets/menuButtons/diaryUI.png'); // Assuming the path is correct
        this.load.image('backBTN', 'assets/menuButtons/backBTN.png');
        this.load.image('cursor', 'assets/images/cursor.png'); // Load the cursor image
    }

    create() {
        this.add.image(650, 360, 'diaryUI').setOrigin(0.5).setDisplaySize(800, 620); 

        // Get recipes from MiniGameScene
        const miniGameScene = this.scene.get('MiniGameScene');
        this.recipes = miniGameScene.recipes; // Use the recipes from MiniGameScene
        
        // Store references to recipe images directly
        this.recipeImages = {
            adobo: null,
            pastil: null,
            pinakbet: null,
            arrozcaldo: null,
            LechonManok: null 
        };


        // Add the back button
        const backButton = this.add.image(100, 100, 'backBTN')
            .setInteractive()
            .setScale(0.5);

        backButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('MiniGameScene');
        });

        // Add the cursor
        this.customCursor = this.add.image(0, 0, 'cursor').setScale(0.05).setOrigin(0.2).setDepth(10);

        this.input.on('pointermove', (pointer) => {
            this.customCursor.setPosition(pointer.x, pointer.y);
        });

        // Position variables for recipe display
        let xPos = 200;
        let yPos = 200;

        // Iterate through recipes and display them
        for (const recipeName in this.recipes) {
            const recipe = this.recipes[recipeName];

            // Load and display the recipe image
            const recipeImage = this.add.image(xPos, yPos, recipeName) // Use recipeName directly as the key
                .setOrigin(0.5)
                .setScale(0.05);

            // Set tint to black if not discovered
            if (!recipe.discovered) {
                recipeImage.setTint(0x000000); // Black tint
            }

            // Store the reference to the recipe image
            this.recipeImages[recipeName] = recipeImage; // Store the reference

            // Add recipe name text below the image (optional)
            this.add.text(xPos, yPos + 60, recipeName, { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5);

            xPos += 200; 
            if (xPos > 1100) { 
                xPos = 200;
                yPos += 200; 
            }
        }

        // Listen for the 'recipe-discovered' event from the MiniGameScene
        this.scene.get('MiniGameScene').events.on('recipe-discovered', (recipeName) => {
            if (this.recipes[recipeName]) {
                this.recipes[recipeName].discovered = true;
                this.updateRecipeImage(recipeName);
            }
        });

        this.events.emit('diary-opened');
    }
    
    // Function to update a recipe image when it's discovered
    updateRecipeImage(recipeName) {
        if (this.recipeImages[recipeName]) {
            this.recipeImages[recipeName].clearTint(); // Remove the black tint directly
        } else {
            console.warn(`Recipe image not found for ${recipeName}`);
        }
    }
}

export default DiaryUI;