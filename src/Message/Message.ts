import axios from "axios";
import { Embed, MessageCreateArgs } from "./models";
import { Member } from "../Client/models";
import { Client } from "../Client/Client";

export interface Message {
  content?: string;
  embed?: Embed;
  channelId: string;
  mentions: Array<string>;
}

export class Message {
  constructor(client: Client, channelId: string, content?: string, embed?: Embed) {
    let sendContent: MessageCreateArgs = {};
    if ((!content || content === null) && (!embed || embed === null)) {
      throw new Error("[ERROR] Cannot send an empty message");
    };
    if (content && typeof content !== "string") {
      sendContent.content = content;
    };
    if (embed && typeof embed !== "object") {
      sendContent.embed = embed;
    };
    try {
      axios.post(`https://chat-gateway.veld.dev/api/v1/channels/${channelId}/messages`, {
        embed: sendContent.embed,
        content: sendContent.content,
      }, {
        headers: `Bearer ${client.token}`
      });
    } catch (err: unknown) {
      throw new Error(`[ERROR] ${err}`)
    }
  }
}

export default Message;
