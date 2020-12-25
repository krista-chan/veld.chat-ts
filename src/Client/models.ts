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
};

export interface ClientUser {
  
};

export interface Members {};

export interface GatewayResponse {
  token: string;
  bot: boolean;
  user: ClientUser;
  members: Array<Member>;
};
