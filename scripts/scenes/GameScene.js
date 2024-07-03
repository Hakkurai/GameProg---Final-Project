class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', 'assets/character/pinkguy.jpg');
        this.load.image('background', 'assets/background/bg.jpg'); // Replace with your actual path
    }

    create() {
        this.add.image(400, 300, 'background').setOrigin(0.5).setDisplaySize(800, 600);
        this.player = this.physics.add.sprite(400, 300, 'player');

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);

        this.physics.world.setBounds(0, 0, 800, 600);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-E', () => {
            this.scene.pause();
            this.scene.launch('MiniGameScene');
        });

        // Example: Listen for minigame-finished event
        this.events.on('minigame-finished', (data) => {
            console.log("Player earned", data.pointsEarned, "points!");
            // Update your game state based on the data received from the minigame
        });
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
