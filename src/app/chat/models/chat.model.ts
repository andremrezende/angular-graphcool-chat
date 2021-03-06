import { User } from "../../core/models/user.model";
import { Message } from "./message.model";

export class Chat {
  id: string;
  createdAt?: string;
  isGroup?: boolean;
  title?: string;
  users?: User[];
  messages?: Message[];

  constructor(chat: Chat) {
    Object.keys(chat).forEach(key => (this[key] = chat[key]));
  }
}
