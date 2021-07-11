/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import LocalStorage from '../API/localStorage';

let platforms;
let player;
let controlls;
let stars;
let score = 0;
let scoreText;
let bombs;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.add.image(800, 600, 'sky').setScale(2);

    // cameras setyp
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    this.physics.world.bounds.width = 1600;
    this.physics.world.bounds.height = 1200;

    // on screeen text setup
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '28px', fill: '#000' });
    scoreText.setScrollFactor(0);

    // platforms
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 1230, 'ground').setScale(5.5).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    platforms.create(50, 600, 'ground');
    platforms.create(290, 965, 'ground');
    platforms.create(460, 800, 'ground');
    platforms.create(750, 600, 'ground');
    platforms.create(820, 1080, 'ground');
    platforms.create(1260, 880, 'ground');
    platforms.create(1290, 450, 'ground');
    platforms.create(1430, 660, 'ground');
    platforms.create(1530, 1020, 'ground');
    platforms.create(1546, 230, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    player.body.setGravityY(300);
    this.physics.add.collider(player, platforms);

    stars = this.physics.add.group({
      key: 'star',
      repeat: 30,
      setXY: { x: 12, y: 0, stepX: 50 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
  }

  update() {
    controlls = this.input.keyboard.createCursorKeys();

    if (controlls.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (controlls.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }
    if (controlls.up.isDown && player.body.touching.down) {
      player.setVelocityY(-550);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText(`Score: ${score}`);

    if (stars.countActive(true) === 0) {
      stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      const bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.ScoreForm();
    LocalStorage.saveScore(score);
  }

  ScoreForm() {
  // const playerName = localStorage.getItem('playerName');
  // this.data = uploadGameData(playerName, this.score);
    this.scene.start('GameOver');
  }
}
