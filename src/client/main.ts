import Phaser from "phaser";
import * as Colyseus from "colyseus.js";
// import Dice from "./assets/Spritesheets/diceWhite.png";
//@ts-ignore
import { GameScene } from "./scenes/game-scene.ts";
import Dice from "./assets/Spritesheets/diceWhite.png";
import * as Cube from "./assets/cube.json";

const WIN_WIDTH = 800;
const WIN_HEIGHT = 600;

class MainScene extends Phaser.Scene {
  private client!: Colyseus.Client;

  constructor() {
    super({
      key: "MainScene",
    });
  }

  init() {
    // connect to colyseus server
    this.client = new Colyseus.Client("ws://localhost:2567");
  }
  preload() {
    this.load.atlas("dice", Dice, Cube);
    // this.load.spritesheet("dice", Dice, {
    //   frameWidth: 64,
    //   frameHeight: 64,
    //   endFrame: 32,
    // });
  }

  async create() {
    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNames("cube", {
        prefix: "frame",
        start: 1,
        end: 23,
      }),
      frameRate: 50,
      repeat: -1,
    });
    const colors = [
      0xef658c,
      0xff9a52,
      0xffdf00,
      0x31ef8c,
      0x21dfff,
      0x31aade,
      0x5275de,
      0x9c55ad,
      0xbd208c,
    ];

    const sprite1 = this.add.sprite(200, 300, "cube").setTint(colors[0]);
    const sprite2 = this.add.sprite(400, 300, "cube").setTint(colors[1]);
    const sprite3 = this.add.sprite(600, 300, "cube").setTint(colors[2]);

    // //  Play the 'spin' animation
    sprite1.play({ key: "spin" });

    sprite2.play({ key: "spin", frameRate: 20 });

    sprite3.play({ key: "spin", repeatDelay: 250 });

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    const room = await this.client?.joinOrCreate("baklava");
    room?.onMessage("keydown", (message) => {
      console.log(message);
    });

    this.input.keyboard.on("keydown", (evt: KeyboardEvent) => {
      room?.send("keydown", this.game.loop.actualFps);
    });
  }
}
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: WIN_WIDTH,
  plugins: [],
  height: WIN_HEIGHT,
  scene: [MainScene],
};

const game = new Phaser.Game(config);

// __loading() {
//   const bars: any = [];
//   const radius: number = 64;
//   const height: number = radius * 0.5;
//   const width: number = 10;

//   const center_x = 400;
//   const center_y = 300;

//   let angle = -90;

//   for (let i = 0; i < 12; ++i) {
//     const { x, y } = Phaser.Math.RotateAround(
//       { x: center_x, y: center_y - (radius - height * 0.5) },
//       center_x,
//       center_y,
//       Phaser.Math.DEG_TO_RAD * angle
//     );

//     const bar = this.add
//       .rectangle(x, y, width, height, 0xffffff, 1)
//       .setAngle(angle)
//       .setAlpha(0.2);

//     bars.push(bar);
//     angle += 30;
//     this.__loading();
//   }

//   return bars;
// }
