import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state() {
    return {
      notifications: [] as Array<[string, string, number]>,
    };
  },
  actions: {
    showInfo(message: string, timeout: number = 1000) {
      const index = this.notifications.length;
      const timer = setTimeout(() => {
        this.notifications = this.notifications.filter((n, i) => i != index);
      }, timeout);
      this.notifications.push(["alert-info", message, timer]);
    },
  },
});
