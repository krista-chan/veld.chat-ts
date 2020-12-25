import axios from "axios";
import utils from "util";
import { Embed, MessageCreateArgs } from "./models";
import { Client } from "../Client/Client";

export interface Message {
  content?: string;
  embed?: Embed;
  channelId: string;
  mentions: Array<string>;
}

let sendContent: MessageCreateArgs = { content: null };

export class Message {
  constructor(client: Client, channelId: string, content?: string | Embed) {
    if (!content || content === null) {
      throw new Error("[ERROR] Cannot send an empty message");
    }
    if (content && typeof content === "string") {
      sendContent = { content: content };
    } else if (content && typeof content === "object") {
      sendContent = { embed: content };
    }
    tryAndPostTheFuckingMessage(client, channelId);
  }
}

async function tryAndPostTheFuckingMessage(
  client: Client,
  channelId: string,
) {
  try {
    await axios.post(
      `https://chat-gateway.veld.dev/api/v1/channels/${channelId}/messages`,
      sendContent,
      {
        headers: {
          Authorization: `Bearer ${client.token}`,
        },
      }
    );
  } catch (err: any) {
    throw new Error(`[ERROR] ${utils.inspect(err.response.data.details)}`);
  }
}

export default Message;
