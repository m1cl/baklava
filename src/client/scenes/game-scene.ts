import Phaser from "phaser";
// import logoImg from "../assets/logo.png";
import * as Colyseus from "colyseus.js";

export class GameScene extends Phaser.Scene {
  private client!: Colyseus.Client;

  constructor() {
    super({ key: "GameScene" });
  }

  init() {}
  preload() {
    this.game.scene;
    // this.load.image("logo", logoImg);
    this.load.spritesheet("dice", "../assets/diceWhite.png", {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 32,
    });
    // this.load
  }

  async create() {
    // const dice = this.add.image(400, 150, "dice");

    const animation_config = {
      key: "explodeAnimation",
      frame: this.anims.generateFrameNumbers("dice", {
        start: 0,
        end: 23,
        first: 23,
      }),
    };

    this.anims.create(animation_config);
    this.add.sprite(400, 300, "dice").play("animation_config");

    // this.tweens.add({
    //   targets: dice,
    //   y: 450,
    //   duration: 2000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1,
    // });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  plugins: [],
  height: 600,
  scene: GameScene,
};
