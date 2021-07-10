import Phaser from "phaser";
import * as Colyseus from "colyseus.js";
// import Dice from "./assets/Spritesheets/diceWhite.png";
//@ts-ignore
import { GameScene } from "./scenes/game-scene.ts";
import Dice from "./assets/Spritesheets/diceWhite.png";
import Cube from "./assets/cube.json";

const WIN_WIDTH = 800;
const WIN_HEIGHT = 600;

class MainScene extends Phaser.Scene {
  private client!: Colyseus.Client;

  constructor() {
    super({
      key: "MainScene",
    });
  }

  __loading() {
    const bars: any = [];
    const radius: number = 64;
    const height: number = radius * 0.5;
    const width: number = 10;

    const center_x = 400;
    const center_y = 300;

    let angle = -90;

    for (let i = 0; i < 12; ++i) {
      const { x, y } = Phaser.Math.RotateAround(
        { x: center_x, y: center_y - (radius - height * 0.5) },
        center_x,
        center_y,
        Phaser.Math.DEG_TO_RAD * angle
      );

      const bar = this.add
        .rectangle(x, y, width, height, 0xffffff, 1)
        .setAngle(angle)
        .setAlpha(0.2);

      bars.push(bar);
      angle += 30;
      this.__loading();
    }

    return bars;
  }

  async init() {}
  preload() {
    this.load.atlas("dice", Dice, Cube);
  }

  async create() {
    console.log("START... server");
    // connect to colyseus server
    this.client = new Colyseus.Client("ws://localhost:2567");

    const room = await this.client?.joinOrCreate("chat");

    console.log("ROOM NAME: ", room.name);

    room.onMessage("message", (message) => {
      console.log("the message", message);
    });

    this.input.keyboard.on("keydown", (evt: KeyboardEvent) => {
      room.send("message", evt.key);
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
// const room = await this.client?.joinOrCreate("baklava");
// room?.onMessage("keydown", (message) => {
//   console.log(message);
// });
