export interface User {
  id: string;
  name: string;
}

export interface Media {
  url: string;
  type: "image" | "video";
}

export interface Message {
  id: string;
  text?: string;

  /* ⭐ NEW — supports multiple media */
  media?: Media[];

  senderId: string;
  chatId: string;
  timestamp: number;

  status?: "sending" | "delivered" | "seen";
}

