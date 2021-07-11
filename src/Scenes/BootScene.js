import Phaser from 'phaser';
import sky from '../assets/sky.jpg';
import logo from '../assets/zenva_logo.png';
import ground from '../assets/ground1.png';
import star from '../assets/star.png';
import bomb from '../assets/bomb.png';
import dude from '../assets/dude.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('sky', sky);
    this.load.image('logo', logo);
    this.load.image('ground', ground);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', dude, {
      frameWidth: 32, frameHeight: 48,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}