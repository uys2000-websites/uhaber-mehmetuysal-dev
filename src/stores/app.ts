import type { URDocument } from "@/types/firebase";
import type { UCategory, UOrganization } from "@/types/main";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      theme: "light",
      hide: false,
      organizations: [] as URDocument<UOrganization>[],
      categories: [] as URDocument<UCategory>[],
    };
  },
});
