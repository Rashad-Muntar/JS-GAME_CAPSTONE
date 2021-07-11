import Phaser from 'phaser';
import config from '../Config/config';
import { inputValidator, eltBuilder } from '../API/sortResult';
import back from '../assets/panelBack.png';

export default class FormScene extends Phaser.Scene {
  constructor() {
    super('FormScene');
  }

  preload() {
    this.load.image('back', back);
  }

  create() {
    const bg = this.add.image(0, 0, 'sky');
    this.add.image(400, 300, 'back');
    bg.displayHeight = config.height;
    bg.displayWidth = config.width;
    bg.y = config.height / 2;
    bg.x = config.width / 2;

    this.welcomeText = this.add.text(160, 100, 'SKY MAN is Glad to see you !!', {
      fontSize: '35px',
      fill: 'blue',
      fontFamily: 'Sans-serif',
    });

    const container = document.getElementById('container');
    const div = eltBuilder('div',
      { class: 'userAction', id: 'input-fields' }, eltBuilder('input', {
        type: 'text',
        class: 'form',
        id: 'playerName',
        placeholder: 'Enter your name',
        required: true,
      }), eltBuilder('input', {
        type: 'submit',
        value: 'Sumbit',
        id: 'submit',
        class: 'submit-btn',
      }));

    const fields = this.add.dom(config.width / 2.7, 250, div);
    container.appendChild(div);
    fields.addListener('click');

    fields.on('click', (e) => {
      const playerName = document.getElementById('playerName');
      if (e.target.matches('#submit') && inputValidator(playerName) === true) {
        fields.removeListener('click');
        fields.setVisible(false);
        this.playerName = playerName.value;
        localStorage.setItem('playerName', playerName.value);

        this.scene.start('Title');
      } else if (
        e.target.matches('#submit') && inputValidator(playerName) === false
      ) {
        playerName.classList.add('is-invalid');
      }
    });
  }
}
