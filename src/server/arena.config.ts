import Arena from "@colyseus/arena";
import { RelayRoom } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { Request, Response } from "express";
import { Baklava } from "./rooms/Baklava";

/**
 * Import your Room files
 */

export default Arena({
  getId: () => "Baklava",

  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define("chat", Baklava).on("message", (msg) => {
      console.log("THE MESSAGE", msg);
    });

    gameServer.define("game", Baklava);

    // gameServer.define("relay_room", RelayRoom, {
    //   maxClients: 4,
    //   allowReconnectionTime: 120,
    // });
  },

  initializeExpress: (app) => {
    /**
     * Bind your custom express routes here:
     */
    app.get("/", (req: Request, res: Response) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    /**
     * Bind @colyseus/monitor
     * It is recommended to protect this route with a password.
     * Read more: https://docs.colyseus.io/tools/monitor/
     */
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
