class MiniGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MiniGameScene' });
    }

    preload() {
        this.load.image('miniPlayer', 'assets/character/pinkguy.jpg');
        this.load.image('background2', 'assets/background/bg2.png'); // Replace with your actual path
    }

    create() {
        this.add.image(400, 300, 'background2').setOrigin(0.5).setDisplaySize(1300, 720);


        this.miniPlayer.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Back button logic (example)
        this.input.keyboard.on('keydown-B', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });

        // Minigame completion logic (example)
        // Replace this with your actual minigame completion condition
        setTimeout(() => {
            this.events.emit('minigame-finished', { pointsEarned: 100 });
            this.scene.stop();
            this.scene.resume('GameScene');
        }, 5000); // Simulate minigame ending after 5 seconds
    }

    update() {

    }
}

export default MiniGameScene;
