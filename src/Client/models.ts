export type Events =
  | "ready"
  | "login"
  | "message:create"
  | "message:delete"
  | "message:update"
  | "user:join"
  | "user:leave"
  | "user:typing"
  | "user:update"
  | "channel:commands"
  | "channel:create"
  | "member:create"
  | "member:delete";

export interface Member {
  id: string;
  avatarUrl?: string;
  name: string;
  bot: boolean;
}

export interface ClientUser extends Member {
}

export interface GatewayResponse {
  token: string;
  user: ClientUser;
  members: Array<Member>;
}
