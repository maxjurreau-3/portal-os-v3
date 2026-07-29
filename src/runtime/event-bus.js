// Portal‑OS‑v3 Unified Event Bus
// Lightweight, engine-safe, cross-module communication layer

export const EventBus = {
  listeners: {},

  emit(event, payload) {
    console.log(`[EventBus] Emit → ${event}`, payload);

    if (!this.listeners[event]) return;

    for (const fn of this.listeners[event]) {
      try {
        fn(payload);
      } catch (err) {
        console.warn(`[EventBus] Listener error for ${event}:`, err);
      }
    }
  },

  on(event, fn) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(fn);

    console.log(`[EventBus] Listener added → ${event}`);
  },

  off(event, fn) {
    if (!this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== fn
    );

    console.log(`[EventBus] Listener removed → ${event}`);
  }
};
