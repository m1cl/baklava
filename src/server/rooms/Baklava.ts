import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class Baklava extends Room {
  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("message", (client, message) => {
      //
      // handle "type" message
      //
      console.log(client.id, ": ", message);
      this.broadcast("message", client.id + ": " + message, {
        except: client,
      });
    });
  }

  onJoin(client: Client, options: any) {}

  onLeave(client: Client, consented: boolean) {}

  onDispose() {}
}
