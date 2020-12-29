import io, {Socket} from "socket.io-client";
import {EventEmitter} from "events";
import {ClientUser, GatewayResponse, Member} from "./models";
import {Embed} from "../Message/models";
import Message from "../Message/Message";

export class Client extends EventEmitter {
  readonly gateway: typeof Socket;
  token: string;
  user: ClientUser;
  members: Map<string, Member>;

  constructor() {
    super();
    this.members = new Map();
    this.gateway = io("https://chat-gateway.veld.dev/");
    this.gateway.on("connect", () => {
      this.emit("debug", "[WEBSOCKET] Client connected. Attempting login.");
      this.gateway.emit("login", {token: this.token, bot: true});
    });
    this.gateway.once("ready", (res: GatewayResponse) => {
      this.emit("debug", res);
      this.token = res.token;
      this.user = res.user;
      for (const member of res.members) {
        this.members.set(member.id, member);
      }
      this.gateway.emit("login", {token: this.token, bot: true});
    });

    this.gateway.on("message:create", (message: Message) => {
      this.emit("message:create", message);
    });

    return this;
  }

  sendMessage(ChannelID: string, content?: string | Embed) {
    return new Message(this, ChannelID, content);
  }
}

export interface Client {
  on(event: "message:create", listener: (listener: Message) => void): this;
}

export default Client;
