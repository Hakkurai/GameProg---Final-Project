class GameScene extends Phaser.Scene {
  constructor() {
      super({ key: 'GameScene' });
  }

  preload() {
      this.load.image('player', 'assets/character/pinkguy.jpg');
      this.load.image('background', 'assets/background/bg.jpg'); // Replace with your actual path
  }

  create() {
      // Create background image and set its size to cover the game world
      this.add.image(400, 300, 'background').setOrigin(0.5).setDisplaySize(800, 600); 

      this.player = this.physics.add.sprite(400, 300, 'player');

      // Set camera properties
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setZoom(2);

      // Enable world bounds and collision
      this.physics.world.setBounds(0, 0, 800, 600); 
      this.player.setCollideWorldBounds(true);

      // Input setup
      this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
      // Reset velocity at the start of each frame
      this.player.setVelocity(0);

      if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
          this.player.flipX = true; 
      } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(160);
          this.player.flipX = false;
      }

      if (this.cursors.up.isDown) {
          this.player.setVelocityY(-160);
      } else if (this.cursors.down.isDown) {
          this.player.setVelocityY(160);
      }
  }
}

export default GameScene;
