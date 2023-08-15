type EventHandler = (...args: any[]) => void;

export default class Observer {
  private static instance: Observer;
  private eventListeners: { [eventName: string]: EventHandler[] } = {};

  constructor() {
    if (Observer.instance) {
      return Observer.instance;
    }
    Observer.instance = this;
  }

  on(eventName: string, handler: EventHandler) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(handler);
  }

  off(eventName: string, handler: EventHandler) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(
        h => h !== handler
      );
    }
  }

  fire(eventName: string, ...args: any[]) {
    const handlers = this.eventListeners[eventName];
    if (handlers) {
      for (const handler of handlers) {
        handler(...args);
      }
    }
  }
}