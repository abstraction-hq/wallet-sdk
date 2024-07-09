import { KEY_URL } from "../constants";
import { Message } from "../types/communicator/message";

const POPUP_WIDTH = 420;
const POPUP_HEIGHT = 540;

export class Communicator {
  private keyUrl;
  constructor(private target: Window | null, keyUrl: string | null) {
    if (keyUrl) {
      this.keyUrl = keyUrl;
    } else {
      this.keyUrl = KEY_URL;
    }
  }

  openPopup(service: string): Promise<[this, string]> {
    const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX;
    const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY;

    const id = Math.random().toString(36).substring(7);

    const popup = window.open(
      `${this.keyUrl}/${service}?id=${id}`,
      "Abstraction Wallet",
      `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, left=${left}, top=${top}`
    );

    this.target = popup;
    return new Promise((resolve, reject) => {
      window.addEventListener("message", (event) => {
        if (event.origin !== this.keyUrl) return;

        if (
          event.data.type == "response" &&
          event.data.message == "PopupLoaded" &&
          event.data.id === id
        ) {
          window.removeEventListener("message", () => {});
          resolve([this, id]);
        }
      });
    });
  }

  onPopupLoaded(id: string) {
    this.target?.postMessage(
      { type: "response", message: "PopupLoaded", id },
      "*"
    );
  }

  sendRequestMessage(payload: any): Promise<Message> {
    const message: Message = {
      id: Math.random().toString(36).substring(7),
      type: `request`,
      payload: payload,
    };
    this.target?.postMessage(message, "*");

    return new Promise(async (resolve, reject) => {
      window.addEventListener("message", (event) => {
        if (
          event.data.id === message.id &&
          event.data.type === `response`
        ) {
          resolve(event.data);
          window.removeEventListener("message", () => {});
        }
      });
    });
  }

  listenRequestMessage(callback: (payload: any) => void) {
    window.addEventListener("message", (event) => {
      if (event.data.type === `request`) {
        callback(event.data);
      }
    });
  }

  sendResponseMessage(id: string, payload: any) {
    const message: Message = {
      id: id,
      type: 'response',
      payload: payload,
    };
    this.target?.postMessage(message, "*");
  }
}
