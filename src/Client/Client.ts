import { io, Socket } from "socket.io-client";
import { EventEmitter } from "events";
import { Events, GatewayResponse, ClientUser, Member, Members} from "./models";

export default class Client extends EventEmitter {
  readonly events: Events;
  readonly gateway: Socket;
  token: string;
  user: ClientUser;
  members: Map<string, Member>;
  constructor() {
    super();
    this.gateway = io("https://chat-gateway.veld.dev");
    this.gateway.on("connect", () => {
      this.emit("debug", "[WEBSOCKET] Client connected");
    });
    this.gateway.on("ready", (res: GatewayResponse) => {
      this.token = res.token;
      this.user = res.user;
      for (const member of res.members) {
        this.members.set(member.id, member);
      };
      this.gateway.emit("login", { token: this.token, bot: true });
    });
    return this;
  };
};
